(function ($) {
  class Modal{
    constructor(element, options) {
      this.modal = element;
      this.defaultOptions = {
        closeClass: ".close-modal",
        overlayOpacity: 0.7,
        duration: 500,
        autoClose: true,
        autoCloseTime: 3000
      };
      this.options = $.extend(this.defaultOptions, options);
    }

    init() {
        this.showOverlay()
            .done(this.showModal()
                .done(this.setEvents())
                    .done(this.autoClose())
        );
    }
    autoClose() {
        let defer = $.Deferred();
        if (this.defaultOptions.autoClose) {
            setTimeout(() => {
                this.closeModal();
            },
                this.defaultOptions.autoCloseTime);
                return defer.resolve();
        }

    }
    showOverlay() {
         // скрываем у body боковой скролл
        $("body").css({"overflow-y": "hidden"});
        let defer = $.Deferred();
        const overlay = $("<div class='overlay'></div>").css({
            "display": "block",
            "position": "fixed",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "z-index": 999,
            "opacity": 0,
            "background-color": `rgba(0, 0, 0, ${this.options   .overlayOpacity})`
        });
        this.modal.before(overlay);
        return defer.resolve();
    }
    showModal() {
        let defer = $.Deferred();
        if (this.calcModalSize()) defer.reject();
        const {halfWidth, halfHeight} = this.calcModalSize();
        // Показать overlay
        $(".overlay").animate({
            "opacity": 1
        }, this.options.duration);

        // Показать модальное окно
        this.modal.css({
            "display": "block",
            "position": "fixed",
            "top": "50%",
            "left": "50%",
            "z-index": 1000,
            "opacity": 0,
            "margin-top": `-${halfHeight}px`,
            "margin-left": `-${halfWidth}px`,
        }).animate({
            "opacity": 1
        }, this.options.duration);
           return defer.resolve();
    }
    setEvents() {
      $(this.options.closeClass).on("click", (e) => this.closeModal());
    }
    clearEvents() {
      $(".overlay").off("click");
      $(this.options.closeClass).off("click");
    }
    closeModal() {
      $("body").css({"overflow-y": "auto"});
      // удаляем overlay
      $(".overlay")
        .animate({"opacity": 0}, this.options.duration, () => $(".overlay").remove());
      // скрываем модальное окно
      this.modal.animate({
        "opacity": 0
      }, this.options.duration, () => this.modal.css({"display": "none"}));
      // удаляем события
      this.clearEvents();
    }
    calcModalSize() {
      const halfWidth = this.modal.outerWidth() / 2;
      const halfHeight = this.modal.outerHeight() / 2;
      return {
        halfWidth,
        halfHeight
      }
    }
  }
  $.fn.easyModal = function (options) {
    new Modal(this, options).init();
  }
})(jQuery);
