import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/LocalStorage";
import { categories, dateFromKey, dateKey } from "../events";
import type { CalendarEvent, Category, Page } from "../events";

export const usePages = () => {
  const [today] = useState(() => new Date());
  const [page, setPage] = useState<Page>("calendar");
  const [selectedDate, setSelectedDate] = useState(() => dateKey(today));
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [activeCategories, setActiveCategories] =
    useState<Category[]>(categories);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const { setItem, events, setEvents } = useLocalStorage();

  const visibleEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          activeCategories.includes(event.category) &&
          `${event.title} ${event.location}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
      ),
    [events, activeCategories, search],
  );

  function toggleCategory(category: Category) {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function saveEvent(event: Omit<CalendarEvent, "id">) {
    const updatedEvents = [
      ...events,
      { ...event, id: Math.max(0, ...events.map((item) => item.id)) + 1 },
    ];
    const date = dateFromKey(event.date);
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setSelectedDate(event.date);
    setShowModal(false);
    setItem("events", updatedEvents);
  }

  return {
    today,
    page,
    events,
    selectedDate,
    currentMonth,
    activeCategories,
    search,
    showModal,
    selectedEvent,
    setPage,
    setEvents,
    setSelectedDate,
    setCurrentMonth,
    setActiveCategories,
    setSearch,
    setShowModal,
    setSelectedEvent,
    saveEvent,
    toggleCategory,
    visibleEvents,
  };
};

export type PagesContext = ReturnType<typeof usePages>;
