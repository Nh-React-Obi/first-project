import { useMemo, useState } from 'react'
import { EventModal, EventDetails } from './components/EventModal'
import { Layout, type Page } from './components/Layout'
 import { CalendarPage } from './pages/CalendarPage'
import { EventsPage } from './pages/EventsPage'
import { categories, dateFromKey, dateKey, makeInitialEvents } from './events'
import type { CalendarEvent, Category } from './events'
import './App.css'

function App() {
  const [today] = useState(() => new Date())
  const [page, setPage] = useState<Page>('calendar')
  const [events, setEvents] = useState(() => makeInitialEvents(today))
  const [selectedDate, setSelectedDate] = useState(() => dateKey(today))
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [activeCategories, setActiveCategories] = useState<Category[]>(categories)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const visibleEvents = useMemo(() => events.filter((event) =>
    activeCategories.includes(event.category) &&
    `${event.title} ${event.location}`.toLowerCase().includes(search.trim().toLowerCase()),
  ), [events, activeCategories, search])

  function toggleCategory(category: Category) {
    setActiveCategories((current) => current.includes(category)
      ? current.filter((item) => item !== category)
      : [...current, category])
  }

  function saveEvent(event: Omit<CalendarEvent, 'id'>) {
    setEvents((current) => [...current, { ...event, id: Math.max(0, ...current.map((item) => item.id)) + 1 }])
    const date = dateFromKey(event.date)
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    setSelectedDate(event.date)
    setShowModal(false)
  }

  return (
    <Layout page={page} onNavigate={setPage} search={search} onSearch={setSearch}>
        {/* <CalendarPage
          today={today}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          events={visibleEvents}
          activeCategories={activeCategories}
          onToggleCategory={toggleCategory}
          onCreate={() => setShowModal(true)}
          onSelectEvent={setSelectedEvent}
          /> */}
        <EventsPage
          events={visibleEvents}
          activeCategories={activeCategories}
          onToggleCategory={toggleCategory}
          onCreate={() => setShowModal(true)}
          onSelectEvent={setSelectedEvent}
          />
        {showModal && <EventModal initialDate={selectedDate} onClose={() => setShowModal(false)} onSave={saveEvent} />}
        {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </Layout>
  )
}

export default App
