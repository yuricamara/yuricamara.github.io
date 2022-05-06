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
  }).then(()=> { updateContent(); });

// Conteúdo
const updateContent = () => {
  document.getElementById('output').innerHTML = i18next.t('key');
}

// Mudança de idioma
i18next.on('languageChanged', () => {
  updateContent();
});

const changeLanguage = lang => {
  i18next.changeLanguage(lang);
}
