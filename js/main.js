// ---------- 1. منوی موبایل ----------
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuBtn.classList.remove('open');
}));

// ---------- 2. هدر هنگام اسکرول ----------
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- 3. ظاهر شدن بخش‌ها هنگام اسکرول ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- 4. شمارنده آمار ----------
const counters = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    let n = 0; const step = Math.max(1, Math.round(end / 40));
    const t = setInterval(() => {
      n = Math.min(end, n + step); el.textContent = n;
      if (n >= end) clearInterval(t);
    }, 30);
    counters.unobserve(el);
  });
});
document.querySelectorAll('[data-count]').forEach(el => counters.observe(el));

// ---------- 5. اعتبارسنجی فرم تماس ----------
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('input,textarea').forEach(f => {
    const bad = !f.value.trim();
    f.classList.toggle('error', bad);
    if (bad) ok = false;
  });
  msg.textContent = ok ? 'پیام شما ثبت شد. به‌زودی تماس می‌گیریم.' : 'لطفاً همه فیلدها را پر کنید.';
  if (ok) form.reset();
  // نکته: فعلاً پیام به جایی ارسال نمی‌شود. در مرحله بعد به سرویس واقعی وصلش می‌کنیم.
});


// ---------- 6. حرکت سه‌بعدی تصویر لپ‌تاپ با موس / لمس ----------
const media = document.querySelector('.hero-media');
const img = document.getElementById('heroImg');
if (media && img && window.matchMedia('(hover:hover)').matches) {
  media.addEventListener('mousemove', (e) => {
    const r = media.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.03)`;
  });
  media.addEventListener('mouseleave', () => { img.style.transform = ''; });
}
// پارالاکس ملایم هنگام اسکرول
window.addEventListener('scroll', () => {
  if (img) img.style.marginTop = (window.scrollY * -0.06) + 'px';
}, { passive: true });
