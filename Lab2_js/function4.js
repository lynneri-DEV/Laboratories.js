/**
 * Находит первый элемент массива, который удовлетворяет условию,
 * заданному callback-функцией. Аналог метода Array.prototype.find.
 *
 * @template T
 * @param {Array<T>} array - Исходный массив.
 * @param {(element: T, index: number, array: Array<T>) => boolean} callback
 * Функция обратного вызова, проверяющая условие для каждого элемента.
 * Должна возвращать true, если элемент удовлетворяет условию.
 * @returns {T|undefined} Первый элемент, удовлетворяющий условию,
 * или undefined, если таких элементов нет или входные данные некорректны.
 */
function find(array, callback) {
    // Проверка, что передан массив
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    // Перебор массива и поиск первого подходящего элемента
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }

    return undefined;
}

// Пример использования
const numbers = [1, 2, 3, 4, 5];

const firstEven = find(numbers, (element) => element % 2 === 0);

console.log(firstEven); // 2