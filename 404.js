(() => {
  'use strict';
  const saved = (() => { try { return localStorage.getItem('chakra-lang'); } catch { return null; } })();
  const browser = (navigator.languages?.[0] || navigator.language || 'es').toLowerCase();
  let lang = ['es','en'].includes(saved) ? saved : (browser.startsWith('en') ? 'en' : 'es');
  const copy = {
    es:{title:'Chakra · Página no encontrada',message:'Esta página se ha ido a por un café.',home:'Volver a Chakra'},
    en:{title:'Chakra · Page not found',message:'This page stepped out for a coffee.',home:'Back to Chakra'}
  };
  const apply = next => {
    lang = next;
    document.documentElement.lang = lang;
    document.title = copy[lang].title;
    document.getElementById('message').textContent = copy[lang].message;
    document.getElementById('home').textContent = copy[lang].home;
    document.querySelectorAll('[data-lang]').forEach(btn => btn.classList.toggle('active',btn.dataset.lang===lang));
  };
  document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click',()=>{try{localStorage.setItem('chakra-lang',btn.dataset.lang);}catch{} apply(btn.dataset.lang);}));
  apply(lang);
})();
