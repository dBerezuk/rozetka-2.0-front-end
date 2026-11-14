import { Badge } from '@/components/ui/Badge'

interface IAdminStatusBadgeProps {
	isEnabled: boolean
	enabledLabel?: string
	disabledLabel?: string
}

export function AdminStatusBadge({
	isEnabled,
	enabledLabel = 'Enabled',
	disabledLabel = 'Disabled'
}: IAdminStatusBadgeProps) {
	return (
		<Badge
			className={
				isEnabled ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
			}
		>
			{isEnabled ? enabledLabel : disabledLabel}
		</Badge>
	)
}
