(function () {
  /**
   * Exclusive cards data (you can replace this later with real news objects)
   * @type {Array<{title: string, href: string, date: string, time: string, imageUrl?: string}>}
   */
  const cards = [
    {
      title: 'Саида Мирзиёева посетила Ургут и ознакомилась с проектами на узбекско-таджикской границе',
      href: 'https://repost.uz/na-poezde-iz-samarkanda',
      date: '31.01.2025',
      time: '18:44',
      imageUrl:
        'https://repost.uz/storage/uploads/thumbnails/0-1766039407-farkhod-post-material-medium.webp',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      href: 'https://repost.uz/na-poezde-iz-samarkanda',
      date: '31.01.2025',
      time: '18:44',
      imageUrl:
        'https://repost.uz/storage/uploads/thumbnails/0-1766039407-farkhod-post-material-medium.webp',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      href: '#',
      date: '31.01.2025',
      time: '18:44',
      imageUrl:
        'https://repost.uz/storage/uploads/thumbnails/0-1766039407-farkhod-post-material-medium.webp',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      href: '#',
      date: '31.01.2025',
      time: '18:44',
      imageUrl:
        'https://repost.uz/storage/uploads/thumbnails/0-1766039407-farkhod-post-material-medium.webp',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      href: '#',
      date: '31.01.2025',
      time: '18:44',
      imageUrl:
        'https://repost.uz/storage/uploads/thumbnails/0-1766039407-farkhod-post-material-medium.webp',
    }
  ];

  const INITIAL_VISIBLE_CARDS = 8;
  const LOAD_MORE_STEP = 4;
  let visibleCardsCount = Math.min(INITIAL_VISIBLE_CARDS, cards.length);

  function createCardEl(card) {
    const article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('role', 'listitem');

    const href = card.href || '#';

    const thumbLink = document.createElement('a');
    thumbLink.className = 'card__thumb';
    thumbLink.href = href;
    thumbLink.setAttribute('aria-label', card.title);
    thumbLink.setAttribute('target', '_blank');
    thumbLink.setAttribute('rel', 'noopener noreferrer');

    if (card.imageUrl) {
      const img = document.createElement('img');
      img.src = card.imageUrl;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      thumbLink.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'card__body';

    const titleLink = document.createElement('a');
    titleLink.className = 'card__title';
    titleLink.href = href;
    titleLink.setAttribute('target', '_blank');
    titleLink.setAttribute('rel', 'noopener noreferrer');
    titleLink.textContent = card.title;

    const meta = document.createElement('div');
    meta.className = 'card__meta';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = card.date;

    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.textContent = '•';

    const timeSpan = document.createElement('span');
    timeSpan.textContent = card.time;

    meta.append(dateSpan, dot, timeSpan);
    body.append(titleLink, meta);
    article.append(thumbLink, body);

    return article;
  }

  function syncLoadMoreBtn() {
    const loadMoreBtn = document.getElementById('exclusive-load-more');
    if (!loadMoreBtn) return;

    loadMoreBtn.hidden = visibleCardsCount >= cards.length;
  }

  function renderExclusiveCards() {
    const container = document.getElementById('exclusive-cards');
    if (!container) return;

    const fragment = document.createDocumentFragment();
    for (const card of cards.slice(0, visibleCardsCount)) {
      fragment.appendChild(createCardEl(card));
    }

    container.replaceChildren(fragment);

    syncLoadMoreBtn();
  }

  renderExclusiveCards();

  const loadMoreBtn = document.getElementById('exclusive-load-more');
  loadMoreBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    visibleCardsCount = Math.min(visibleCardsCount + LOAD_MORE_STEP, cards.length);
    renderExclusiveCards();
  });

  // Mobile drawer
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!burger || !drawer || !backdrop) return;

  const closeBtn = drawer.querySelector('.drawer__close');
  const body = document.body;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');

    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');

    backdrop.hidden = false;
    body.style.overflow = 'hidden';

    closeBtn?.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');

    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');

    backdrop.hidden = true;
    body.style.overflow = '';

    burger.focus();
  }

  burger.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });
})();