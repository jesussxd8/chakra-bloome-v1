(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const menuItems = [
    // Café
    {c:'cafe',n:'Expreso',p:'1,40 €'},
    {c:'cafe',n:'Expreso Largo',p:'1,50 €'},
    {c:'cafe',n:'Doble Expreso',p:'2,00 €'},
    {c:'cafe',n:'Macchiato / Latte Macchiato',p:'1,50–2,20 €',d:'Expreso con toque de crema de leche / leche cremosa con café.'},
    {c:'cafe',n:'Cortado Corto / Largo',p:'1,50–1,70 €'},
    {c:'cafe',n:'Leche & Leche Corto / Largo',p:'1,70–2,00 €'},
    {c:'cafe',n:'Americano',p:'1,80 €'},
    {c:'cafe',n:'Café con Leche',p:'2,00 €'},
    {c:'cafe',n:'Flat White',p:'3,00 €',d:'Doble carga de café.'},
    {c:'cafe',n:'Golden Milk',p:'2,80 €',d:'Cúrcuma, pimienta negra y jengibre.'},
    {c:'cafe',n:'Chai Latte',p:'3,20 €',d:'Té negro, cardamomo, jengibre, clavo y pimienta negra.'},
    {c:'cafe',n:'Chocolate Caliente',p:'2,50 €'},
    {c:'cafe',n:'Pink Latte',p:'3,80 €',d:'Remolacha, vainilla y leche.'},
    {c:'cafe',n:'Cappuccino',p:'2,20 €'},
    {c:'cafe',n:'Cappuccino con Sabor',p:'3,00 €',d:'Caramelo, vainilla, cinnamon rolls, chocolate o pistacho.'},
    {c:'cafe',n:'Iced Coffee',p:'2,80 €'},
    {c:'cafe',n:'Iced Coffee con Sabor',p:'3,50 €',d:'Caramelo, vainilla, cinnamon rolls, chocolate o pistacho.'},
    {c:'cafe',n:'Iced Golden Milk',p:'3,50 €'},
    {c:'cafe',n:'Iced Chai Latte',p:'3,80 €'},
    {c:'cafe',n:'Iced Americano',p:'2,50 €'},
    {c:'cafe',n:'Leches vegetales',p:'+0,30 €',d:'Avena, almendra, soja y sin lactosa.'},
    {c:'cafe',n:'Leche de coco',p:'+0,50 €'},
    {c:'cafe',n:'Añade nata',p:'+1,00 €'},

    // Matcha, ube y tés
    {c:'matcha',n:'Matcha',p:'3,50 €'},
    {c:'matcha',n:'Iced Matcha',p:'4,00 €'},
    {c:'matcha',n:'Iced Matcha Vainilla o Caramelo',p:'4,50 €'},
    {c:'matcha',n:'Iced Matcha Fresa, Mango o Maracuyá',p:'4,50 €'},
    {c:'matcha',n:'Iced Matcha Orange',p:'5,50 €',t:'Nuevo'},
    {c:'matcha',n:'Ube Matcha',p:'4,50 €'},
    {c:'matcha',n:'Ube Vainilla Latte',p:'4,50 €'},
    {c:'matcha',n:'Ube Latte',p:'3,50 €'},
    {c:'matcha',n:'Manzanilla',p:'2,50 €'},
    {c:'matcha',n:'Menta poleo',p:'2,50 €'},
    {c:'matcha',n:'Té Rojo China Pu Erh',p:'2,50 €'},
    {c:'matcha',n:'Té Negro English',p:'2,50 €'},
    {c:'matcha',n:'Té Verde Chai',p:'2,50 €'},
    {c:'matcha',n:'Té Jengibre y Limón',p:'2,50 €'},
    {c:'matcha',n:'Rooibos yogur y arándanos',p:'2,50 €'},
    {c:'matcha',n:'Infusión mezcla de frutas del bosque',p:'2,50 €'},

    // Jugos y bebidas
    {c:'bebidas',n:'Zumo de Naranja',p:'3,70 €',d:'Recién exprimido.'},
    {c:'bebidas',n:'Chakra Sacro',p:'4,70 €',d:'Naranja, papaya y tuno indio.'},
    {c:'bebidas',n:'Chakra Raíz',p:'4,70 €',d:'Lima, pepino, apio, manzana, jengibre y espinaca.'},
    {c:'bebidas',n:'Chakra Corazón',p:'4,70 €',d:'Naranja, mango y semillas de chía.'},
    {c:'bebidas',n:'Chakra Manipura',p:'4,70 €',d:'Naranja, zanahoria, remolacha y jengibre.'},
    {c:'bebidas',n:'Chakra Tropical',p:'6,00 €',d:'Leche de coco, mango, piña y maracuyá.',t:'Nuevo'},
    {c:'bebidas',n:'Agua con gas / sin gas',p:'2,20 €'},
    {c:'bebidas',n:'Refrescos',p:'2,20 €'},
    {c:'bebidas',n:'Alambra Verde',p:'3,00 €'},
    {c:'bebidas',n:'Limonada Casera Tradicional',p:'3,80 €'},
    {c:'bebidas',n:'Limonada Casera de Maracuyá, Fresa o Mango',p:'4,00 €'},

    // Bowls
    {c:'bowls',n:'Bowl Açai',p:'8,90 €',d:'Smoothie bowl de açai, bebida vegetal, fruta fresca, granola, mantequilla de cacahuete, semillas de chía y frutos secos.'},
    {c:'bowls',n:'Bowl Blanco',p:'8,90 €',d:'Smoothie bowl de mango y piña, bebida vegetal, granola, sirope de agave, chips de coco, frutos secos y fruta fresca.'},
    {c:'bowls',n:'Yogurt Natural',p:'7,90 €',d:'Con granola, nueces, sirope de agave y fruta de temporada.'},
    {c:'bowls',n:'Extra Nutella',p:'1,50 €'},
    {c:'bowls',n:'Extra Pistacho',p:'1,50 €'},
    {c:'bowls',n:'Extra Crema de cacahuete',p:'1,50 €'},
    {c:'bowls',n:'Extra Granola',p:'1,50 €'},
    {c:'bowls',n:'Extra Frutos secos',p:'1,00 €'},
    {c:'bowls',n:'Extra Virutas de cacao',p:'1,00 €'},
    {c:'bowls',n:'Extra Chía',p:'1,00 €'},
    {c:'bowls',n:'Extra Coco rallado',p:'1,00 €'},

    // Tostas y sandwiches
    {c:'tostas',n:'Huevo Benedicto · Bacon',p:'9,00 €',d:'Pan brioche, huevo poché y salsa holandesa. Extra aguacate +1,50 €.'},
    {c:'tostas',n:'Huevo Benedicto · Mechada',p:'9,50 €',d:'Pan brioche, huevo poché y salsa holandesa. Extra aguacate +1,50 €.'},
    {c:'tostas',n:'Huevo Benedicto · Salmón Ahumado',p:'10,00 €',d:'Pan brioche, huevo poché y salsa holandesa. Extra aguacate +1,50 €.'},
    {c:'tostas',n:'Tosta Salmón Ahumado',p:'8,50 €',d:'Masa madre, salmón ahumado, champiñones con espinacas y mousse de queso cítrico con pepino encurtido.'},
    {c:'tostas',n:'Tosta Tricolor',p:'7,20 €',d:'Trío de hummus de remolacha, curry y comino sobre masa madre y aceitunas de kalamata.'},
    {c:'tostas',n:'Croissant Aguacate',p:'7,50 €',d:'Croissant con aguacate machacado, canónigos y huevo poché.'},
    {c:'tostas',n:'Tosta de Aguacate',p:'7,50 €',d:'Masa madre, aguacate, cilantro y huevo poché con lima y rábano.'},
    {c:'tostas',n:'Tosta Jamón Serrano',p:'6,50 €',d:'Masa madre con tumaca, jamón serrano y tomates asados. Extra huevo poché o aguacate +1,50 €.'},
    {c:'tostas',n:'Tosta Capresse',p:'7,50 €',d:'Masa madre, pesto, tomates asados, mozzarella de búfala, canónigos, guacamole y albahaca. Extra huevo poché +1,50 €.'},
    {c:'tostas',n:'Añade paleta ibérica',p:'+2,00 €'},
    {c:'tostas',n:'Sándwich Mixto',p:'4,50 €',d:'Jamón y queso fundido acompañado de pepino.'},
    {c:'tostas',n:'Sandwich Berenjena',p:'5,50 €',d:'Acompañado de tomates asados, pesto y mozzarella.'},
    {c:'tostas',n:'Sándwich Mixto Trufado',p:'6,90 €',d:'Gratinado con bechamel.'},

    // Huevos
    {c:'huevos',n:'Dos Huevitos',p:'7,50 €',d:'Huevos revueltos con puerros, acompañado de aguacate y pan de masa madre.'},
    {c:'huevos',n:'English Breakfast',p:'12,00 €',d:'Dos huevos fritos, bacon, judías, champiñones con espinacas y pan de masa madre.'},
    {c:'huevos',n:'Trío de Huevos',p:'9,50 €',d:'Huevos revueltos con salmón y aguacate acompañado de pan de masa madre.'},
    {c:'huevos',n:'Hogaza de masa madre',p:'1,00 €'},
    {c:'huevos',n:'Pan brioche',p:'1,50 €'},
    {c:'huevos',n:'Pan sin gluten',p:'2,00 €',d:'Posible contaminación cruzada.'},
    {c:'huevos',n:'Extra Huevo',p:'1,50 €'},
    {c:'huevos',n:'Extra Aguacate',p:'1,50 €'},
    {c:'huevos',n:'Extra Bacon',p:'2,00 €'},
    {c:'huevos',n:'Extra Ibérico',p:'2,00 €'},
    {c:'huevos',n:'Extra Salmón',p:'3,00 €'},
    {c:'huevos',n:'Extra Búfala',p:'2,00 €'},
    {c:'huevos',n:'Extra Cherry',p:'1,50 €'},
    {c:'huevos',n:'Extra Mechada',p:'2,50 €'},
    {c:'huevos',n:'Extra Mermelada',p:'1,50 €'},
    {c:'huevos',n:'Extra Mantequilla',p:'1,50 €'},

    // Dulce y combo
    {c:'dulce',n:'Pancakes Dulces',p:'9,00 €',d:'Plátano, arándanos, fruta de temporada y almendras laminadas. Elige Nutella, dulce de leche, sirope de agave, chocolate blanco, crema de pistacho o mermelada de fresa.'},
    {c:'dulce',n:'Pancakes Salados',p:'11,00 €',d:'Pancakes con bacon, huevo poché, sirope de agave, aguacate y fruta de temporada.',t:'Nuevo'},
    {c:'dulce',n:'Menú Combo',p:'14,90 €',d:'Elige una opción de cada grupo: pan; huevos; jamón serrano/bacon/aguacate; hummus/tomates asados/champiñones con espinacas; mini bowl de yogur o macedonia.'},
  ];

  const categories = [
    ['all','Toda la carta'],['cafe','Café'],['matcha','Matcha & Ube'],['bebidas','Jugos & Bebidas'],
    ['bowls','Bowls'],['tostas','Tostas & Sandwiches'],['huevos','Huevos'],['dulce','Dulce & Combo']
  ];

  const categoryMeta = {
    all:{title:'Toda la carta', intro:'Una vista general de Chakra: cafés, jugos, bowls, tostas, huevos, dulces y combos.', note:'Todos los precios se han tomado de la carta facilitada e incluyen IGIC.', image:'assets/img/combo-board.webp'},
    cafe:{title:'Café 100% arábico', intro:'Expresos, flat white, chai, golden milk y cafés calientes o iced para cualquier momento del día.', note:'Leches vegetales disponibles y opción de coco con suplemento.', image:'assets/img/latte.webp'},
    matcha:{title:'Matcha & Ube Lovers', intro:'Matcha, ube y tés e infusiones para quienes buscan color, ritual y algo diferente.', note:'Incluye opciones iced y combinaciones de vainilla, caramelo, fresa, mango o maracuyá.', image:'assets/img/matcha-orange.webp'},
    bebidas:{title:'Jugos & bebidas', intro:'Zumos naturales y bebidas frías elaboradas con frutas y verduras frescas de temporada.', note:'Desde el zumo de naranja recién exprimido hasta las combinaciones Chakra Sacro, Raíz, Corazón, Manipura y Tropical.', image:'assets/img/juice-board.webp'},
    bowls:{title:'Bowls', intro:'Açaí, bowl blanco y yogur natural con fruta, granola y toppings para desayunos frescos y completos.', note:'Las frutas decorativas pueden variar según temporada.', image:'assets/img/bowl-acai.webp'},
    tostas:{title:'Tostas & sandwiches', intro:'Masa madre, brioche y croissant con propuestas saladas muy visuales.', note:'Se ofrece pan sin gluten con aviso de posible contaminación cruzada.', image:'assets/img/toast-tricolor-horizontal.webp'},
    huevos:{title:'Huevos', intro:'Benedict, revueltos, english breakfast y otras opciones contundentes para brunch.', note:'Puedes añadir extras como aguacate, bacon, ibérico o salmón según la carta.', image:'assets/img/trio-eggs.webp'},
    dulce:{title:'Dulce & combo', intro:'Pancakes dulces y salados, además del menú combo para mezclar y combinar.', note:'Perfecto para un brunch largo, compartido o para dejarse llevar por el antojo.', image:'assets/img/pancakes-sweet.webp'}
  };

  const itemThumbs = {
    'Cappuccino':'assets/img/latte.webp',
    'Flat White':'assets/img/latte.webp',
    'Café con Leche':'assets/img/latte.webp',
    'Iced Matcha Orange':'assets/img/matcha-orange.webp',
    'Matcha':'assets/img/matcha-orange.webp',
    'Iced Matcha':'assets/img/matcha-orange.webp',
    'Ube Matcha':'assets/img/matcha-orange.webp',
    'Chakra Sacro':'assets/img/juice-board.webp',
    'Chakra Raíz':'assets/img/juice-board.webp',
    'Chakra Corazón':'assets/img/juice-board.webp',
    'Chakra Manipura':'assets/img/juice-board.webp',
    'Chakra Tropical':'assets/img/juice-board.webp',
    'Zumo de Naranja':'assets/img/juice-board.webp',
    'Bowl Açai':'assets/img/bowl-acai.webp',
    'Bowl Blanco':'assets/img/bowl-berry.webp',
    'Yogurt Natural':'assets/img/bowl-yogurt.webp',
    'Huevo Benedicto':'assets/img/benedict.webp',
    'Tosta Tricolor':'assets/img/toast-tricolor-horizontal.webp',
    'Tosta Salmón Ahumado':'assets/img/toast-salmon.webp',
    'Croissant Aguacate':'assets/img/croissant-avocado.webp',
    'Tosta de Aguacate':'assets/img/toast-avocado.webp',
    'Tosta Capresse':'assets/img/toast-caprese.webp',
    'Tosta Jamón Serrano':'assets/img/toast-caprese.webp',
    'Trío de Huevos':'assets/img/trio-eggs.webp',
    'Dos Huevitos':'assets/img/toast-avocado.webp',
    'English Breakfast':'assets/img/english-breakfast.webp',
    'Pancakes Dulces':'assets/img/pancakes-sweet.webp',
    'Pancakes Salados':'assets/img/pancakes-savory.webp',
    'Menú Combo':'assets/img/combo-board.webp'
  };

  const groupKickers = {
    cafe:'Cafés y lattes', matcha:'Matcha, ube y tés', bebidas:'Jugos naturales y bebidas', bowls:'Fruta, granola y superfoods',
    tostas:'Tostas, croissants y sandwiches', huevos:'Brunch con huevo', dulce:'Algo dulce y combos'
  };

  const I18n = window.ChakraI18n || {t:s=>s, language:'es'};
  const tr = source => I18n.t(source);
  const currentLanguage = () => I18n.language || 'es';
  const tabs = $('#menuTabs'), showcase = $('#menuShowcase'), grid = $('#menuGrid'), count = $('#menuCount'), search = $('#menuSearch'), empty = $('#menuEmpty');
  let activeCategory = 'all';

  const renderTabs = () => {
    if (!tabs) return;
    tabs.replaceChildren();
    const frag = document.createDocumentFragment();
    categories.forEach(([key,label]) => {
      const selected = key === activeCategory;
      const btn = document.createElement('button');
      btn.className = 'menu-tab';
      btn.type = 'button';
      btn.setAttribute('role','tab');
      btn.setAttribute('aria-selected',String(selected));
      btn.dataset.category = key;
      btn.tabIndex = selected ? 0 : -1;
      btn.textContent = tr(label);
      frag.append(btn);
    });
    tabs.append(frag);
  };

  const renderShowcase = () => {
    if (!showcase) return;
    showcase.replaceChildren();
    const frag = document.createDocumentFragment();
    categories.filter(([key]) => key !== 'all').forEach(([key,label], idx) => {
      const meta = categoryMeta[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `menu-showcard${key===activeCategory?' is-active':''}`;
      btn.dataset.category = key;
      btn.style.animationDelay = `${idx*40}ms`;
      const total = menuItems.filter(item => item.c === key).length;
      btn.innerHTML = `
        <span class="menu-showcard-media"><img src="${meta.image}" alt="${tr(meta.title)}" loading="lazy" decoding="async"></span>
        <span class="menu-showcard-copy">
          <small>${tr(meta.title)}</small>
          <strong>${tr(meta.intro)}</strong>
          <em>${total} ${currentLanguage()==='en' ? (total===1?'items':'items') : (total===1?'plato':'platos')}</em>
        </span>`;
      frag.append(btn);
    });
    showcase.append(frag);
  };

  const createMenuCard = (item, idx = 0) => {
    const article = document.createElement('article');
    article.className = 'menu-card';
    article.style.animationDelay = `${Math.min(idx, 18)*18}ms`;
    if (itemThumbs[item.n]) article.classList.add('has-thumb');

    const top = document.createElement('div');
    top.className = 'menu-card-top';
    if (itemThumbs[item.n]) {
      const media = document.createElement('div');
      media.className = 'menu-thumb';
      const img = document.createElement('img');
      img.src = itemThumbs[item.n];
      img.alt = tr(item.n);
      img.loading = 'lazy';
      img.decoding = 'async';
      media.append(img);
      top.append(media);
    } else {
      const badge = document.createElement('span');
      badge.className = 'menu-micro-icon';
      badge.textContent = item.c === 'cafe' ? '☕' : item.c === 'matcha' ? '◌' : item.c === 'bebidas' ? '✦' : item.c === 'bowls' ? '◎' : item.c === 'tostas' ? '↗' : item.c === 'huevos' ? '◔' : '✳';
      top.append(badge);
    }

    const head = document.createElement('div');
    head.className = 'menu-card-head';
    const title = document.createElement('h4');
    title.textContent = tr(item.n);
    const price = document.createElement('strong');
    price.textContent = item.p;
    head.append(title, price);
    top.append(head);
    article.append(top);

    if (item.d) {
      const desc = document.createElement('p');
      desc.textContent = tr(item.d);
      article.append(desc);
    }

    const footer = document.createElement('div');
    footer.className = 'menu-card-footer';
    const kicker = document.createElement('span');
    kicker.textContent = tr(groupKickers[item.c] || 'Carta Chakra');
    footer.append(kicker);
    if (item.t) {
      const tag = document.createElement('b');
      tag.className = 'item-tag';
      tag.textContent = tr(item.t);
      footer.append(tag);
    }
    article.append(footer);
    return article;
  };

  const renderMenu = () => {
    if (!grid) return;
    const q = normalize(search?.value.trim() || '');
    const filtered = menuItems.filter(item => {
      const inCategory = activeCategory === 'all' || item.c === activeCategory;
      const searchable = `${item.n} ${item.d||''} ${tr(item.n)} ${tr(item.d||'')}`;
      return inCategory && (!q || normalize(searchable).includes(q));
    });

    const groups = new Map();
    filtered.forEach(item => {
      if (!groups.has(item.c)) groups.set(item.c, []);
      groups.get(item.c).push(item);
    });

    const frag = document.createDocumentFragment();
    const orderedGroups = (activeCategory === 'all' ? categories.filter(([k])=>k!=='all').map(([k])=>k) : [activeCategory])
      .filter(key => groups.has(key));

    orderedGroups.forEach((key, groupIndex) => {
      const meta = categoryMeta[key];
      const section = document.createElement('section');
      section.className = 'menu-group';
      section.dataset.category = key;
      section.style.animationDelay = `${groupIndex*40}ms`;

      const head = document.createElement('div');
      head.className = 'menu-group-head';
      head.innerHTML = `
        <div class="menu-group-copy">
          <small>${tr(groupKickers[key])}</small>
          <h3>${tr(meta.title)}</h3>
          <p>${tr(meta.intro)}</p>
          <em>${tr(meta.note)}</em>
        </div>
        <div class="menu-group-visual">
          <img src="${meta.image}" alt="${tr(meta.title)}" loading="lazy" decoding="async">
        </div>`;
      section.append(head);

      const cards = document.createElement('div');
      cards.className = 'menu-cards';
      groups.get(key).forEach((item, itemIndex) => cards.append(createMenuCard(item, itemIndex)));
      section.append(cards);
      frag.append(section);
    });

    grid.replaceChildren(frag);
    renderShowcase();
    if (count) {
      count.textContent = currentLanguage()==='en'
        ? `${filtered.length} ${filtered.length===1?'item visible':'items visible'}`
        : `${filtered.length} ${filtered.length===1?'opción visible':'opciones visibles'}`;
    }
    if (empty) empty.hidden = filtered.length !== 0;
  };

  const selectCategory = key => {
    if (!key) return;
    activeCategory = key;
    renderTabs();
    renderMenu();
  };

  const selectTab = btn => {
    if (!btn?.dataset.category) return;
    selectCategory(btn.dataset.category);
  };
  tabs?.addEventListener('click', e => { const btn=e.target.closest('.menu-tab'); if(btn) selectTab(btn); });
  tabs?.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    const arr = $$('.menu-tab',tabs), idx = arr.indexOf(document.activeElement); if (idx < 0) return;
    e.preventDefault();
    const nextIndex = e.key==='Home' ? 0 : e.key==='End' ? arr.length-1 : (idx + (e.key==='ArrowRight'?1:-1) + arr.length)%arr.length;
    arr[nextIndex].focus(); selectTab(arr[nextIndex]);
  });
  showcase?.addEventListener('click', e => {
    const card = e.target.closest('.menu-showcard');
    if (!card) return;
    selectCategory(card.dataset.category);
    document.getElementById('menuGrid')?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'});
  });

  renderTabs(); renderMenu();
  let searchFrame = 0;
  search?.addEventListener('input', () => {
    if (searchFrame) cancelAnimationFrame(searchFrame);
    searchFrame=requestAnimationFrame(()=>{searchFrame=0;renderMenu();});
  });
  $('#clearSearch')?.addEventListener('click', () => {
    search.value=''; activeCategory='all';
    renderTabs(); renderMenu();
    search.focus();
  });

  // "What do you feel like?" recommender.
  const moodData = {
    coffee:{image:'assets/img/latte.webp', title:'Flat White & calma', text:'Café 100% arábico, textura cremosa y un momento para bajar el ritmo.', alt:'Café latte de Chakra', category:'cafe'},
    fresh:{image:'assets/img/matcha-orange.webp', title:'Chakra Corazón & frescura', text:'Naranja, mango y chía para un chute fresco, frutal y luminoso.', alt:'Matcha y bebida de naranja', category:'bebidas'},
    sweet:{image:'assets/img/pancakes-sweet.webp', title:'Pancakes & capricho', text:'Fruta, almendras y tu topping favorito para ese día que pide algo dulce.', alt:'Pancakes dulces con fruta', category:'dulce'},
    savory:{image:'assets/img/toast-tricolor.webp', title:'Tosta Tricolor & brunch', text:'Tres hummus, masa madre y kalamata: color, textura y un bocado salado muy Chakra.', alt:'Tosta tricolor', category:'tostas'}
  };
  let currentMood = 'coffee';
  const moodImage = $('#moodImage'), moodTitle = $('#moodTitle'), moodText = $('#moodText'), moodKicker = $('#moodKicker'), moodAction = $('#moodAction');
  const applyMood = (key, animate=true) => {
    const data = moodData[key] || moodData.coffee;
    currentMood = key;
    $$('.mood-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.mood===key));
    if (moodKicker) moodKicker.textContent = tr('Tu ritual Chakra');
    if (moodTitle) moodTitle.textContent = tr(data.title);
    if (moodText) moodText.textContent = tr(data.text);
    if (moodAction) moodAction.dataset.category = data.category;
    if (moodImage) {
      const swap = () => {
        moodImage.src = data.image;
        moodImage.alt = tr(data.alt);
        moodImage.classList.remove('is-switching');
      };
      if (animate && !reduceMotion) {
        moodImage.classList.add('is-switching');
        setTimeout(swap, 150);
      } else swap();
    }
  };
  $$('.mood-btn').forEach(btn => btn.addEventListener('click', () => applyMood(btn.dataset.mood)));
  moodAction?.addEventListener('click', () => {
    activeCategory = moodAction.dataset.category || 'all';
    if (search) search.value='';
    renderTabs(); renderMenu();
  });
  applyMood(currentMood, false);

  // FAQ
  $$('.faq-item > button').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = !item.classList.contains('open');
    item.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }));

  // Toast + copy
  let toastTimer;
  const showToast = text => {
    const toast = $('#toast'); if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove('show'),2500);
  };
  $('#copyAddress')?.addEventListener('click', async () => {
    const text = 'Chakra Coffee & Brunch, Av. de Canarias, 337, 35110 Vecindario, Las Palmas';
    try { await navigator.clipboard.writeText(text); showToast(tr('Dirección copiada')); }
    catch { showToast('Av. de Canarias, 337 · Vecindario'); }
  });

  // Reservation dialog
  const modal = $('#reserveModal');
  const resForm = $('#reserveForm');
  const setDateMin = () => {
    const p=canaryParts(); const iso=`${p.year}-${p.month}-${p.day}`;
    const input=$('#resDate'); if(input){input.min=iso;if(!input.value) input.value=iso;}
  };
  const openReserve = () => {
    closeMobile(); setDateMin();
    if (modal?.showModal) {
      modal.showModal();
      document.body.classList.add('modal-open');
      setTimeout(()=>$('#resName')?.focus(),50);
    } else window.open('https://wa.me/34646128366','_blank','noopener');
  };
  $$('.js-reserve').forEach(btn => btn.addEventListener('click', openReserve));
  $('.modal-close', modal)?.addEventListener('click', () => modal.close());
  modal?.addEventListener('close', () => document.body.classList.remove('modal-open'));
  modal?.addEventListener('click', e => { if (e.target===modal) modal.close(); });

  resForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!resForm.reportValidity()) return;
    const name=$('#resName').value.trim(), people=$('#resPeople').value, date=$('#resDate').value, time=$('#resTime').value, note=$('#resNote').value.trim();
    const dateObj=new Date(`${date}T12:00:00`); const day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dateObj.getDay()];
    const [open,close]=hours[day]||['08:30','19:30']; const selectedTime=minutes(time);
    if(selectedTime<minutes(open)||selectedTime>=minutes(close)) {
      showToast(currentLanguage()==='en' ? `That day we are open from ${open} to ${close}` : `Ese día abrimos de ${open} a ${close}`);
      return;
    }
    const [y,m,d]=date.split('-');
    const en = currentLanguage()==='en';
    const msg = en ? [
      'Hi Chakra 👋 I’d like to request a booking:',
      `• Name: ${name}`,
      `• Guests: ${people}`,
      `• Date: ${d}/${m}/${y}`,
      `• Time: ${time}`,
      note?`• Note: ${note}`:'',
      '',
      'Could you confirm availability? Thanks.'
    ] : [
      'Hola Chakra 👋 Quiero solicitar una reserva:',
      `• Nombre: ${name}`,
      `• Personas: ${people}`,
      `• Fecha: ${d}/${m}/${y}`,
      `• Hora: ${time}`,
      note?`• Nota: ${note}`:'',
      '',
      '¿Me confirmáis disponibilidad? Gracias.'
    ];
    const url=`https://wa.me/34646128366?text=${encodeURIComponent(msg.filter(Boolean).join('\n'))}`;
    modal.close();
    window.open(url,'_blank','noopener,noreferrer');
  });

  // Gallery: smooth drag plus accessible lightbox.
  const gallery = $('.gallery-track-wrap');
  let galleryDragged = false;
  if (gallery && matchMedia('(pointer:fine)').matches) {
    let down=false,startX=0,startScroll=0,lastX=0,dragFrame=0;
    const paintDrag = () => {
      dragFrame=0;
      if (down) gallery.scrollLeft = startScroll-(lastX-startX);
    };
    gallery.addEventListener('pointerdown',e=>{
      down=true; galleryDragged=false; startX=e.clientX; lastX=e.clientX; startScroll=gallery.scrollLeft;
      gallery.setPointerCapture(e.pointerId); gallery.style.cursor='grabbing';
    });
    gallery.addEventListener('pointermove',e=>{
      if(!down)return;
      lastX=e.clientX;
      if (Math.abs(lastX-startX)>6) galleryDragged=true;
      if(!dragFrame) dragFrame=requestAnimationFrame(paintDrag);
    });
    const up=()=>{down=false;gallery.style.cursor='grab';setTimeout(()=>{galleryDragged=false;},80);};
    gallery.addEventListener('pointerup',up); gallery.addEventListener('pointercancel',up);
  }

  const galleryModal = $('#galleryModal');
  const galleryModalImage = $('#galleryModalImage');
  const galleryModalCaption = $('#galleryModalCaption');
  const galleryModalCounter = $('#galleryModalCounter');
  const galleryFigures = $$('.gallery-item');
  let galleryIndex = 0;
  const updateGalleryModal = () => {
    const figure = galleryFigures[galleryIndex]; if (!figure) return;
    const img = $('img',figure), caption = $('figcaption',figure);
    if (galleryModalImage) { galleryModalImage.src=img.currentSrc || img.src; galleryModalImage.alt=img.alt; }
    if (galleryModalCaption) galleryModalCaption.textContent=caption?.textContent || '';
    if (galleryModalCounter) galleryModalCounter.textContent=`${galleryIndex+1} / ${galleryFigures.length}`;
  };
  const openGallery = index => {
    if (!galleryModal?.showModal || galleryDragged) return;
    galleryIndex=(index+galleryFigures.length)%galleryFigures.length;
    updateGalleryModal();
    galleryModal.showModal();
    document.body.classList.add('modal-open');
  };
  const stepGallery = delta => { galleryIndex=(galleryIndex+delta+galleryFigures.length)%galleryFigures.length; updateGalleryModal(); };
  galleryFigures.forEach((figure,index) => {
    figure.addEventListener('click',()=>openGallery(index));
    figure.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGallery(index);}});
  });
  $('#galleryClose')?.addEventListener('click',()=>galleryModal?.close());
  $('#galleryPrev')?.addEventListener('click',()=>stepGallery(-1));
  $('#galleryNext')?.addEventListener('click',()=>stepGallery(1));
  galleryModal?.addEventListener('click',e=>{if(e.target===galleryModal)galleryModal.close();});
  galleryModal?.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  addEventListener('keydown', e => {
    if (galleryModal?.open) {
      if (e.key==='ArrowLeft') stepGallery(-1);
      if (e.key==='ArrowRight') stepGallery(1);
    }
    if(e.key==='Escape' && modal?.open) modal.close();
  });

  // Keep dynamic UI in sync when the visitor switches language.
  document.addEventListener('chakra:language', () => {
    renderTabs(); renderMenu(); updateStatus(); applyMood(currentMood,false);
    syncMenuLabel(mobileMenu?.classList.contains('open'));
    if (galleryModal?.open) updateGalleryModal();
  });

  // Year
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  // Service worker after the critical interaction path is ready.
  if ('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')) {
    addEventListener('load', () => {
      const register = () => navigator.serviceWorker.register('./sw.js').catch(()=>{});
      if ('requestIdleCallback' in window) requestIdleCallback(register, {timeout:1800});
      else setTimeout(register, 600);
    }, {once:true});
  }
})();
