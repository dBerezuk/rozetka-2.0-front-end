import type { Metadata } from 'next'

import { LegalDocument } from '@/components/elements/legal/LegalDocument'

export const metadata: Metadata = {
	title: 'Terms of use',
	description:
		'An overview of Rozetka user accounts, orders, pricing and platform terms.'
}

const TERMS_SECTIONS = [
	{
		id: 'agreement',
		title: 'Using the platform',
		text: 'Rozetka’s user agreement covers browsing, accounts, purchases and communication. Using the platform signifies acceptance of its terms. Users should review changes and stop using the service if they disagree.'
	},
	{
		id: 'account',
		title: 'Account and personal details',
		text: 'Orders require accurate, current information. The buyer, payer and recipient may differ; the buyer is responsible for lawful authorization to use the selected payment method.'
	},
	{
		id: 'orders',
		title: 'Placing an order',
		text: 'Customers select products, provide contact and recipient details, choose delivery and payment, and submit an order. Details can be corrected before submission.'
	},
	{
		id: 'prices',
		title: 'Prices and availability',
		text: 'Product descriptions, prices and stock may change. Final charges appear in the transaction documents. A seller may cancel an unavailable item; delivery, payment and return conditions are described separately.'
	},
	{
		id: 'privacy-cookies',
		title: 'Privacy and cookies',
		text: 'Personal information is handled under the privacy policy. Cookies support platform operation and preferences. Browser settings can restrict cookies, although some features may be affected.'
	},
	{
		id: 'third-parties',
		title: 'Partners and external services',
		text: 'Service providers may assist with fulfillment, support and data processing. External websites have their own terms. Additional conditions apply to credit, promotions and optional platform services.'
	}
]

export default function LegalTermsPage() {
	return (
		<LegalDocument
			title='Terms of use'
			description='A practical overview of the conditions described in Rozetka’s user agreement.'
			sections={TERMS_SECTIONS}
		/>
	)
}
