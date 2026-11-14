export function formatDate(
	value: string | number | Date | null | undefined,
	options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
	locale = 'en'
) {
	if (value == null) {
		return null
	}

	const date = value instanceof Date ? value : new Date(value)

	if (Number.isNaN(date.getTime())) {
		return null
	}

	return new Intl.DateTimeFormat(locale, options).format(date)
}
