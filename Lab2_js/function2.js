/**
 * Создает новый массив, заполняя его результатами вызова callback-функции
 * для каждого элемента исходного массива.
 * Аналог метода Array.prototype.map.
 *
 * @template T, U
 * @param {Array<T>} array - Исходный массив.
 * @param {(element: T, index: number, array: Array<T>) => U} callback
 * Функция обратного вызова, которая применяется к каждому элементу массива.
 * @returns {Array<U>|undefined} Новый массив с преобразованными элементами
 * или undefined, если входные данные некорректны.
 */
function mapArr(array, callback) {
    // Проверка, что array является массивом
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    const result = [];

    // Перебор массива и заполнение нового массива
    for (let i = 0; i < array.length; i++) {
        result[i] = callback(array[i], i, array);
    }

    return result;
}

// Пример использования
const numbers = [1, 2, 3];

const squared = mapArr(numbers, (element) => element * element);

console.log(squared);