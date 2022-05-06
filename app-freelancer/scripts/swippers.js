{
  // Swipper
  // ==============================
  const createSwiper = () => {
    return new Swiper ('.swiper', {
      spaceBetween: 5,
      centeredSlides: true,

      lazy: true,
      grabCursor: true,
      keyboard: {
        enabled: true
      },

      pagination: {
        el: '.swiper-pagination'
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  };

  // Modais
  // ==============================
  let swiper;

  MicroModal.init({
    onShow: modal => {
      if (
        modal.id === 'modal-gtr-checkdelivery' ||
        modal.id === 'modal-gtr-mobile'
      ){
        swiper = createSwiper();
      }
    },
    onClose: () => {
      if(swiper){
        if(swiper instanceof Array){
          swiper.forEach(sw => sw.destroy());
        } else {
          swiper.destroy();
        }
      }
    },
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  });
}

