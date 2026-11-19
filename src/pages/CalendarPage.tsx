import { useOutletContext } from 'react-router'
import type { PagesContext } from '../components/pagesHook'
import { CalendarHome } from '../components/CalendarHome'

const CalendarPage = () => {
  const {today, currentMonth, setCurrentMonth, selectedDate, setSelectedDate, visibleEvents, activeCategories, toggleCategory, setShowModal, setSelectedEvent} = useOutletContext<PagesContext>()

  return (
    <>
      <CalendarHome
        today={today}
        currentMonth={currentMonth}
        onMonthChange={(current) => setCurrentMonth(current)}
        selectedDate={selectedDate}
        onSelectDate={(e) =>setSelectedDate(e)}
        events={visibleEvents}
        activeCategories={activeCategories}
        onToggleCategory={(category) => toggleCategory(category)}
        onCreate={() => setShowModal(true)}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
    </>
  )
}

export default CalendarPage