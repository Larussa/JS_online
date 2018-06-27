/// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "b09139bfceb545c4a56068e424f433a7";


// Init elements
const select = document.getElementById("country");
const category = document.getElementById("category");
const sources = document.getElementById("source");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// All events
select.addEventListener("change", onChangeCountry);
category.addEventListener("change", onChangeCountry);
sources.addEventListener("change", onChangeSource);
searchBtn.addEventListener("click", onSearch);

// Новости по стране и категории
// Event handlers
function onChangeCountry(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`, news);
}

// Новости по ресурсу
function onChangeSource(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?sources=${sources.value}&apiKey=${apiKey}`, news);
}
(function createSources() {
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`,function (err,res) {
        if(err) return ui.showError(err);
        else {
            const response = JSON.parse(res);
            for (let i = sources.length; i <= 5; i++){
                let source = response.sources[Math.floor(Math.random()*response.sources.length)];
                sources.appendChild(new Option(source.name, source.id));
            }
            $(document).ready(function(){
                $('select').formSelect();
            });
        }
    })
}());
function news(err, res) {
    if (!err) {
        // Пробразовываем из JSON в обычный объект
        const response = JSON.parse(res);
        // Удаляем разметку из контейнера
        ui.clearContainer();
        // перебираем новости из поля articles в объекте response
        response.articles.forEach(news => ui.addNews(news));
    } else {
        // Выводим ошибку
        ui.showError(err);
        ui.showInfo("По вашему запросу новостей не найдено!");
    }
}

function onSearch(e) {
    // Делаем запрос на получение новостей по тому что введено в инпут
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
        if (err) return ui.showError(err);
        const response = JSON.parse(res);
        if (response.totalResults) {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showInfo("По вашему запросу новостей не найдено!");
        }
    });
}
