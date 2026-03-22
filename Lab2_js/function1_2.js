function forEach(array, callback) {
    if (!Array.isArray(array)) return;

    if (typeof callback !== "function") return;

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

forEach([1, 2, 3], (element, index, _array) => {
    console.log(`Element: ${element}, Index: ${index}`);
});