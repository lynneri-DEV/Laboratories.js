function mapArr(array, callback) {
    if (!Array.isArray(array)) return;

    if (typeof callback !== "function") return;

    const result = [];

    for (let i = 0; i < array.length; i++) {
        result[i] = callback(array[i], i, array);
    }

    return result;
}

const numbers = [1, 2, 3];

const squared = mapArr(numbers, (element) => element * element);

console.log(squared);