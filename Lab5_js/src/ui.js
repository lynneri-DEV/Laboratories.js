import {
    transactions,
    addTransactionToArray,
    deleteTransaction,
    calculateTotal
} from "./transactions.js";

import { formatDate, generateId, shortDescription } from "./utils.js";

// СОЗДАНИЕ ТАБЛИЦЫ

function createTable() {
    const table = document.createElement("table");
    table.id = "transactionsTable";
    table.style.borderCollapse = "collapse"; // вместо table.border = "1"

    table.innerHTML = `
        <thead>
            <tr>
                <th>Дата и время</th>
                <th>Категория</th>
                <th>Описание</th>
                <th>Действие</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    return table;
}

// СТРОКА ТРАНЗАКЦИИ

function createTransactionRow(transaction) {
    const tr = document.createElement("tr");

    tr.dataset.id = transaction.id;

    tr.style.backgroundColor =
        transaction.amount > 0 ? "#c8f7c5" : "#f7c5c5";

    tr.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${shortDescription(transaction.description)}</td>
        <td>
            <button data-id="${transaction.id}">
                Удалить
            </button>
        </td>
    `;

    return tr;
}

function handleTableClick(event) {
    const target = event.target;

    const deleteButton = target.closest("button[data-id]");

    if (deleteButton) {
        event.stopPropagation();
        const id = Number(deleteButton.dataset.id);
        deleteTransaction(id);
        const row = deleteButton.closest("tr");
        if (row) row.remove();
        updateTotal();
        return;
    }

    const row = target.closest("tr");

    // Безопасная проверка, что клик был по строке внутри тела таблицы
    if (row && row.parentElement && row.parentElement.nodeName === 'TBODY') {
        const id = Number(row.dataset.id);
        showTransactionDetails(id);
    }
}

// ОТРИСОВКА

function renderTransactions() {
    const tbody = document.querySelector("#transactionsTable tbody");
    tbody.innerHTML = "";

    transactions.forEach(transaction => {
        tbody.appendChild(createTransactionRow(transaction));
    });
}

// ДОБАВЛЕНИЕ ТРАНЗАКЦИИ

function addTransaction(event) {
    event.preventDefault();

    const form = event.target;
    const errorElement = document.getElementById("formError");

    const amount = Number(form.amount.value);
    const category = form.category.value;
    const description = form.description.value;

    // ===== ВАЛИДАЦИЯ =====
    const error = validateForm(amount, category, description);

    if (error) {
        errorElement.textContent = error;
        return;
    }

    errorElement.textContent = "";

    const transaction = {
        id: generateId(),
        date: new Date(),
        amount,
        category,
        description
    };

    addTransactionToArray(transaction);

    const tbody = document.querySelector("#transactionsTable tbody");
    const row = createTransactionRow(transaction);
    tbody.appendChild(row);

    form.reset();

    updateTotal();
}

export function initUI() {
    const app = document.getElementById("app");

    app.innerHTML = "";

    const form = createForm();
    const totalElement = createTotalElement();
    const table = createTable();

    table.addEventListener("click", handleTableClick);

    app.appendChild(form);
    app.appendChild(totalElement);
    app.appendChild(table);

    renderTransactions();
    updateTotal();
}

function createTotalElement() {
    const total = document.createElement("h2");
    total.id = "totalAmount";
    total.textContent = "Общая сумма: 0";
    return total;
}

function updateTotal() {
    const totalElement = document.getElementById("totalAmount");

    const total = calculateTotal();

    totalElement.textContent = `Общая сумма: ${total}`;
}

function showTransactionDetails(id) {
    const detailsElement = document.getElementById("transactionDetails");

    const transaction = transactions.find(t => t.id === id);

    if (!transaction) return;

    detailsElement.textContent = transaction.description;
}

function createForm() {
    const form = document.createElement("form");
    form.id = "transactionForm";

    form.innerHTML = `
        <h3>Добавить транзакцию</h3>

        <input type="number" name="amount" placeholder="Сумма" required>

        <select name="category" required>
            <option value="">Выберите категорию</option>
            <option value="Food">Еда</option>
            <option value="Transport">Транспорт</option>
            <option value="Shopping">Покупки</option>
            <option value="Salary">Зарплата</option>
        </select>

        <input type="text" name="description" placeholder="Описание" required>

        <button type="submit">Добавить</button>

        <p id="formError" style="color:red;"></p>
    `;

    form.addEventListener("submit", addTransaction);

    return form;
}

function validateForm(amount, category, description) {
    if (!amount || isNaN(amount)) {
        return "Введите корректную сумму";
    }

    if (!category) {
        return "Выберите категорию";
    }

    if (!description.trim()) {
        return "Введите описание";
    }

    return null;
}