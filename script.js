// script.js
// =========
// 1. Діалог з користувачем
function dialogWithUser() {
  alert('Ласкаво просимо на сторінку!');
  let name = prompt('Ваше ім’я?', 'Гість');
  if (!name) {
    alert('Ім’я не вказано, вітаю, Гість!');
  } else {
    alert(`Вітаю, ${name}!`);
  }
  let count = +prompt('Скільки улюблених рецептів ви шукаєте?', 3);
  for (let i = 0; i < count; i++) {
    alert(`Показую рецепт №${i+1}`);
  }
}

// 2. Інформація про розробника
function developerInfo(lastName, firstName, position = 'Developer') {
  alert(`Автор: ${lastName} ${firstName}\nПосада: ${position}`);
}

// 3. Порівняння двох рядків
function compareStrings(a, b) {
  if (a > b)      alert(`"${a}" більший за "${b}".`);
  else if (b > a) alert(`"${b}" більший за "${a}".`);
  else            alert(`"${a}" та "${b}" однакові.`);
}

// 4. Зміна фону на 30 секунд
function changeBackgroundTemporary(color, ms = 30000) {
  const old = document.body.style.backgroundColor;
  document.body.style.backgroundColor = color;
  setTimeout(() => {
    document.body.style.backgroundColor = old;
  }, ms);
}
changeBackgroundTemporary('#faf0e6', 30000);

// 5. Перенаправлення за допомогою location
function redirectToGitHub() {
  if (confirm('Перейти на GitHub-репозиторій?')) {
    location.href = 'https://github.com';
  }
}

// 6. Демонстрація DOM-властивостей
const header = document.getElementById('main-header');
console.log('innerHTML:', header.innerHTML);
console.log('outerHTML:', header.outerHTML);
console.log('textContent:', header.textContent);

// 7. Створення/вставка/видалення вузлів
const note = document.createElement('div');
note.textContent = 'Створено через createElement & createTextNode';
document.body.append(note);
const firstPara = document.querySelector('.content p');
firstPara.prepend('[Новина] ');
firstPara.after(document.createElement('hr'));
const footerP = document.querySelector('.site-footer p');
footerP.replaceWith('Цей текст замінено через replaceWith');

// =========
// LAB7: ОБРОБКА ПОДІЙ
// =========

// 1) Властивість DOM
document.getElementById('propBtn').onclick = function() {
  alert('Обробник через DOM-властивість!');
};

// 2) addEventListener з двома хендлерами
function handlerA() { alert('Handler A'); }
function handlerB() { alert('Handler B'); }
const multiBtn = document.getElementById('multiBtn');
multiBtn.addEventListener('click', handlerA);
multiBtn.addEventListener('click', handlerB);
// через 20 сек видалимо handlerB
setTimeout(() => {
  multiBtn.removeEventListener('click', handlerB);
  console.log('Handler B видалено');
}, 20000);

// 3) Об’єкт-обробник через handleEvent
class MouseHandler {
  constructor(elem) {
    this.elem = elem;
    elem.addEventListener('mousedown', this);
    elem.addEventListener('mouseup', this);
  }
  handleEvent(event) {
    if (event.type === 'mousedown')  event.currentTarget.textContent = 'МАУСDOWN';
    if (event.type === 'mouseup')    event.currentTarget.textContent = 'МАУСUP';
  }
}
new MouseHandler(document.getElementById('mouseBtn'));

// 4) Делегування підсвічування списку
const demoList = document.getElementById('demo-list');
let lastLi;
demoList.onclick = function(event) {
  const li = event.target.closest('li');
  if (!li) return;
  if (lastLi) lastLi.classList.remove('highlight');
  li.classList.add('highlight');
  lastLi = li;
};

// 5) Меню поведінки через data-action
const behaviorActions = {
  toggleBanner() {
    const b = document.querySelector('.banner');
    if (b) b.hidden = !b.hidden;
  },
  toggleContent() {
    const c = document.querySelector('.content');
    if (c) c.hidden = !c.hidden;
  }
};
document.getElementById('behavior-menu')
  .addEventListener('click', event => {
    const action = event.target.dataset.action;
    if (action && behaviorActions[action]) {
      behaviorActions[action]();
    }
  });
