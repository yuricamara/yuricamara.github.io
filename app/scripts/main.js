{
  const d = document;

  // Nav
  // ******************************
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
}
