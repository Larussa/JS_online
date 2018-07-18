// Init Auth
const auth = new Auth();
// Init UI
const ui = new UI();

// Init Elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const register = document.querySelector('.register');
const show_password = document.querySelector('.show_password');
const login = document.querySelector('.login');

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location = 'index.html';
    }
});


form.addEventListener('submit', onLogin);
function onLogin(e) {
    e.preventDefault();

    if (email.value && password.value) {
        auth.login(email.value, password.value)
            .then(() => {
                window.location = 'index.html';
            })
            .catch((error) => {
                ui.showErrorLogin(error.message, login);
            });
    }
}
register.addEventListener('click', function () {
    window.location = 'register.html';
});

show_password.addEventListener('click', function (e) {
    e.preventDefault();
    password.type === 'text' ? password.type = 'password' : password.type = 'text';

});
