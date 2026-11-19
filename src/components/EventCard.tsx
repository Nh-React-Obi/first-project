import { categoryColors, dateFromKey, formatTime } from '../events'
import type { CalendarEvent } from '../events'
import { Icon } from './Icon'

interface EventCardProps {
  event: CalendarEvent
  onSelect: (event: CalendarEvent) => void
  showDate?: boolean
}

export function EventCard({ event, onSelect, showDate = false }: EventCardProps) {
  return <button className="schedule-item" onClick={() => onSelect(event)}>
    <span className={`schedule-line ${categoryColors[event.category]}`} />
    <span className="schedule-content">
      <span className={`category-label ${categoryColors[event.category]}`}>{event.category}</span>
      <strong>{event.title}</strong>
      {showDate && <span><Icon name="calendar" size={14} /> {dateFromKey(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>}
      <span><Icon name="clock" size={14} /> {formatTime(event.time)}</span>
      <span><Icon name="pin" size={14} /> {event.location}</span>
    </span>
    <Icon name="right" size={16} />
  </button>
}
