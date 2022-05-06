i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    cleanCode: true,
    resources: {
      en: {
        translation: {
          "key": "hello"
        }
      },
      pt: {
        translation: {
          "key": "oi"
        }
      }
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
