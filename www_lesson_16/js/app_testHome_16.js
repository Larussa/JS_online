class HttpNew {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(response => resolve(response))
            .catch(err => reject(err));
        });
    }
}
const ui = new UI();
const apiKey = "b09139bfceb545c4a56068e424f433a7";
const http = new HttpNew();
// Init auth
const auth = new Auth();

// Init elements
const select = document.getElementById("country");
const category = document.getElementById("category");
const sources = document.getElementById("source");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const logout = document.querySelector('.logout');

// All events
select.addEventListener("change", onChangeCountry);
category.addEventListener("change", onChangeCountry);
sources.addEventListener("change", onChangeSource);
searchBtn.addEventListener("click", onSearch);
logout.addEventListener("click", onLogout);



// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
if (!user) {
    window.location = 'login.html';
    }
});

// Новости по стране и категории
// Event handlers

function onChangeCountry(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`)
        .then(response => {
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => {
            ui.showError(err);
            ui.showInfo("По вашему запросу новостей не найдено!");
        })
}

// Новости по ресурсу
function onChangeSource(e) {
    ui.showLoader();

    http.get(`https://newsapi.org/v2/top-headlines?sources=${sources.value}&apiKey=${apiKey}`)
        .then(response => {
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => {
            ui.showError(err);
            ui.showInfo("По вашему запросу новостей не найдено!");
        })
}

(function () {
    http.get(`https://newsapi.org/v2/sources?language=ru&apiKey=${apiKey}`)
        .then(response => {
            response.sources.forEach(source => ui.addSources(source));
            $(document).ready(function () {
                $('select').formSelect();
            })
        })
    .catch(err => ui.showError(err));
}());

function onSearch(e) {
    // Делаем запрос на получение новостей по тому что введено в инпут

    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(response => {
            if (response.totalResults) {
                ui.clearContainer();
                response.articles.forEach(news => ui.addNews(news));
            } else ui.showInfo('По вашему запросу новостей не найдено');
        })
    .catch(err => ui.showError(err));
}

function onLogout () {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch((error) => console.log(error));

}
