import { AboutSection } from '@/components/elements/sessions/AboutSection'

export function HomeAbout() {
	return (
		<AboutSection
			title='Rozetka — more than a store'
			description={
				<p>
					Since 2005, Rozetka has helped people across Ukraine bring everyday
					wishes and bigger plans to life. We bring a wide range of products
					together to make finding what you need simple and convenient.
				</p>
			}
		>
			<p>
				We believe shopping should leave you feeling confident about your
				choice. From electronics and home essentials to something for your
				hobbies, our goal is to help you find the right fit. Reviews, guides and
				product updates make that decision easier.
			</p>
			<p>
				Rozetka connects online shopping with physical stores, offering
				different ways to discover, collect and receive your purchases. As a
				marketplace, we also give independent sellers a place to start a
				business and introduce their products to more people.
			</p>
		</AboutSection>
	)
}
