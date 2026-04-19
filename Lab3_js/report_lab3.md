# Лабораторная работа №3
## Тема: Основы работы с массивами, функциями и объектами в JavaScript
**Дисциплина:** JavaScript
**Студент:** Петровская Арина  
**Группа:** IA2504  
**Преподаватель:** Nartea N.  
**Год:** 2026

---

### Описание лабораторной работы
#### Цель  
Изучить и закрепить навыки работы с массивами и объектами в JavaScript, а также освоить методы обработки данных 
(`map`, `filter`, `reduce`, `find`) для решения прикладных задач анализа транзакций.
#### Задачи  
* Изучить структуру массива объектов на примере транзакций.
* Реализовать функции анализа данных транзакций
* Протестировать функции на разных наборах данных (пустой массив, один элемент, несколько элементов).
* Оформить документацию функций с использованием JSDoc.

---

### Выполнение лабораторной работы
Перед выполнением создаем новую директорию `Lab3_js`, в которой будет храниться содержание третьей лабораторной работы.  
В директории `lab_3` создаем файл `main.py`.
В файл записываем массив `transactions` объектов с транзакциями. Каждая транзакция содержит следующие свойства:
* `transaction_id` - уникальный идентификатор транзакции.
* `transaction_date` - дата транзакции.
* `transaction_amount` - сумма транзакции.
* `transaction_type` - тип транзакции (приход или расход).
* `transaction_description` - описание транзакции.
* `merchant_name` - название магазина или сервиса.
* `card_type` - тип карты (кредитная или дебетовая).  

Например
```javascript
transaction_id: "1",
transaction_date: "2019-01-01",
transaction_amount: 100.0,
transaction_type: "debit",
transaction_description: "Payment for groceries",
merchant_name: "SuperMart",
card_type: "Visa"
```  
1. Создаем функцию, которая возвращает массив уникальных типов транзакций.
```javascript
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(transaction => transaction.transaction_type);
    return [...new Set(types)];
}
```  
- Функция с параметром принимает массив `transactions`.  
- `map()` является методом массива, который создаёт новый массив, проходя по каждому элементу.
- `transaction` - текущий объект из массива
- `transaction.transaction_type` - берём поле `transaction_type`
- `Set` - структура данных, которая хранит только уникальные значения, дубликаты автоматически удаляются.  

Вывод в консоли `[ 'debit', 'credit' ]`
2. Вычисляем сумму всех транзакций. ❗В скрипте реализовано два способа.
```javascript
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, transaction) => {
        return sum + transaction.transaction_amount;
    }, 0);
}
```  
- Метод `reduce()` последовательно обрабатывает элементы массива, «сворачивая» их в одно итоговое значение.
- `sum` - накопитель (итоговая сумма)
- `transaction` - текущий объект
- к каждой транзакции добавляется сумма
- 0 - стартовое значение суммы  \

Вывод в консоли `195`  
3. Вычисляем общую сумму транзакций за указанный год, месяц и день.
```javascript
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
```  
- `filter()` проходит по каждой транзакции и оставляет только подходящие
- `transaction` - текущий объект транзакции
- создаем объект даты `const date` с которым можно работать  
- проверяем год, месяц, день. Если какой-то параметр не передан `year === undefined`, то подходят все года/месяца/дни
- `(date.getMonth() + 1) === month` - поскольку месяца начинаются с 0
- в итоге транзакция остается если и год, и месяц, и день подходят
- после `filter()` остаются только нужные транзакции
- `getFullYear, getMonth, getDate` - это методы объекта `Date`  

Вывод в консоли `console.log(calculateTotalAmountByDate(transactions, 2018));` - `0`
4. Возвращаем массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate.
```javascript
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);

        return transactionDate >= start && transactionDate <= end;
    });
}
```  
- `startDate` — начало диапазона, `endDate` — конец диапазона
- преобразуем строки в объекты `start` `end`
- оператор && - обе проверки должны быть `true`
- при выводе получаем массив с датами
5. Возвращаем транзакции указанного типа (debit или credit).
```javascript
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction =>
        transaction.transaction_type === type
    );
```  
- при работе функция создает новый массив, проходится по каждому элементу уже существующего массива и записывает в новый подходящие транзакции.
6. Аналогично 5 заданию создаем функцию, которая возвращает массив транзакций, совершенных с указанным `merchantName`
```javascript
function getTransactionByMerchantName(transactions, name) {
    return transactions.filter(transaction =>
        transaction.merchant_name === name
    );
}
```  
Если `merchantName` указываем `OnlineShop`, то вывод:
```javascript
6.Возвращаем массив транзакций, совершенных с указанным merchantName: [
  {
    transaction_id: '2',
    transaction_date: '2019-01-02',
    transaction_amount: 50,
    transaction_type: 'credit',
    transaction_description: 'Refund for returned item',
    merchant_name: 'OnlineShop',
    card_type: 'MasterCard'
  }
]

```
7. Возвращаем среднее значение транзакций (на базе функции №2)
```javascript
function calculateAverageTransactionAmount(transactions) {
    if(transactions.length === 0) return 0;

    const total = transactions.reduce((sum, transaction) => {
        return sum + transaction.transaction_amount;
    }, 0);

    return total / transactions.length;
}
```  
- вначале проверяем: если транзакций нет (`transactions.length === 0`), то делить нельзя  
- далее находим сумму всех транзакций
- для вывода среднего значения делим сумму на количество транзакций  

Вывод в консоли `7.Среднее значение транзакций: 48.75`
8. Возвращаем массив транзакций с суммой в заданном диапазоне
```javascript
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction =>
        transaction.transaction_amount >= minAmount &&
        transaction.transaction_amount <= maxAmount
    );
}
```  
- сравниваем сумму транзакции с введенными пользователем данными, оба условия должны соответствовать, чтобы вывелись корректные значения.
Если укажем диапазон от 20 до 70, то в консоли будет массив транзакций с transaction_amount: 50, 25, 20  
9. Вычисляем общую сумму дебетовых транзакций  
```javascript
function calculateTotalDebitAmount(transactions) {
    return transactions
        .filter(transaction => transaction.transaction_type === "debit")
        .reduce((sum, transaction) => {
            return sum + transaction.transaction_amount;
        }, 0);
}
```  
- сначала сортируем все значения `transaction_type`, далее собираем всё в единый массив используя метод `reduce()`  
Вывод в консоли: `Общая сумма дебетовых транзакций: 100`
10. Возвращаем месяц, в котором было больше всего транзакций
```javascript
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
```
- в `monthCount` записываем пустой объект, который будет счетчиком, где данные будут записываться в формате: `{ "номер_месяца": количество_транзакций }`  
- `forEach` это метод массивов, который позволяет перебрать все элементы массива по очереди и выполнить для каждого из них какую-то функцию.
- `new Date(...)` превращаем строку даты в объект даты для последующей работы
- `date.getMonth()` метод при котором получаем индекс месяца (0-11)
- `(monthCount[month] || 0) + 1` берем текущее значение для этого месяца, если его еще нет (undefined), то 0 и прибавляем к этому числу 1
- в `maxCount` мы будем хранить самое большое число транзакций, которое встретим, а в `maxMonth` — название/номер этого месяца
- `for (const month in monthCount)` перебираем все ключи (месяцы), которые насобирали в объекте 
- `if (monthCount[month] > maxCount)` - проверка на лидерство и обновление данных 

Вывод в консоли: `Месяц, в котором было больше всего транзакций: 5`  
11. По аналогии с заданием №10 выводим месяц, в котором было больше дебетовых транзакций.
необходимо добавить фильтр `.filter(transaction => transaction.transaction_type === "debit")`  
Вывод в консоли: `Месяц, в котором было больше всего дебетовых транзакций: 1`
12. Возвращаем каких транзакций больше всего
```javascript
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
```  
- создаем переменные-счетчики для дебитов и кредитов 
- далее отбираем каждую транзакцию и выводим результат  

Вывод в консоли: `Больше всего транзакций: credit`  
13. Возвращаем массив транзакций, совершенных до указанной даты  
```javascript
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.filter(transaction =>
        new Date(transaction.transaction_date) < targetDate
    );
}
```
- для начала переобразуем строку в дату (например `"2019-01-03" → Date object`)
- далее фильтруем массив, если дата транзакции раньше, она попадёт в результат  

При выводе изобразится в консоли массив до даты, введенной пользователем  
14. Возвращаем транзакцию по ее уникальному идентификатору (id)
```javascript
function findTransactionById(transactions, id) {
    return transactions.find(
        transaction => transaction.transaction_id === id
    );
}
```
- `find()` является методом массива, который возвращает первый найденный объект, если ничего нет вернёт `undefined`  

Если в качестве `id` введем `2`, то выведется в консоли массив с данным идентификатором.  
15. Возвращаем новый массив, содержащий только описания транзакций
```javascript
function mapTransactionDescriptions(transactions) {
    return transactions.map(
        transaction => transaction.transaction_description
    );
}
```
- `map()` является методом массива, который создает новый массив и переобразует каждый элемент. Для каждой транзакции берется только поле `transaction_description`.

Вывод в консоли: 
```
Новый массив, содержащий только описания транзакций: [
  'Payment for groceries',
  'Refund for returned item',
  'Returned defective product',
  'Cashback reward'
]
```
### Проверка работы функций с пустым массивом  
Вывод в консоли:  
```
1.Массив уникальных типов транзакций []
2.Сумма всех транзакций: 0
3.Общая сумма транзакций за указанную дату: 0
4.Массив транзакций, проведенных в указанном диапазоне дат: []
5.Возвращаем транзакции указанного типа (debit или credit): []
6.Возвращаем массив транзакций, совершенных с указанным merchantName: []
7.Среднее значение транзакций: 0
8.Массив транзакций с суммой в заданном диапазоне: []
9.Общая сумма дебетовых транзакций: 0
10.Месяц, в котором было больше всего транзакций: null
11.Месяц, в котором было больше всего дебетовых транзакций: null
12. Больше всего транзакций: equal
13. Массив транзакций, совершенных до указанной даты: []
14. Транзакция по уникальному идентификатору: undefined
15. Новый массив, содержащий только описания транзакций: []
```  
При пустом массиве функции возвращают:

| Тип функции  | Что возвращать |  
| ------------ | -------------- |  
| сумма        | `0`            |  
| среднее      | `0`            |  
| filter       | `[]`           |  
| map          | `[]`           |  
| find         | `undefined`    |  
| поиск месяца | `null`         |  

- при сумме и среднем значении выводится ноль, поскольку нет ключей и значений, подсчет не выполняется
- `filter` создает новый массив, поскольку ключей и значений нет, выводится пустой массив;
- `map` преобразует каждый элемент массива, при пустом массиве нечего преобразовывать;
- `find` ищет один элемент, а не весь массив, но если он не найден, то возвращает `undefined`;
- `null` отображается в случае, если результата вообще нет, его не существует
### Если проверять все функции при одной транзакции, то они будут работать корректно потому что:
- массив не пустой
- методы `map`, `filter`, `reduce`, `find` нормально работают даже с 1 элементом
### Контрольные вопросы  
1. Какие методы массивов можно использовать для обработки объектов в JavaScript?  
- map() — преобразование;
- filter() — фильтрация;
- find() — поиск одного объекта;
- reduce() — агрегирование;
- some() — проверка существования;
- every() — проверка всех элементов;
- sort() — сортировка объектов.
2. Как сравнивать даты в строковом формате в JavaScript?  
Можно сравнивать двумя способами:  
Первый способ - через `Date` 
```javascript
const d1 = new Date("2019-01-01");
const d2 = new Date("2019-01-05");

console.log(d1 < d2);
```  
Первый способ - строки `ISO` формата
```javascript
"2019-01-01" < "2019-01-05"
```
3. В чем разница между map(), filter() и reduce() при работе с массивами объектов?  

| Метод        | Что делает        | Возвращает    | Когда использовать |
| ------------ | ----------------- | ------------- | ------------------ |
| **map()**    | изменяет элементы | новый массив  | преобразование     |
| **filter()** | отбирает элементы | новый массив  | поиск по условию   |
| **reduce()** | объединяет данные | одно значение | сумма, статистика  |

### [Официальная документация JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
