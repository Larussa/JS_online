class Alert {
    creatAlert(msg) {
        let alertCase = document.querySelector('.alert-case');
        const alert = document.createElement('div');
        alert.classList.add('alert', `${msg.error ? 'alert-danger' : 'alert-success'}`);
        alert.textContent = msg.text;
        alert.style.opacity = 0;
        alert.style.maxWidth = '300px';
        alert.style.padding = '15px';
        alert.style.padding = '15px';
        alert.style.textAlign = 'center';
        alert.style.color = '#fff';
        alert.style.margin = '15px auto';
        alertCase.insertAdjacentElement("beforeend", alert);
        return alert;
    }

    showAlert(msg) {
        const alert = this.creatAlert(msg);
        this.animationUpOpacityElement(alert)
            .then((element)=>{
                return this.animationUpOpacityElement(element)
            })
            .then((element)=>{
                return this.deleteAlert(element)
            })
    }

    animationUpOpacityElement(element) {
        // step of changing property
        return new Promise(function (resolve, reject) {
            let opacityStep = 0,
                translateYStep = 50;

            function animateAction() {
                // control position
                if (translateYStep >= 0)
                    translateYStep -= 1;
                // control opacity
                if (parseFloat(element.style.opacity) <= 1)
                    opacityStep += 0.05;

                // animate properties
                element.style.transform = `translateY(${translateYStep}px)`;
                element.style.opacity = opacityStep;

                // do raf
                const raf = requestAnimationFrame(animateAction);
                // check
                if (parseFloat(element.style.opacity) >= 1 && translateYStep <= 0)
                    cancelAnimationFrame(raf);
                return resolve(element);
            }

            animateAction(element);
        });
    }

    deleteAlert(element){

        function animateAction(time) {
            element.style.opacity = (+element.style.opacity)-0.05;

            const raf = requestAnimationFrame(animateAction);

            if (parseFloat(element.style.opacity) === 0) {
                cancelAnimationFrame(raf);
                setTimeout(()=>{
                    document.querySelector('.alert').remove();
                },3000)
            }
        }

        animateAction();
    }
}