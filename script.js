// Mark that JavaScript is running, so CSS only hides .reveal elements
// when it knows it can un-hide them again. Keeps the page safe even if
// something below fails to load.
document.documentElement.classList.add('js-ready');

// ---------- Mobile navigation menu ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const expanded = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', expanded);
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Dark / light mode toggle ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Load saved preference, if any
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------- Scroll animations ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Safety net: if anything stays hidden for too long (e.g. a browser that
// doesn't support IntersectionObserver), reveal it anyway after 2 seconds.
setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 2000);

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the page from reloading
  let valid = true;
  formSuccess.classList.remove('show');

  // Name check
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Please enter your name.';
    nameInput.classList.add('invalid');
    valid = false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
  }

  // Email check
  if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
    valid = false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  }

  // Message check
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    messageInput.classList.add('invalid');
    valid = false;
  } else {
    messageError.textContent = '';
    messageInput.classList.remove('invalid');
  }

  if (valid) {
    formSuccess.classList.add('show');
    form.reset();
  }
});
