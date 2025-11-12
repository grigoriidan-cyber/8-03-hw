const quiz = [
  {
    q: "Какой порт по умолчанию у HTTP?",
    answers: ["443", "8080", "80", "21"],
    correct: 2
  },
  {
    q: "Команда для просмотра сетевых интерфейсов в Linux?",
    answers: ["ifconfig/ip", "route", "dig", "traceroute"],
    correct: 0
  },
  {
    q: "Какой слой модели OSI отвечает за маршрутизацию?",
    answers: ["Канальный", "Сетевой", "Транспортный", "Прикладной"],
    correct: 1
  },
  {
    q: "Что делает команда `git push`?",
    answers: ["Создаёт коммит", "Отправляет коммиты в удалённый репозиторий", "Скачивает изменения", "Создаёт ветку"],
    correct: 1
  },
  {
    q: "Какой web-сервер мы используем в этом проекте?",
    answers: ["Apache", "Caddy", "Nginx", "IIS"],
    correct: 2
  }
];

let i = 0;
let selected = new Map();
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const resultEl = document.getElementById('result');
const progressEl = document.getElementById('progress');

function render() {
  const item = quiz[i];
  questionEl.textContent = item.q;

  answersEl.innerHTML = "";
  item.answers.forEach((a, idx) => {
    const id = `a-${i}-${idx}`;
    const wrap = document.createElement('label');
    wrap.className = 'answer';
    wrap.innerHTML = `<input type="radio" name="q${i}" id="${id}" value="${idx}"> ${a}`;
    const radio = wrap.querySelector('input');
    if (selected.has(i) && selected.get(i) === idx) radio.checked = true;
    radio.addEventListener('change', () => selected.set(i, idx));
    answersEl.appendChild(wrap);
  });

  prevBtn.disabled = i === 0;
  nextBtn.textContent = i === quiz.length - 1 ? "Завершить" : "Далее";
  progressEl.textContent = `Вопрос ${i + 1} из ${quiz.length}`;
}

nextBtn.addEventListener('click', () => {
  if (i < quiz.length - 1) {
    i++;
    render();
  } else {
    finish();
  }
});

prevBtn.addEventListener('click', () => {
  if (i > 0) {
    i--;
    render();
  }
});

function finish() {
  let score = 0;
  quiz.forEach((item, idx) => {
    if (selected.get(idx) === item.correct) score++;
  });
  const pct = Math.round((score / quiz.length) * 100);
  document.getElementById('quiz-card').classList.add('hidden');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<h2>Результат</h2><p>Ты набрал(а) <b>${score}</b> из <b>${quiz.length}</b> (${pct}%).</p>
  <button class="btn" onclick="location.reload()">Пройти ещё раз</button>`;
}

render();
