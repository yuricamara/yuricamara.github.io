{
  // Toggle Menu
  // ******************************

  const $navItems = document.getElementById('m-nav_items');
  const $menuToggleOpen = document.getElementById('m-nav_menu-toggle-open');
  const $menuToggleClose = document.getElementById('m-nav_menu-toggle-close');

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

  $menuToggleOpen.addEventListener('click', showNavItems, false);

  $menuToggleClose.addEventListener('click', hideNavItems, false);
  $navItems.addEventListener('click', hideNavItems, false);

  window.addEventListener('scroll', () => {
    if(isNavItemsVisible){
      hideNavItems();
    }
  }, false);
}
