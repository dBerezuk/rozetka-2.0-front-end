const CURRENCY_CODES: Record<number, string> = { 978: 'EUR', 980: 'UAH' }

export function formatPrice(price: number | string, currency = 978) {
	return new Intl.NumberFormat('en-IE', {
		style: 'currency',
		currency: CURRENCY_CODES[currency]
	}).format(Number(price))
}
