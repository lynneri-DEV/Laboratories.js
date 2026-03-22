function filter(array, callback) {
    if (!Array.isArray(array)) return;

    if (typeof callback !== "function") return;

    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}

const numbers = [1, 2, 3, 4, 5];

const evenNumbers = filter(numbers, (element) => element % 2 === 0);

console.log(evenNumbers);