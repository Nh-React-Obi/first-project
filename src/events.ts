export type Category = 'Production' | 'Maintenance' | 'Delivery' | 'Meeting'
export type CalendarEvent = {
  id: number
  title: string
  date: string
  time: string
  category: Category
  location: string
}

export const categories: Category[] = ['Production', 'Maintenance', 'Delivery', 'Meeting']
export const categoryColors: Record<Category, string> = {
  Production: 'green',
  Maintenance: 'orange',
  Delivery: 'blue',
  Meeting: 'purple',
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function dateFromKey(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
}

export function makeInitialEvents(today: Date): CalendarEvent[] {
  const day = (n: number) => dateKey(new Date(today.getFullYear(), today.getMonth(), n))
  return [
    { id: 1, title: 'Spring water production', date: day(3), time: '08:00', category: 'Production', location: 'Production Line A' },
    { id: 2, title: 'Weekly team sync', date: day(5), time: '10:00', category: 'Meeting', location: 'Meeting Room 2' },
    { id: 3, title: 'Equipment inspection', date: day(7), time: '09:00', category: 'Maintenance', location: 'Production Floor' },
    { id: 4, title: 'Label & packaging run', date: day(10), time: '08:30', category: 'Production', location: 'Production Line B' },
    { id: 5, title: 'North region shipment', date: day(12), time: '11:00', category: 'Delivery', location: 'Loading Dock 1' },
    { id: 6, title: 'Quality control review', date: day(14), time: '09:30', category: 'Meeting', location: 'Quality Lab' },
    { id: 7, title: 'Sparkling water batch', date: day(17), time: '08:00', category: 'Production', location: 'Production Line A' },
    { id: 8, title: 'Filler maintenance', date: day(19), time: '13:00', category: 'Maintenance', location: 'Production Line B' },
    { id: 9, title: 'Retail order dispatch', date: day(21), time: '10:00', category: 'Delivery', location: 'Loading Dock 2' },
    { id: 10, title: 'Production planning', date: day(24), time: '14:00', category: 'Meeting', location: 'Meeting Room 1' },
    { id: 11, title: 'Mineral water production', date: day(26), time: '08:00', category: 'Production', location: 'Production Line A' },
    { id: 12, title: 'Warehouse delivery', date: day(28), time: '11:30', category: 'Delivery', location: 'Loading Dock 1' },
  ]
}
