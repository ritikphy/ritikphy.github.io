window.RitikHero = (() => {
  function pickRandomImage(images) {
    const available = (images || []).filter(Boolean);
    return window.RitikUtils.randomFrom(available) || '';
  }

  function preloadImage(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function renderHero(site, quoteData) {
    const heroMedia = document.getElementById('hero-media');
    const heroQuote = document.getElementById('hero-quote');
    const profilePhoto = document.getElementById('profile-photo');

    const chosenHero = pickRandomImage(Array.isArray(site?.heroImages) ? site.heroImages : []);
    const chosenProfile = pickRandomImage(Array.isArray(site?.profileImages) ? site.profileImages : []);

    if (chosenHero && heroMedia) {
      const loaded = await preloadImage(chosenHero);
      if (loaded) {
        heroMedia.style.setProperty('--hero-image', `url("${chosenHero}")`);
      }
      // If preload fails (bad path, offline, etc.) the element simply keeps
      // the --hero-image default set in variables.css, so the background
      // is never left blank.
    }

    if (profilePhoto && chosenProfile) {
      profilePhoto.src = chosenProfile;
      profilePhoto.loading = 'eager';
      profilePhoto.decoding = 'async';
    }

    const quote = window.RitikQuotes.pickRandomQuote(quoteData?.quotes || []);
    window.RitikQuotes.renderQuote(heroQuote, quote);
  }

  return { renderHero };
})();
