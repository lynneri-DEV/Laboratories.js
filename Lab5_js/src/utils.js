// генерация ID
export function generateId() {
    return Date.now();
}

// форматирование даты
export function formatDate(date) {
    return new Date(date).toLocaleString();
}

// первые 4 слова описания
export function shortDescription(text) {
    return text.split(" ").slice(0, 4).join(" ");
}