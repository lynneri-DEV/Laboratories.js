/**
 * Выводит элементы массива в консоль в формате:
 * "Element {index}: value {element}".
 *
 * @param {Array<any>} array - Массив, элементы которого нужно вывести.
 * @returns {void} Ничего не возвращает.
 */
function printArray(array) {
    // Проверка, что передан массив
    if (!Array.isArray(array)) {
        return;
    }

    /**
     * Callback-функция для обработки элементов массива.
     *
     * @param {any} element - Текущий элемент массива.
     * @param {number} index - Индекс текущего элемента.
     * @param {Array<any>} _array - Исходный массив (не используется).
     * @returns {void}
     */
    const callback = function(element, index, _array) {
        console.log(`Element ${index}: value ${element}`);
    };

    // Проверка, что callback является функцией
    if (typeof callback !== "function") {
        return;
    }

    // Итерация по массиву и вызов callback
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

printArray(['x', 'y', 'z']);


/**
 * Выводит элементы массива в консоль в формате:
 * "{index}: {element}".
 *
 * @param {Array<any>} array - Массив для вывода.
 * @returns {void} Ничего не возвращает.
 */
function printArray1(array) {
    // Проверка на массив
    if (!Array.isArray(array)) return;

    /**
     * Callback-функция для вывода элементов массива.
     *
     * @param {any} element - Текущий элемент массива.
     * @param {number} index - Индекс элемента.
     * @param {Array<any>} _array - Исходный массив (не используется).
     * @returns {void}
     */
    const callback = function(element, index, _array) {
        console.log(`${index}:  ${element}`);
    };

    // Проверка типа callback
    if (typeof callback !== "function") return;

    // Перебор массива
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

printArray1(['x', 'y', 'z']);