import { CategoryFilter } from '../components/CategoryFilter'
import { EventCard } from '../components/EventCard'
import { PageHeading } from '../components/Layout'
import type { CalendarEvent, Category } from '../events'
import styles from './Event.module.css'

export function EventsHome({ events, activeCategories, onToggleCategory, onCreate, onSelectEvent }: {
  events: CalendarEvent[]
  activeCategories: Category[]
  onToggleCategory: (category: Category) => void
  onCreate: () => void
  onSelectEvent: (event: CalendarEvent) => void
}) {
  const sortedEvents = [...events].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
  return <>
    <PageHeading title="Events" description="All your operations, together in one place." onCreate={onCreate} />
    <div className={styles["content-grid"]}>
      <section className={styles["side-card"] + " " + styles["events-list"]}>
        <div className={styles['card-title-row']}><div><div className={styles['section-kicker']}>YOUR OPERATIONS</div><h2>All events <span className={styles['event-count']}>{sortedEvents.length} events</span></h2></div></div>
        <p className={styles['card-description']}>Select an event to see its details.</p>
        {sortedEvents.length ? sortedEvents.map((event) => <EventCard key={event.id} event={event} onSelect={onSelectEvent} showDate />) : <div className={styles['empty-day']}><strong>No events found.</strong><p>Try changing your search or filters, or create a new event.</p></div>}
      </section>
      <aside className={styles["right-column"]}><CategoryFilter activeCategories={activeCategories} onToggle={onToggleCategory} /></aside>
    </div>
  </>
}
