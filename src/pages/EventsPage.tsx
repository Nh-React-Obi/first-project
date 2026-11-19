import { EventsHome } from "../components/EventsHome";
import { useOutletContext } from "react-router";
import type { PagesContext } from "../hooks/pagesHook";
const EventsPage = () => {
  const {
    visibleEvents,
    activeCategories,
    toggleCategory,
    setShowModal,
    setSelectedEvent,
  } = useOutletContext<PagesContext>();
  return (
    <>
      <EventsHome
        events={visibleEvents}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        onCreate={() => setShowModal(true)}
        onSelectEvent={setSelectedEvent}
      />
    </>
  );
};

export default EventsPage;
