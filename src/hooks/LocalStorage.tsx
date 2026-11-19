import { useState } from 'react'
import type { CalendarEvent } from '../events'

function getStoredItem<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  return item === null ? null : JSON.parse(item) as T
}

const UseLocalStorage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(
    () => getStoredItem<CalendarEvent[]>('events') ?? [],
  )
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const setItem = (key: string, value: CalendarEvent[]) => {
    localStorage.setItem(key, JSON.stringify(value))
    if (key === 'events') setEvents(value)
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
    if (key === 'events') setEvents([])
  }

  return {
    events,
    setEvents,
    selectedEvent,
    setSelectedEvent,
    getItem: getStoredItem,
    setItem,
    removeItem
  }
}

export default UseLocalStorage