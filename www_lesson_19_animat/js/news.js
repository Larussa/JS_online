class FavoriteNews {
    constructor() {
        this.db = FireStoreInit.getInstance().getDb();
        this.collectionName = "favorite-news";
    }

    getFavoriteNews() {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).get()
                .then((querySnapshot) => resolve(querySnapshot))
                .catch(err => reject(err));
        })
    }

    addFavoriteNews(news) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).add(news)
                .then(docRef => resolve(docRef))
                .catch(err => reject(err));
        })
    }

    addFavoriteSource(source) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).add(source)
                .then(docRef => resolve(docRef))
                .catch(err => reject(err));
        })
    }

    removeFavoriteNews(id) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).doc(id).delete().then(function() {
                console.log("Документ успешно удален");
            }).catch(function(error) {
                console.error("Ошибка удаления: ", error);
            });
        })
    }
}