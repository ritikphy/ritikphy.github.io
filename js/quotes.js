window.RitikQuotes = (() => {
  function normalizeQuoteEntry(entry) {
    if (!entry) return null;
    if (typeof entry === 'string') return { quote: entry, author: '' };
    return {
      quote: String(entry.quote || '').trim(),
      author: String(entry.author || '').trim(),
    };
  }

  function pickRandomQuote(list) {
    const normalized = (list || []).map(normalizeQuoteEntry).filter((item) => item && item.quote);
    return window.RitikUtils.randomFrom(normalized) || { quote: 'What I cannot create, I do not understand.', author: 'Richard Feynman' };
  }

  function renderQuote(element, quote) {
    if (!element || !quote) return;
    const text = element.querySelector('.hero-quote-text');
    const author = element.querySelector('.hero-quote-author');
    if (text) text.textContent = `“${quote.quote}”`;
    if (author) author.textContent = quote.author ? `— ${quote.author}` : '';
  }

  return { pickRandomQuote, renderQuote };
})();
