/**
 * Последовательно обрабатывает элементы массива, накапливая результат
 * с помощью callback-функции. Аналог метода Array.prototype.reduce.
 *
 * @template T, U
 * @param {Array<T>} array - Массив для обработки.
 * @param {(accumulator: U, element: T, index: number, array: Array<T>) => U} callback
 * Функция обратного вызова, которая принимает аккумулятор и текущий элемент
 * и возвращает новое значение аккумулятора.
 * @param {U} [initialValue] - Начальное значение аккумулятора.
 * @returns {U|undefined} Итоговое значение аккумулятора или undefined,
 * если массив пуст и начальное значение не задано.
 */
function reduce(array, callback, initialValue) {
    // Обработка случая пустого массива без initialValue
    if (array.length === 0) {
        return initialValue;
    }

    let accumulator;
    let startIndex;

    // Определение начального значения аккумулятора
    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    // Перебор массива
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// Примеры использования

// сумма чисел с initialValue
const numbers1 = [1, 2, 3, 4, 5];
const sum1 = reduce(numbers1, (acc, el) => acc + el, 0);

console.log(sum1); // 15

// сумма без initialValue
const numbers2 = [1, 2, 3];
const sum2 = reduce(numbers2, (acc, el) => acc + el);

console.log(sum2); // 6
