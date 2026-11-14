export function getOperatingSystemIcon(operatingSystem?: string | null) {
	const name = operatingSystem?.toLowerCase() ?? ''

	switch (true) {
		case name.includes('windows'):
			return '/os/windows.svg'

		case name.includes('android'):
			return '/os/android.svg'

		case name.includes('mac') || name.includes('ios') || name.includes('ipad') || name.includes('iphone'):
			return '/os/apple.svg'

		case ['linux', 'ubuntu', 'debian', 'fedora', 'arch', 'mint'].some(system => name.includes(system)):
			return '/os/linux.svg'

		default:
			return null
	}
}
