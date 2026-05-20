/* global confetti */

/**
 * @fileoverview ToDoList — приложение для управления задачами.
 * Поддерживает добавление, редактирование, удаление и отметку задач.
 * Данные сохраняются в localStorage и восстанавливаются при перезагрузке.
 *
 * Зависимости:
 *  - canvas-confetti (глобальная переменная `confetti`)
 *  - Font Awesome 6.x (иконки кнопок)
 */

document.addEventListener('DOMContentLoaded', () => {

    /** @type {HTMLInputElement} Поле ввода текста новой задачи */
    const taskInput = document.getElementById('task-input');

    /** @type {HTMLButtonElement} Кнопка добавления задачи */
    const addTaskBtn = document.getElementById('add-task-btn');

    /** @type {HTMLUListElement} Список задач (контейнер для <li>) */
    const taskList = document.getElementById('task-list');

    /** @type {HTMLElement} Обёртка блока задач (управляет шириной при пустом списке) */
    const todosContainer = document.querySelector('.todos-container');

    /** @type {HTMLElement} Заполняемая полоска прогресс-бара */
    const progressBar = document.getElementById('progress');

    /** @type {HTMLElement} Текстовый счётчик вида "выполнено / всего" */
    const progressNumbers = document.getElementById('numbers');

    /**
     * Переключает ширину контейнера в зависимости от наличия задач.
     * Если список пуст — ширина 50% (центрированное состояние "пусто"),
     * иначе — 100%.
     *
     * @returns {void}
     */
    const toggleEmptyState = () => {
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    /**
     * Обновляет прогресс-бар и счётчик выполненных задач.
     * Если все задачи выполнены — запускает анимацию конфетти.
     *
     * @param {boolean} [checkCompletion=true] - Если false, конфетти не проверяется.
     *   Передаётся как false при редактировании задачи или загрузке из localStorage,
     *   чтобы избежать ложного срабатывания анимации.
     * @returns {void}
     */
    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        // Вычисляем процент выполнения; если задач нет — 0%, чтобы не делить на ноль
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            Confetti();
        }
    };

    /**
     * Сохраняет текущий список задач в localStorage.
     * Каждая задача сериализуется в объект { text, completed }.
     * Вызывается после любого изменения списка.
     *
     * @returns {void}
     */
    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    /**
     * Загружает сохранённые задачи из localStorage и восстанавливает их в DOM.
     * Передаёт checkCompletion=false, чтобы конфетти не срабатывало при загрузке.
     * После восстановления обновляет UI: пустое состояние и прогресс.
     *
     * @returns {void}
     */
    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmptyState();
        updateProgress();
    };

    /**
     * Создаёт новый элемент задачи и добавляет его в список.
     *
     * Логика:
     * 1. Определяет текст задачи: из аргумента `text` или из поля ввода.
     * 2. Создаёт <li> с чекбоксом, текстом и кнопками управления.
     * 3. Если задача уже выполнена — применяет стили и блокирует кнопку редактирования.
     * 4. Навешивает обработчики на чекбокс, кнопку редактирования и кнопку удаления.
     * 5. Добавляет <li> в DOM, очищает поле ввода, обновляет прогресс и localStorage.
     *
     * @param {string} [text=''] - Текст задачи. Если не передан — берётся из поля ввода.
     * @param {boolean} [completed=false] - Начальное состояние выполнения задачи.
     * @param {boolean} [checkCompletion=true] - Проверять ли полное завершение списка.
     * @returns {void}
     */
    const addTask = (text, completed = false, checkCompletion = true) => {
        // Используем переданный текст или значение поля ввода; выходим, если строка пустая
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

        // Формируем внутреннюю разметку элемента задачи
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        // Если задача уже выполнена — сразу применяем стили и блокируем редактирование
        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        /**
         * Обработчик изменения состояния чекбокса.
         * Переключает класс 'completed', блокирует/разблокирует кнопку редактирования,
         * обновляет прогресс и сохраняет состояние.
         */
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);

            // Блокируем редактирование выполненной задачи
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';

            updateProgress();
            saveTaskToLocalStorage();
        });

        /**
         * Обработчик кнопки редактирования.
         * Возвращает текст задачи в поле ввода и удаляет элемент из списка.
         * Работает только для невыполненных задач (дополнительная защита помимо стилей).
         */
        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                // checkCompletion=false: не запускаем конфетти при редактировании
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        });

        /**
         * Обработчик кнопки удаления.
         * Безвозвратно удаляет задачу из DOM и обновляет состояние приложения.
         */
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li);

        // Очищаем поле ввода после добавления задачи
        taskInput.value = '';

        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTaskToLocalStorage();
    };

    // Добавление задачи по клику на кнопку
    addTaskBtn.addEventListener('click', () => addTask());

    // Добавление задачи по нажатию Enter в поле ввода
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Предотвращаем стандартное поведение формы
            addTask();
        }
    });

    // Восстанавливаем задачи из localStorage при загрузке страницы
    loadTasksFromLocalStorage();

});

/**
 * Запускает анимацию конфетти при выполнении всех задач.
 *
 * Анимация работает через setInterval: каждые 8 мс запускаются два залпа частиц
 * с разными параметрами рассеивания и скорости. Точка старта (`y`) постепенно
 * поднимается снизу вверх (от 1.0 до 0.3), создавая эффект взлёта.
 * Использует библиотеку canvas-confetti (глобальная переменная `confetti`).
 *
 * @returns {void}
 */
const Confetti = () => {
    /** @type {number} Базовое количество частиц для расчёта залпов */
    const count = 100;

    /** @type {{origin: {y: number}}} Настройки по умолчанию — старт снизу страницы */
    const defaults = { origin: { y: 1 } };

    /**
     * Запускает один залп конфетти с заданными параметрами.
     * Объединяет defaults, переданные opts и вычисленное количество частиц.
     *
     * @param {number} particleRatio - Доля от `count` для этого залпа (0–1).
     * @param {object} opts - Дополнительные параметры canvas-confetti (spread, startVelocity, scalar и др.).
     * @returns {void}
     */
    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
    }

    /** @type {number} Текущая вертикальная позиция старта (1 = низ, 0 = верх) */
    let y = 1;

    // Запускаем анимацию: два залпа каждые 8 мс, точка старта поднимается вверх
    const interval = setInterval(() => {
        fire(0.2, { spread: 60,  startVelocity: 30, scalar: 0.8, origin: { y } }); // широкий медленный залп
        fire(0.1, { spread: 120, startVelocity: 55, scalar: 1.2 });                 // узкий быстрый залп

        y -= 0.05; // поднимаем точку старта

        // Останавливаем анимацию, когда точка поднялась достаточно высоко
        if (y <= 0.3) clearInterval(interval);
    }, 8);
};