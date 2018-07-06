// Init Auth
const auth = new Auth();
// Init UI
const ui = new UI();
// Init Elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const passwordRepeat = form.elements['passwordRepeat'];
const register = document.querySelector('.register');
const show_password = document.querySelector('.show_password');

form.addEventListener("click", onRegister);
function onRegister (e) {
    e.preventDefault();

    if (email.value && password.value && passwordRepeat.value) {
        if (password.value === passwordRepeat.value)
        auth.register(email.value, password.value)
            .then(() => {
            ui.showInfoReg('Регистрация прошла успешно');
                setTimeout(()=>{
                    window.location = 'index.html';
                },3000);
                form.reset();
            })
            .catch(error => {
                //show error
                ui.showErrorLogin(error.message, register)

            });
    }
}

show_password.addEventListener('click', function (e) {
    e.preventDefault();
    password.type === 'text' ? password.type = 'password' : password.type = 'text';

});
