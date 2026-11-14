class PaymentsApiConfig {
	readonly baseUrl = '/payments'
	readonly sync = `${this.baseUrl}/sync`
}

export const paymentsApiConfig = new PaymentsApiConfig()
