/**
 * Выполняет переданную callback-функцию для каждого элемента массива.
 * Аналог стандартного метода Array.prototype.forEach.
 *
 * @param {Array<any>} array - Массив, элементы которого нужно обработать.
 * @param {(element: any, index: number, array: Array<any>) => void} callback
 * Функция обратного вызова, вызываемая для каждого элемента массива.
 * @returns {void} Ничего не возвращает.
 */
function forEach(array, callback) {
    // Проверка, что первый аргумент является массивом
    if (!Array.isArray(array)) return;

    // Проверка, что callback — функция
    if (typeof callback !== "function") return;

    // Перебор массива и вызов callback
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

forEach([1, 2, 3], (element, index, _array) => {
    console.log(`Element: ${element}, Index: ${index}`);
});