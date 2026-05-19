// массив транзакций
export const transactions = [
    {
        id: 1,
        date: new Date(),
        amount: 100,
        category: "Food",
        description: "Lunch"
    },
    {
        id: 2,
        date: new Date(),
        amount: 250,
        category: "Transport",
        description: "Taxi"
    }
];

export function addTransactionToArray(transaction) {
    transactions.push(transaction);
}

export function deleteTransaction(id) {
    const index = transactions.findIndex(t => t.id === id);

    if (index !== -1) {
        transactions.splice(index, 1);
    }
}

export function calculateTotal() {
    return transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );
}