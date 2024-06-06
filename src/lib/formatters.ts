const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US" , {
    currency: 'INR',
    style: 'currency',
    minimumFractionDigits: 0
})

export function FormatCurrency(amount : number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function FormatNumber(number : number) {
    return NUMBER_FORMATTER.format(number)
}
