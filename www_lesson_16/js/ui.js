class UI {
    constructor() {
        this.container = document.querySelector(".news-container .container .row");
    }

    addNews(news) {
        const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
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

}