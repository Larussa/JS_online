// Init Auth
const auth = new Auth();
// Init UI
const ui = new UI();
// Init Elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const register = document.querySelector('.register');
const new_register = document.querySelector('.new_register');


form.addEventListener("click", onRegister);
function onRegister (e) {
    e.preventDefault();

    if (email.value && password.value) {
        auth.register(email.value, password.value)
            .then(() => {
                window.location = 'index.html';
            })
            .catch(error => {
                //show error
                ui.showErrorLogin(error.message, register)

            });
    }
}

new_register.addEventListener('click', function (e) {
    e.preventDefault();
    if (password.type === 'text') {
        password.type = 'password';
    } else {
        password.type = 'text';
    }
});