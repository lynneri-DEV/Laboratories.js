const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2019-01-01",
        transaction_amount: 100.0,
        transaction_type: "debit",
        transaction_description: "Payment for groceries",
        merchant_name: "SuperMart",
        card_type: "Visa",
    },
    {
        transaction_id: "2",
        transaction_date: "2019-05-02",
        transaction_amount: 50.0,
        transaction_type: "credit",
        transaction_description: "Refund for returned item",
        merchant_name: "OnlineShop",
        card_type: "MasterCard",
    },
    {
        transaction_id: "5",
        transaction_date: "2019-05-05",
        transaction_amount: 25.0,
        transaction_type: "credit",
        transaction_description: "Returned defective product",
        merchant_name: "ElectronicsShop",
        card_type: "Visa",
    },
    {
        transaction_id: "10",
        transaction_date: "2019-02-10",
        transaction_amount: 200.0,
        transaction_type: "credit",
        transaction_description: "Cashback reward",
        merchant_name: "BankXYZ",
        card_type: "Visa",
    }
];

// Проверка с пустым массивом транзакций
// const transactions = [];

// Проверка работы функций на массиве транзакций с одной транзакцией
// const transactions = [
//     {
//         transaction_id: "1",
//         transaction_date: "2019-01-01",
//         transaction_amount: 100.0,
//         transaction_type: "debit",
//         transaction_description: "Payment for groceries",
//         merchant_name: "SuperMart",
//         card_type: "Visa",
//     },
// ];

/** Функция №1. Возвращает массив уникальных типов транзакций
* Функция проходит по массиву транзакций, извлекает поле transaction_type
* и формирует массив уникальных значений.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_type - Тип транзакции (например "debit" или "credit").
*
* @returns {string[]} Массив уникальных типов транзакций.
*/
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(transaction => transaction.transaction_type);
    return [...new Set(types)];
}

console.log(`1.Массив уникальных типов транзакций`, getUniqueTransactionTypes(transactions));

/* Функция №2. Вычисляет сумму всех транзакций
 *
 * Функция проходит по массиву транзакций и суммирует значения поля
 * transaction_amount, возвращая общий итог.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {number} transactions[].transaction_amount - Сумма транзакции.
 *
 * @returns {number} Общая сумма всех транзакций.
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, transaction) => {
        return sum + transaction.transaction_amount;
    }, 0);
}
// Второй способ - через цикл for
// function calculateTotalAmount_2(transactions) {
//     let sum = 0;
//
//     for (let i = 0; i < transactions.length; i++) {
//         sum += transactions[i].transaction_amount;
//     }
//
//     return sum;
// }
console.log(`2.Сумма всех транзакций:`, calculateTotalAmount(transactions));

// Функция №3. Вычисляет общую сумму транзакций за указанный год, месяц и день.
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions
        .filter(transaction => {
            const date = new Date(transaction.transaction_date);

            const matchYear =
                year === undefined || date.getFullYear() === year;

            const matchMonth =
                month === undefined || (date.getMonth() + 1) === month;

            const matchDay =
                day === undefined || date.getDate() === day;

            return matchYear && matchMonth && matchDay;
        })
        .reduce((sum, transaction) => {
            return sum + transaction.transaction_amount;
        }, 0);
}

console.log(`3.Общая сумма транзакций за указанную дату:`, calculateTotalAmountByDate(transactions, 2018));

/** Функция №4. Возвращает массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate.
 *
 * Функция фильтрует транзакции, оставляя только те, дата которых
 * находится между startDate и endDate включительно.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате.
 * @param {string} startDate - Начальная дата диапазона (включительно).
 * @param {string} endDate - Конечная дата диапазона (включительно).
 *
 * @returns {Array<Object>} Массив транзакций, попавших в указанный диапазон дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);

        return transactionDate >= start && transactionDate <= end;
    });
}

console.log(`4.Массив транзакций, проведенных в указанном диапазоне дат:`, getTransactionsInDateRange(transactions, `2019-01-01`, `2019-01-04`));

/** Функция №5. Возвращает транзакции указанного типа (debit или credit)
* Возвращает массив транзакций указанного типа.
*
* Функция фильтрует массив транзакций и оставляет только те,
* у которых значение transaction_type совпадает с переданным типом.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_type - Тип транзакции (например "debit" или "credit").
* @param {string} type - Тип транзакции, который нужно отфильтровать.
*
* @returns {Array<Object>} Массив транзакций указанного типа.
*/
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction =>
        transaction.transaction_type === type
    );
}

console.log(`5.Возвращаем транзакции указанного типа (debit или credit):`, getTransactionByType(transactions, `debit`));

/** Функция №6. Возвращает массив транзакций, совершенных с указанным merchantName
*
* Функция фильтрует массив транзакций и оставляет только те,
* у которых поле merchant_name совпадает с переданным значением.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].merchant_name - Название магазина/мерчанта.
* @param {string} name - Название магазина, по которому выполняется поиск.
*
* @returns {Array<Object>} Массив транзакций указанного магазина.
*/
function getTransactionByMerchantName(transactions, name) {
    return transactions.filter(transaction =>
        transaction.merchant_name === name
    );
}

console.log(`6.Возвращаем массив транзакций, совершенных с указанным merchantName:`, getTransactionByMerchantName(transactions, `OnlineShop`));

/** Функция №7. Возвращает среднее значение транзакций
*
* Функция суммирует все значения transaction_amount
* и делит их на количество транзакций.
* Если массив пустой, возвращает 0.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {number} transactions[].transaction_amount - Сумма транзакции.
*
* @returns {number} Среднее значение суммы транзакций.
*/
function calculateAverageTransactionAmount(transactions) {
    if(transactions.length === 0) return 0;

    const total = transactions.reduce((sum, transaction) => {
            return sum + transaction.transaction_amount;
    }, 0);

    return total / transactions.length;
}

console.log(`7.Среднее значение транзакций:`, calculateAverageTransactionAmount(transactions));

/** Функция №8. Возвращает массив транзакций с суммой в заданном диапазоне
*
* Функция фильтрует транзакции и оставляет только те,
* у которых transaction_amount находится между minAmount и maxAmount включительно.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {number} transactions[].transaction_amount - Сумма транзакции.
* @param {number} minAmount - Минимальная сумма диапазона.
* @param {number} maxAmount - Максимальная сумма диапазона.
*
* @returns {Array<Object>} Массив транзакций в указанном диапазоне суммы.
*/
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction =>
        transaction.transaction_amount >= minAmount &&
        transaction.transaction_amount <= maxAmount
    );
}

console.log(`8.Массив транзакций с суммой в заданном диапазоне:`, getTransactionsByAmountRange(transactions, 20, 70));

/* Функция №9. Вычисляет общую сумму дебетовых транзакций
*
* Функция фильтрует массив транзакций, оставляя только те,
* у которых transaction_type равен "debit",
* затем суммирует их значения transaction_amount.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_type - Тип транзакции ("debit" или "credit").
* @param {number} transactions[].transaction_amount - Сумма транзакции.
*
* @returns {number} Общая сумма всех debit-транзакций.
*/
function calculateTotalDebitAmount(transactions) {
    return transactions
        .filter(transaction => transaction.transaction_type === "debit")
        .reduce((sum, transaction) => {
            return sum + transaction.transaction_amount;
        }, 0);
}

console.log(`9.Общая сумма дебетовых транзакций:`, calculateTotalDebitAmount(transactions));

/** Функция №10. Возвращает месяц, в котором было больше всего транзакций
*
* Функция проходит по массиву транзакций, определяет месяц каждой транзакции
* и подсчитывает количество транзакций для каждого месяца.
* Затем возвращает месяц с максимальным количеством транзакций.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_date - Дата транзакции в строковом формате.
*
* @returns {number|null} Месяц (1–12) с наибольшим количеством транзакций.
* Если массив пустой — возвращает null.
*/
function findMostTransactionsMonth(transactions) {
    const monthCount = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.transaction_date);
        const month = date.getMonth() + 1; // 1–12

        monthCount[month] = (monthCount[month] || 0) + 1;
    });

    let maxMonth = null;
    let maxCount = 0;

    for (const month in monthCount) {
        if (monthCount[month] > maxCount) {
            maxCount = monthCount[month];
            maxMonth = month;
        }
    }

    return maxMonth;
}

console.log(`10.Месяц, в котором было больше всего транзакций:`, findMostTransactionsMonth(transactions));

/** Функция №11. Возвращает месяц, в котором было больше всего дебетовых транзакций
*
* Функция фильтрует только транзакции типа "debit",
* затем подсчитывает количество таких транзакций по каждому месяцу
* и возвращает месяц с максимальным количеством debit-операций.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_date - Дата транзакции в строковом формате.
* @param {string} transactions[].transaction_type - Тип транзакции ("debit" или "credit").
*
* @returns {number|null} Месяц (1–12) с наибольшим количеством debit-транзакций.
* Если транзакций нет — возвращает null.
*/
function findMostDebitTransactionMonth(transactions) {
    const monthCount = {};

    transactions
        .filter(transaction => transaction.transaction_type === "debit")
        .forEach(transaction => {
            const date = new Date(transaction.transaction_date);
            const month = date.getMonth() + 1;

            monthCount[month] = (monthCount[month] || 0) + 1;
        })

    let maxMonth = null;
    let maxCount = 0;

    for (const month in monthCount) {
        if (monthCount[month] > maxCount) {
            maxCount = monthCount[month];
            maxMonth = month;
        }
    }
    return maxMonth;
}

console.log(`11.Месяц, в котором было больше всего дебетовых транзакций:`, findMostDebitTransactionMonth(transactions));

/** Функция №12. Возвращает каких транзакций больше всего
* Определяет, транзакций какого типа больше всего.
*
* Функция подсчитывает количество debit и credit транзакций
* и сравнивает их между собой.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_type - Тип транзакции ("debit" или "credit").
*
* @returns {string} Возвращает:
    * - "debit", если дебетовых транзакций больше
* - "credit", если кредитовых транзакций больше
* - "equal", если количество одинаковое
*/
function mostTransactionTypes(transactions) {
    let debitCount = 0;
    let creditCount = 0;

    transactions.forEach(transaction => {
        if (transaction.transaction_type === "debit") {
            debitCount++;
        } else if (transaction.transaction_type === "credit") {
            creditCount++;
        }
    });

    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
}

console.log(`12. Больше всего транзакций:`, mostTransactionTypes(transactions));

/** Функция №13. Возвращает массив транзакций, совершенных до указанной даты
 *
 * Функция фильтрует транзакции и оставляет только те,
 * дата которых меньше переданной даты (date).
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} transactions[].transaction_date - Дата транзакции в строковом формате.
 * @param {string} date - Граница даты (все транзакции строго до этой даты).
 *
 * @returns {Array<Object>} Массив транзакций, совершённых до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.filter(transaction =>
        new Date(transaction.transaction_date) < targetDate
    );
}

console.log(`13. Массив транзакций, совершенных до указанной даты:`, getTransactionsBeforeDate(transactions, `2019-03-03`));

/** Функция №14. Возвращает транзакцию по ее уникальному идентификатору (id)
*
* Функция ищет первую транзакцию в массиве, у которой
* transaction_id совпадает с переданным id.
*
* @param {Array<Object>} transactions - Массив транзакций.
* @param {string} transactions[].transaction_id - Уникальный идентификатор транзакции.
* @param {string} id - Идентификатор транзакции для поиска.
*
* @returns {Object|undefined} Найденная транзакция или undefined, если не найдена.
*/
function findTransactionById(transactions, id) {
    return transactions.find(
        transaction => transaction.transaction_id === id
    );
}

console.log(`14. Транзакция по уникальному идентификатору:`, findTransactionById(transactions, `2`));

/** Функция №15. Возвращаем новый массив, содержащий только описания транзакций.
 *
 * Функция проходит по массиву транзакций и извлекает поле
 * transaction_description, формируя новый массив только с описаниями.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} transactions[].transaction_description - Описание транзакции.
 *
 * @returns {string[]} Массив описаний транзакций.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(
        transaction => transaction.transaction_description
    );
}

console.log(`15. Новый массив, содержащий только описания транзакций:`, mapTransactionDescriptions(transactions));
