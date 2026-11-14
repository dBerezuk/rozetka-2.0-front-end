import type { Metadata } from 'next'

import { LegalDocument } from '@/components/elements/legal/LegalDocument'

export const metadata: Metadata = {
	title: 'Privacy policy',
	description:
		'An overview of personal data collection, processing and privacy rights at Rozetka.'
}

const PRIVACY_SECTIONS = [
	{
		id: 'data-collection',
		title: 'Information collected',
		text: 'Personal data can include contact details, account information, order and payment details, and information provided during communication. Social sign-in may supply a name, email address and profile picture.'
	},
	{
		id: 'processing',
		title: 'Purposes and legal grounds',
		text: 'Data supports identification, purchases, payments, customer service and legal obligations. Processing relies on a contract, legal requirements, legitimate interests or consent, as applicable.'
	},
	{
		id: 'retention',
		title: 'Retention and protection',
		text: 'Information is retained only as needed for its stated purposes or as required by law. Access is restricted and safeguards are used to protect personal data.'
	},
	{
		id: 'sharing',
		title: 'Sharing information',
		text: 'Authorized service providers and partners may process information for defined purposes. Disclosure to public authorities follows applicable legal requirements.'
	},
	{
		id: 'rights',
		title: 'Your privacy rights',
		text: 'You may request information about processing, access and correction, object to unlawful processing, withdraw consent and seek deletion where applicable. Rights remain subject to legal retention obligations.'
	},
	{
		id: 'marketing',
		title: 'Marketing preferences',
		text: 'Marketing messages can be declined through account settings or by contacting Rozetka using the details in the original policy.'
	}
]

export default function PrivacyPage() {
	return (
		<LegalDocument
			title='Privacy policy'
			description='How Rozetka describes the collection, use and protection of personal information.'
			sections={PRIVACY_SECTIONS}
		/>
	)
}
