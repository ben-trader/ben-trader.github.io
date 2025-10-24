
/* Roots Boulder — Core JS features (progressive enhancement)
   1) Lineup search (input)
   2) Schedule filter (change)
   3) Theme toggle (click, persisted)
   + hamburger nav from earlier
*/

const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* Lineup search */
(function(){
  const input = $('#lineup-search');
  const cards = $$('#lineup .card');
  if (!input || !cards.length) return;

  const norm = s => (s||'').toLowerCase().trim();

  input.addEventListener('input', () => {
    const q = norm(input.value);
    let visible = 0;
    cards.forEach(card => {
      const show = !q || norm(card.innerText).includes(q);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const status = $('#lineup-status');
    if (status) status.textContent = visible === cards.length ? 'Showing all artists' : `Showing ${visible} of ${cards.length} artists`;
  });
})();

/* Schedule filters */
(function(){
  const daySel = $('#filter-day');
  const stageSel = $('#filter-stage');
  const items = $$('#schedule-list li[data-day][data-stage]');
  if (!daySel || !stageSel || !items.length) return;

  const update = () => {
    const day = daySel.value;
    const stage = stageSel.value;
    let visible = 0;
    items.forEach(li => {
      const okDay = (day === 'all' || li.dataset.day === day);
      const okStage = (stage === 'all' || li.dataset.stage === stage);
      const show = okDay && okStage;
      li.hidden = !show;
      if (show) visible++;
    });
    const status = $('#schedule-status');
    if (status) status.textContent = visible === items.length ? 'Showing all sets' : `Showing ${visible} of ${items.length} sets`;
  };

  daySel.addEventListener('change', update);
  stageSel.addEventListener('change', update);
  update();
})();

/* Theme toggle */
(function(){
  const btn = $('#theme-toggle');
  if (!btn) return;
  const apply = (mode) => {
    if (mode === 'dusk') document.body.classList.add('theme-dusk');
    else document.body.classList.remove('theme-dusk');
    localStorage.setItem('theme', mode);
    btn.setAttribute('aria-pressed', mode === 'dusk' ? 'true' : 'false');
    btn.textContent = (mode === 'dusk') ? 'Switch to Dawn' : 'Switch to Dusk';
  };
  const saved = localStorage.getItem('theme');
  apply(saved === 'dusk' ? 'dusk' : 'dawn');
  btn.addEventListener('click', () => {
    const isDusk = document.body.classList.contains('theme-dusk');
    apply(isDusk ? 'dawn' : 'dusk');
  });
})();

/* Hamburger nav */
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  function openMenu(){ menu.classList.add('show'); toggle.setAttribute('aria-expanded','true'); }
  function closeMenu(){ menu.classList.remove('show'); toggle.setAttribute('aria-expanded','false'); }
  function toggleMenu(){ (toggle.getAttribute('aria-expanded')==='true') ? closeMenu() : openMenu(); }

  toggle.addEventListener('click', toggleMenu);
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
})();
