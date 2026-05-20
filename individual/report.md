# 📝 ToDoList — Индивидуальная работа  
**Дисциплина:** JavaScript  
**Студент:** Петровская Арина  
**Группа:** IA2504  
**Преподаватель:** Nartea N.  
**Год:** 2026

---

## 📁 Структура проекта

```
todolist/
├── index.html       # Разметка страницы
├── style.css        # Стили
└── script.js        # Вся логика приложения
```

---

## ⚙️ Функциональность

- ✅ Добавление задач через кнопку или клавишу `Enter`
- ✏️ Редактирование существующих задач
- 🗑️ Удаление задач
- ☑️ Отметка задачи как выполненной
- 📊 Прогресс-бар с подсчётом выполненных задач
- 🎉 Конфетти-анимация при выполнении всех задач
- 💾 Сохранение задач в `localStorage` (данные сохраняются после перезагрузки страницы)

---

## 🔍 Подробный разбор кода (`script.js`)

### Инициализация — `DOMContentLoaded`

```js
document.addEventListener('DOMContentLoaded', () => { ... });
```
Весь основной код обёрнут в событие `DOMContentLoaded`. Это гарантирует, что скрипт запустится только после полной загрузки DOM-дерева страницы, чтобы обращения к элементам не вернули `null`.

---

### Получение элементов DOM

```js
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const todosContainer = document.querySelector('.todos-container');
const progressBar = document.getElementById('progress');
const progressNumbers = document.getElementById('numbers');
```

| Переменная | Элемент | Назначение |
|---|---|---|
| `taskInput` | `<input id="task-input">` | Поле ввода новой задачи |
| `addTaskBtn` | `<button id="add-task-btn">` | Кнопка добавления задачи |
| `taskList` | `<ul id="task-list">` | Список задач (контейнер для `<li>`) |
| `todosContainer` | `.todos-container` | Обёртка всего блока задач (для адаптивной ширины) |
| `progressBar` | `<div id="progress">` | Заполняемая полоска прогресса |
| `progressNumbers` | `<span id="numbers">` | Текст вида "2 / 5" |

---

### Функция `toggleEmptyState()`

```js
const toggleEmptyState = () => {
    todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
};
```

- Проверяет количество дочерних элементов в `taskList`.
- Если список **не пуст** — контейнер расширяется до `100%` ширины.
- Если список **пуст** — ширина сжимается до `50%` (визуальное состояние "пусто").
- Используется тернарный оператор для краткости.

---

### Функция `updateProgress(checkCompletion = true)`

```js
const updateProgress = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

    progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
    progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

    if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
        Confetti();
    }
};
```

- `totalTasks` — общее количество задач (количество `<li>` в списке).
- `completedTasks` — количество отмеченных чекбоксов (CSS-псевдокласс `:checked`).
- Ширина прогресс-бара вычисляется как `(completedTasks / totalTasks) * 100%`. Если задач нет — ставится `'0%'`, чтобы избежать деления на ноль.
- `progressNumbers` обновляет текст, например: `"3 / 5"`.
- Параметр `checkCompletion` (по умолчанию `true`) управляет тем, нужно ли проверять полное завершение. При редактировании задачи он передаётся как `false`, чтобы конфетти не срабатывало.
- Если все задачи выполнены (`completedTasks === totalTasks`) и список не пуст — вызывается функция `Confetti()`.

---

### Функция `saveTaskToLocalStorage()`

```js
const saveTaskToLocalStorage = () => {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
```

- `querySelectorAll('li')` возвращает `NodeList`, который преобразуется в массив через `Array.from()`.
- Для каждого `<li>` извлекается объект с двумя полями:
   - `text` — текст задачи из тега `<span>`,
   - `completed` — булево значение состояния чекбокса.
- Массив объектов сериализуется в JSON и сохраняется в `localStorage` по ключу `'tasks'`.
- Вызывается после каждого изменения списка: добавления, удаления, отметки, редактирования.

---

### Функция `loadTasksFromLocalStorage()`

```js
const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
    toggleEmptyState();
    updateProgress();
};
```

- `localStorage.getItem('tasks')` возвращает JSON-строку или `null`.
- `JSON.parse()` преобразует строку обратно в массив объектов. Если данных нет — используется пустой массив `[]` (оператор `||`).
- Для каждой сохранённой задачи вызывается `addTask(text, completed, false)`:
   - Третий аргумент `false` отключает проверку завершения — конфетти не должно стрелять при загрузке страницы.
- После восстановления задач вызываются `toggleEmptyState()` и `updateProgress()` для корректного начального состояния UI.

---

### Функция `addTask(text, completed = false, checkCompletion = true)`

Главная функция приложения. Отвечает за создание нового элемента задачи.

#### Шаг 1 — Валидация ввода

```js
const taskText = text || taskInput.value.trim();
if(!taskText) {
    return;
}
```

- Если функция вызвана с аргументом `text` (например, при загрузке из localStorage) — используется он.
- Иначе берётся значение из поля ввода, очищенное от пробелов (`.trim()`).
- Если текст пустой — функция завершается ранним возвратом (`return`), ничего не создавая.

#### Шаг 2 — Создание DOM-элемента

```js
const li = document.createElement('li');
li.innerHTML = `
<input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
<span>${taskText}</span>
<div class="task-buttons">
    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
</div>
`;
```

- Создаётся новый элемент `<li>`.
- Через `innerHTML` вставляется внутренняя разметка:
   - `<input type="checkbox">` — для отметки выполнения. Атрибут `checked` добавляется условно.
   - `<span>` — содержит текст задачи.
   - Две кнопки с иконками Font Awesome: редактирование (карандаш) и удаление (корзина).

#### Шаг 3 — Стилизация уже выполненной задачи

```js
if (completed) {
    li.classList.add('completed');
    editBtn.disabled = true;
    editBtn.style.opacity = '0.5';
    editBtn.style.pointerEvents = 'none';
}
```

- Если задача загружена из localStorage как уже выполненная:
   - Добавляется CSS-класс `completed` (обычно зачёркивает текст).
   - Кнопка редактирования блокируется: `disabled`, пониженная прозрачность, отключены события мыши.

#### Шаг 4 — Обработчик чекбокса

```js
checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked;
    li.classList.toggle('completed', isChecked);
    editBtn.disabled = isChecked;
    editBtn.style.opacity = isChecked ? '0.5' : '1';
    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
    updateProgress();
    saveTaskToLocalStorage();
});
```

- При изменении состояния чекбокса:
   - `classList.toggle('completed', isChecked)` — добавляет или убирает класс в зависимости от состояния флага.
   - Кнопка редактирования блокируется/разблокируется вместе с визуальными изменениями.
   - Вызываются `updateProgress()` и `saveTaskToLocalStorage()` для синхронизации состояния.

#### Шаг 5 — Обработчик кнопки редактирования

```js
editBtn.addEventListener('click', () => {   
    if(!checkbox.checked) {
        taskInput.value = li.querySelector('span').textContent;
        li.remove();
        toggleEmptyState();
        updateProgress(false);
        saveTaskToLocalStorage();
    }
});
```

- Двойная защита: редактирование работает только если задача **не выполнена** (кнопка уже заблокирована стилями, но логика дублируется).
- Текст задачи подставляется обратно в поле ввода — пользователь может его изменить и добавить снова.
- Элемент `<li>` удаляется из списка.
- `updateProgress(false)` — прогресс обновляется, но конфетти не проверяется.

#### Шаг 6 — Обработчик кнопки удаления

```js
li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    toggleEmptyState();
    updateProgress();
    saveTaskToLocalStorage();
});
```

- Задача безвозвратно удаляется из DOM.
- Обновляются состояние пустого списка, прогресс и localStorage.
- `updateProgress()` без аргументов — `checkCompletion` равен `true`, то есть если после удаления все оставшиеся задачи выполнены, конфетти сработает.

#### Шаг 7 — Добавление в DOM и финализация

```js
taskList.appendChild(li);
taskInput.value = '';
toggleEmptyState();
updateProgress(checkCompletion);
saveTaskToLocalStorage();
```

- Готовый `<li>` добавляется в конец списка.
- Поле ввода очищается.
- Вызываются вспомогательные функции для обновления UI и сохранения.

---

### Обработчики добавления задачи

```js
addTaskBtn.addEventListener('click', () => addTask());
taskInput.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});
```

- Клик по кнопке — вызов `addTask()` без аргументов.
- Нажатие `Enter` в поле ввода — аналогичный вызов. `e.preventDefault()` предотвращает стандартное поведение (например, сабмит формы).

---

### Вызов загрузки при старте

```js
loadTasksFromLocalStorage();
```

Последняя строка в `DOMContentLoaded` — восстанавливает задачи из localStorage при каждом открытии страницы.

---

### Функция `Confetti()` (глобальная)

```js
const Confetti = () => {
    const count = 100;
    const defaults = { origin: { y: 1 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
    }

    let y = 1;
    const interval = setInterval(() => {
        fire(0.2, {spread: 60, startVelocity: 30, scalar: 0.8, origin: { y } });
        fire(0.1, {spread: 120, startVelocity: 55, scalar: 1.2 });
        y -= 0.05;
        if (y <= 0.3) clearInterval(interval);
    }, 8);
};
```

- Объявлена вне `DOMContentLoaded` — является глобальной функцией.
- Использует библиотеку `canvas-confetti` (подключена как `/* global confetti */`).
- `count = 100` — базовое количество частиц.
- `defaults` задаёт точку старта снизу страницы (`y: 1`).
- Вложенная `fire()` запускает один залп конфетти с заданными параметрами. `Object.assign()` объединяет настройки по умолчанию с кастомными.
- `setInterval` с интервалом 8 мс создаёт анимацию "взлёта":
   - Два залпа за каждый тик: широкий низкоскоростной и узкий высокоскоростной.
   - `y -= 0.05` — точка появления постепенно поднимается вверх.
   - Когда `y <= 0.3` — интервал останавливается (`clearInterval`).

---

## 🛠️ Используемые технологии

| Технология | Версия | Назначение |
|---|---|---|
| HTML5 | — | Разметка страницы |
| CSS3 | — | Стилизация |
| JavaScript (ES6+) | — | Логика приложения |
| Font Awesome | 6.x | Иконки кнопок |
| canvas-confetti | latest | Анимация конфетти |
| localStorage API | — | Постоянное хранение задач |

