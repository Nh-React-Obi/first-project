import { CategoryFilter } from './CategoryFilter'
import { EventCard } from './EventCard'
import { Icon } from './Icon'
import { PageHeading } from './Layout'
import { categoryColors, dateFromKey, dateKey } from '../events'
import type { CalendarEvent, Category } from '../events'
import styles from './Event.module.css'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type Props = {
  today: Date
  currentMonth: Date
  onMonthChange: (month: Date) => void
  selectedDate: string
  onSelectDate: (date: string) => void
  events: CalendarEvent[]
  activeCategories: Category[]
  onToggleCategory: (category: Category) => void
  onCreate: () => void
  onSelectEvent: (event: CalendarEvent) => void
}

export function CalendarHome({ today, currentMonth, onMonthChange, selectedDate, onSelectDate, events, activeCategories, onToggleCategory, onCreate, onSelectEvent }: Props) {
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const firstCell = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1 - monthStart.getDay())
  const cellCount = Math.ceil((monthStart.getDay() + new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()) / 7) * 7
  const days = Array.from({ length: cellCount }, (_, index) => new Date(firstCell.getFullYear(), firstCell.getMonth(), firstCell.getDate() + index))
  const monthEvents = events.filter((event) => {
    const date = dateFromKey(event.date)
    return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
  })
  const selectedEvents = events.filter((event) => event.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time))

  function changeMonth(offset: number) {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
  }

  function goToday() {
    onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1))
    onSelectDate(dateKey(today))
  }

  return <>
    <PageHeading title="Calendar" description="Keep everything flowing, one day at a time." onCreate={onCreate} />
    <div className={styles['intro-strip']}><div className={styles['intro-icon']}><Icon name="sparkle" size={20} /></div><div><strong>A little more organized, a lot more in flow.</strong><p>Here's what's happening across your operations.</p></div><span className={styles['intro-decoration']}>✳</span></div>
    <div className={styles['content-grid']}>
      <section className={styles['calendar-card']}>
        <div className={styles['calendar-header']}><div><div className={styles['section-kicker']}>THE BIG PICTURE</div><h2>Calendar <span className={styles['event-count']}>{monthEvents.length} events</span></h2></div><div className={styles['calendar-controls']}><button className={styles['today-button']} onClick={goToday}>Today</button><div className={styles['month-arrows']}><button aria-label="Previous month" onClick={() => changeMonth(-1)}><Icon name="left" /></button><button aria-label="Next month" onClick={() => changeMonth(1)}><Icon name="right" /></button></div></div></div>
        <div className={styles['calendar-subheader']}><h3>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3><span><span className={styles['eyebrow-dot']} /> MONTH VIEW</span></div>
        <div className={styles['calendar-scroll']}><div className={styles['calendar-grid']}><div className={styles.weekdays}>{weekdays.map((day) => <div key={day}>{day}</div>)}</div><div className={styles.days}>{days.map((day) => {
          const key = dateKey(day)
          const dayEvents = events.filter((event) => event.date === key)
          return <div key={key} className={[styles['day-cell'], day.getMonth() !== currentMonth.getMonth() ? styles.outside : '', selectedDate === key ? styles.selected : ''].filter(Boolean).join(' ')} onClick={() => onSelectDate(key)}>
            <button className={[styles['day-number'], key === dateKey(today) ? styles['is-today'] : ''].filter(Boolean).join(' ')} aria-label={`Select ${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`} onClick={() => onSelectDate(key)}>{day.getDate()}</button>
            <div className={styles['day-events']}>{dayEvents.slice(0, 2).map((event) => <button key={event.id} className={`${styles['calendar-event']} ${styles[categoryColors[event.category]]}`} onClick={(click) => { click.stopPropagation(); onSelectDate(key); onSelectEvent(event) }}><span />{event.title}</button>)}{dayEvents.length > 2 && <span className={styles['more-events']}>+{dayEvents.length - 2} more</span>}</div>
          </div>
        })}</div></div></div>
        <div className={styles['calendar-footer']}><div><span className={styles['today-legend']} /> Today</div><span>Click a date to see what's planned</span></div>
      </section>
      <aside className={styles['right-column']}>
        <section className={styles['side-card']}><div className={styles['card-title-row']}><div><div className={styles['section-kicker']}>STAY IN THE LOOP</div><h2>On the schedule</h2></div><div className={styles['outlined-icon']}><Icon name="calendar" /></div></div><p className={styles['card-description']}>Your plans at a glance.</p><div className={styles['selected-date']}><span>{dateFromKey(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span><span>{selectedEvents.length} {selectedEvents.length === 1 ? 'EVENT' : 'EVENTS'}</span></div><div className={styles['schedule-list']}>{selectedEvents.length ? selectedEvents.map((event) => <EventCard key={event.id} event={event} onSelect={onSelectEvent} />) : <div className={styles['empty-day']}><strong>A little breathing room.</strong><p>No events planned for this day.</p><button onClick={onCreate}>+ Add an event</button></div>}</div></section>
        <CategoryFilter activeCategories={activeCategories} onToggle={onToggleCategory} />
      </aside>
    </div>
  </>
}
