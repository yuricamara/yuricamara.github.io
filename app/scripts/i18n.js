const keys = {
  'about-intro': null,
  is: { what: 'i18next', how: 'great' }
}

// Keys
const replaceByKeys = keys => {
  for(const p in keys){
    const el = document.querySelector(`[data-i18n="${p}"]`);
    el ? el.innerHTML = i18next.t(`${p}`, keys[p]) : console.error(`i18n error: elemento HTML com key ${p} não encontrado.`);
  }
}

// Lang
const setDataLang = () => {
  document.querySelector('[data-lang]').setAttribute('data-lang', i18next.language)
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
    setDataLang();
    replaceByKeys(keys);

    i18next.on('languageChanged', () => {
      setDataLang();
      replaceByKeys(keys);
    });
  })
  .catch(error => {
    console.error('i18n error',error);
  });

const changeLanguage = lang => {
  i18next.changeLanguage(lang);
}
