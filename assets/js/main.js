/* ============================================================
   Retífica de Motores Irecê — interações
   ============================================================ */
(function () {
  'use strict';
  var WA = 'https://wa.me/5574999383395';

  /* ---- 1. Monta os links de WhatsApp a partir de data-msg ---- */
  document.querySelectorAll('[data-msg]').forEach(function (el) {
    var msg = el.getAttribute('data-msg');
    el.setAttribute('href', WA + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- 2. Menu mobile ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('menu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- 3. Alternador Linha Leve / Pesada ---- */
  var tabs = document.querySelectorAll('.ls-btn');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var line = btn.getAttribute('data-line');
      tabs.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('.line-panel').forEach(function (p) {
        var show = p.id === 'panel-' + line;
        p.classList.toggle('is-active', show);
        if (show) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
      });
    });
  });

  /* ---- 4. Reveal ao rolar ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 5. Link de navegação ativo conforme a seção ---- */
  var sections = ['inicio', 'sobre', 'servicos', 'historia', 'estrutura', 'contato']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function linkFor(id) {
    return document.querySelector('.nav-link[href="#' + id + '"]') ||
      (id === 'inicio' ? document.querySelector('.nav-link') : null);
  }
  if ('IntersectionObserver' in window && sections.length) {
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('is-active'); });
          var link = linkFor(e.target.id);
          if (link) { link.classList.add('is-active'); }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { no.observe(s); });
  }

  /* ---- 6. Ano no rodapé ---- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = new Date().getFullYear(); }
})();
