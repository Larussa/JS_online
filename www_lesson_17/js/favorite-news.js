// Init UI
const ui = new UI();
// Api key
const apiKey = "b09139bfceb545c4a56068e424f433a7";
// Init Auth
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();

const newsContainer = document.querySelector('.news-container');
// по загрузке страницы получить все новости избранные
window.addEventListener("load", onLoad);

function removeFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
        const id = e.target.dataset.id;
        M.toast({html: 'Новость успешно удалена', displayLength: 1000, classes: 'red lighten-2 toastClass'});
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
