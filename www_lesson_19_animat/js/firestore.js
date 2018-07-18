const FireStoreInit = (function () {
    var instance;
    var config = {
        apiKey: "AIzaSyAJr35KuyG0NLx7vITKQrAKLBHvsx8Gm-w",
        authDomain: "larussa-news-app.firebaseapp.com",
        databaseURL: "https://larussa-news-app.firebaseio.com",
        projectId: "larussa-news-app",
        storageBucket: "larussa-news-app.appspot.com",
        messagingSenderId: "877346256735"
    };
    firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    function getDb() {
       return db;
    }
    function createInstance(){
        return {
            getDb
        }
    }
    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
})();