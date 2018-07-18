// Init UI
const ui = new UI();
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();
const alert = new Alert;

const newsContainer = document.querySelector('.news-container');
// по загрузке страницы получить все новости избранные
window.addEventListener("load", onLoad);

function removeFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
        const id = e.target.dataset.id;
        alert.showAlert({error:true, text:'Новость успешно удалена!'});
        // M.toast({html: 'Новость успешно удалена', displayLength: 1000, classes: 'red lighten-2 toastClass'});
        news.removeFavoriteNews(id);
        let button  = document.querySelector('button[data-id = \"' + id + '\"]');
        button.closest('.col').remove();

    }
}

function onLoad(e) {
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
            favoriteNews.forEach((doc) => {
                ui.addFavoriteNews(doc.data(), doc.id);
            });
        })
        .then(() => {
            newsContainer.addEventListener("click", removeFavorite);
        })
        .catch(error => {
            console.log(error);
        })
}

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    }
});
const logout = document.querySelector('.logout_favor');
logout.addEventListener("click", onLogoutFavor);
function onLogoutFavor () {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch((error) => console.log(error));

}