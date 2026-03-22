function find(array, callback) {
    if (!Array.isArray(array)) return;

    if (typeof callback !== "function") return;

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }

    return undefined;
}

const numbers = [1, 2, 3, 4, 5];

const firstEven = find(numbers, (element) => element % 2 === 0);

console.log(firstEven);