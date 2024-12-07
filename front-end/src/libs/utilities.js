export function formatMoney(amount) {
    if (isNaN(amount)) {
        throw new Error("Invalid input: amount must be a number.");
    }
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatNumber(amount) {
    if (isNaN(amount)) {
        throw new Error("Invalid input: amount must be a number.");
    }

    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
