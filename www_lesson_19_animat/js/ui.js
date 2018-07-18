class UI {
    constructor() {
        this.container = document.querySelector(".news-container .container .row");
    }

    addNews(news, index) {
        const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-index="${index}" class="waves-effect waves-light btn add-favorite">Add favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

        let div = document.createElement('div');
        div.innerHTML = template.trim();
        div.classList.add('animation-wrapper');
        div.style.opacity = 0;
        div.style.transform = 'translateY(150px)';

        this.container.insertAdjacentElement("beforeend", div);

        this.animateElement(div);
    }

    addFavoriteNews(news, id) {
        const template = `
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-id="${id}" class="waves-effect waves-light red darken-1 btn remove-favorite">Remove favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
        `;

        let div = document.createElement('div');
        div.innerHTML = template.trim();
        div.classList.add('col', 's12', 'm6');
        div.style.opacity = 0;
        div.style.transform = 'translateY(150px)';

        this.container.insertAdjacentElement("beforeend", div);

        this.animateElement(div);
    }

    animateElement(element) {
        // step of changing property
        let opacityStep = 0,
            translateYStep = 50;

        function animateAction() {
            // control position
            if (translateYStep >= 0)
                translateYStep -= 2;
            // control opacity
            if (parseFloat(element.style.opacity) <= 1)
                opacityStep += 0.01;

            // animate properties
            element.style.transform = `translateY(${translateYStep}px)`;
            element.style.opacity = opacityStep;

            // do raf
            const raf = requestAnimationFrame(animateAction);
            // check
            if (parseFloat(element.style.opacity) >= 1 && translateYStep <= 0)
                cancelAnimationFrame(raf);
        }

        animateAction(element);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    addSources(source) {
        const option = `
        <option value=${source.id}>${source.name}</option>
         `;
        document.getElementById('source').insertAdjacentHTML("beforeend", option);
    }

    showLoader() {
        this.clearContainer();
        const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    showInfo(msg) {
        this.clearContainer();
        const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    showError(err) {
        this.clearContainer();
        const template = `
      <div class="card red lighten-1">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${err}</p>
        </div>
      </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    showErrorLogin(error, button) {
        const template = `
      <div class="card grey lighten-2 template">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${error}</p>
        </div>
      </div>
    `;
        // Get title
        const title = document.querySelector('.card-title');
        // Disabled btn
        button.disabled = true;

        // Insert alert
        title.insertAdjacentHTML('beforeend', template);

        email.value = '';
        password.value = '';

        setTimeout(function () {
            document.querySelector('.template').remove();
            button.disabled = false;
        }, 3000);

    }
    showInfoReg() {

        const template = `
       <div class="card grey lighten-1 template">
        <div class="card-content">
            <span class="card-title">All ok! registration was successful.</span>
         </div>
      </div>
    `;
        const title = document.querySelector('.card-title');
        // Insert alert
        title.insertAdjacentHTML('beforeend', template);

    }
}