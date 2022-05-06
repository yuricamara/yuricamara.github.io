const keys = {
  hello: null,
  // title: { what: 'i18next' }
}

// Conteúdo
const replaceByKeys = keys => {
  for(const p in keys){
    document.querySelector(`[data-i18n="${p}"]`).innerHTML = i18next.t(`${p}`);
  }
}

i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: true,
    cleanCode: true,
    backend: {
      loadPath: `${document.location.href}locales/{{lng}}.json`,
      crossDomain: true,
      queryStringParams: { v: '1.0.0' },
    }
  }).then(()=> {
    replaceByKeys(keys);
    i18next.on('languageChanged', () => {
      replaceByKeys(keys);
    });
});


const changeLanguage = lang => {
  i18next.changeLanguage(lang);
}
