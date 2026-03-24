/**
 * Проверяет, удовлетворяет ли хотя бы один элемент массива условию,
 * заданному callback-функцией. Аналог метода Array.prototype.some.
 *
 * @template T
 * @param {Array<T>} array - Массив для проверки.
 * @param {(element: T, index: number, array: Array<T>) => boolean} callback
 * Функция обратного вызова, которая возвращает true, если элемент удовлетворяет условию.
 * @returns {boolean|undefined} true, если хотя бы один элемент проходит проверку,
 * false, если ни один элемент не подходит, или undefined при некорректных входных данных.
 */
function some(array, callback) {
    // Проверка, что передан массив
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    // Перебор массива
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }

    return false;
}

// Примеры использования
const numbers1 = [1, 2, 3, 4, 5];
const hasEvenNumbers1 = some(numbers1, (element) => element % 2 === 0);

const numbers2 = [1, 3, 5];
const hasEvenNumbers2 = some(numbers2, (element) => element % 2 === 0);

console.log(hasEvenNumbers1); // true
console.log(hasEvenNumbers2); // false