function printArray(array) {
    if (!Array.isArray(array)) {
        return;
    }

    const callback = function(element, index, _array) {
        console.log(`Element ${index}: value ${element}`);
    };

    if (typeof callback !== "function") {
        return;
    }

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

printArray(['x', 'y', 'z']);

function printArray1(array) {
    if (!Array.isArray(array)) return;

    const callback = function(element, index, _array) {
        console.log(`${index}:  ${element}`);
    };

    if (typeof callback !== "function") return;

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

printArray1(['x', 'y', 'z']);