const actions = [
  { title: 'أوفر الكهربا', text: 'اقفل الأجهزة والأنوار لما مش بحتاجها.' },
  { title: 'أقلل هدر الميه', text: 'استخدم الميه بحرص وكلم اللي حواليك عن أهميتها.' },
  { title: 'أتعلم وأشارك', text: 'اقرأ من مصادر موثوقة وشارك اللي اتعلمته مع زمايلك.' },
  { title: 'أحافظ على المكان', text: 'حافظ على نضافة الشارع والمدرسة واهتم بالنباتات.' },
];

const checklist = document.querySelector('#checklist');
let doneActions = JSON.parse(localStorage.getItem('doneActions')) || [];

function renderChecklist() {
  checklist.innerHTML = '';

  actions.forEach(function (action, index) {
    const isDone = doneActions.includes(index);
    checklist.innerHTML += `
      <button class="check-item ${isDone ? 'done' : ''}" data-action="${index}">
        <span class="check-circle">${isDone ? '✓' : ''}</span>
        <span><strong>${action.title}</strong><small>${action.text}</small></span>
      </button>`;
  });

  checklist.innerHTML += `<p class="progress-text">أنجز ${doneActions.length} من ${actions.length} خطوات</p>`;
}

function goToSection(sectionName) {
  document.getElementById(sectionName).scrollIntoView({ behavior: 'smooth' });
  document.querySelector('#main-nav').classList.remove('open');
}

document.querySelectorAll('[data-scroll-to]').forEach(function (button) {
  button.addEventListener('click', function () {
    goToSection(button.dataset.scrollTo);
  });
});

document.querySelector('#checklist').addEventListener('click', function (event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const actionNumber = Number(button.dataset.action);
  const alreadyDone = doneActions.includes(actionNumber);

  if (alreadyDone) {
    doneActions = doneActions.filter(function (number) {
      return number !== actionNumber;
    });
  } else {
    doneActions.push(actionNumber);
  }

  localStorage.setItem('doneActions', JSON.stringify(doneActions));
  renderChecklist();
});

document.querySelector('#menu-button').addEventListener('click', function () {
  document.querySelector('#main-nav').classList.toggle('open');
});

const themeButton = document.querySelector('#theme-button');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeButton.textContent = '☀';
}

themeButton.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const darkModeOn = document.body.classList.contains('dark-mode');
  themeButton.textContent = darkModeOn ? '☀' : '◐';
  localStorage.setItem('theme', darkModeOn ? 'dark' : 'light');
});

renderChecklist();