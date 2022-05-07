const keys = {
  hello: null,
  is: { what: 'i18next', how: 'great' }
}

// Conteúdo
const replaceByKeys = keys => {
  for(const p in keys){
    const el = document.querySelector(`[data-i18n="${p}"]`);
    el ? el.innerHTML = i18next.t(`${p}`, keys[p]) : console.error(`i18n error: elemento HTML com key ${p} não encontrado.`);
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
  })
  .then(()=> {
    replaceByKeys(keys);
    i18next.on('languageChanged', () => {
      replaceByKeys(keys);
    });
  })
  .catch(error => {
    console.error('error',error);
  });

const changeLanguage = lang => {
  i18next.changeLanguage(lang);
}
