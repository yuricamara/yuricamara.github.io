{
  const d = document;

  // Nav
  // ==============================
  const $navItems = d.getElementById('m-nav_items');
  const $menuToggleOpen = d.getElementById('m-nav_menu-toggle-open');
  const $menuToggleClose = d.getElementById('m-nav_menu-toggle-close');

  let isNavItemsVisible = false;

  const showNavItems = () => {
    $navItems.style.display = 'block';
    $menuToggleOpen.style.display = 'none';
    $menuToggleClose.style.display = 'block';
    isNavItemsVisible = true;
  };

  const hideNavItems = () => {
    $navItems.style.display = 'none';
    $menuToggleOpen.style.display = 'block';
    $menuToggleClose.style.display = 'none';
    isNavItemsVisible = false;
  };

  const onNavItemsClick = e => {
    hideNavItems();

    const navElement = e.target || e.srcElement;
    const goToElement = navElement.id.replace('nav', 'm');

    d.getElementById(goToElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Btn Menu Toggle
  $menuToggleOpen.addEventListener('click', showNavItems, false);
  $menuToggleClose.addEventListener('click', hideNavItems, false);

  // Nav Items
  $navItems.addEventListener('click', onNavItemsClick, false);

  //On scroll
  window.addEventListener('scroll', () => {
    if(isNavItemsVisible){
      hideNavItems();
    }
  }, false);


  // Lazy Loading Images
  // ==============================
  // HTML
  // ******************************
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    // Não suportado no IE
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }

  // CSS
  // ******************************
  const lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    // Não suportado no IE
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }

  // Swipper
  // ==============================
  const createSwiper = () => {
    return new Swiper ('.swiper-container', {
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
      console.info(`${modal.id} is shown`);

      if (
        modal.id === 'modal-gtr-checkdelivery' ||
        modal.id === 'modal-gtr-mobile'
      ){
        swiper = createSwiper();
      }
    },
    onClose: modal => {
      console.info(`${modal.id} is hidden`);

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

