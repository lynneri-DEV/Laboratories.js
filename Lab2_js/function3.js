/**
 * Создает новый массив, содержащий только те элементы исходного массива,
 * для которых callback-функция возвращает true.
 * Аналог метода Array.prototype.filter.
 *
 * @template T
 * @param {Array<T>} array - Исходный массив.
 * @param {(element: T, index: number, array: Array<T>) => boolean} callback
 * Функция обратного вызова, которая проверяет условие для каждого элемента.
 * Должна возвращать true или false.
 * @returns {Array<T>|undefined} Новый массив с отфильтрованными элементами
 * или undefined, если входные данные некорректны.
 */
function filter(array, callback) {
    // Проверка, что array является массивом
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    const result = [];

    // Перебор массива и фильтрация элементов
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}

// Пример использования
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = filter(numbers, (element) => element % 2 === 0);

console.log(evenNumbers);