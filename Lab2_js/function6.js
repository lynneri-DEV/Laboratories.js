/**
 * Проверяет, удовлетворяют ли все элементы массива условию,
 * заданному callback-функцией. Аналог метода Array.prototype.every.
 *
 * @template T
 * @param {Array<T>} array - Массив для проверки.
 * @param {(element: T, index: number, array: Array<T>) => boolean} callback
 * Функция обратного вызова, которая возвращает true, если элемент удовлетворяет условию.
 * @returns {boolean|undefined} true, если все элементы проходят проверку,
 * false, если хотя бы один элемент не подходит, или undefined при некорректных входных данных.
 */
function every(array, callback) {
    // Проверка, что передан массив
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    // Перебор массива
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }

    return true;
}

// Примеры использования
const numbers1 = [2, 4, 6];
const hasEvenNumbers1 = every(numbers1, (element) => element % 2 === 0);

const numbers2 = [2, 4, 6, 3, 7];
const hasEvenNumbers2 = every(numbers2, (element) => element % 2 === 0);

console.log(hasEvenNumbers1); // true
console.log(hasEvenNumbers2); // false