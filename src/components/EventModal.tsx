import { useState } from 'react'
import type { FormEvent } from 'react'
import { categories, categoryColors, dateFromKey, formatTime } from '../events'
import type { CalendarEvent, Category } from '../events'
import { Icon } from './Icon'

export function EventModal({ onClose, onSave, initialDate }: { onClose: () => void; onSave: (event: Omit<CalendarEvent, 'id'>) => void; initialDate: string }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState('09:00')
  const [category, setCategory] = useState<Category>('Production')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !location.trim()) {
      setError('Please enter an event name and location.')
      return
    }
    onSave({ title: title.trim(), date, time, category, location: location.trim() })
  }

  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="modal-heading"><div><span className="eyebrow">MAKE A PLAN</span><h2 id="modal-title">Create an event</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div>
    <form onSubmit={submit}>
      <label>Event name<input autoFocus required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Production planning" /></label>
      <div className="form-row"><label>Date<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Time<input required type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label></div>
      <label>Category<select value={category} onChange={(event) => setCategory(event.target.value as Category)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Location<input required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Production Line A" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create event</button></div>
    </form>
  </section></div>
}

export function EventDetails({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(click) => click.stopPropagation()}>
    <div className="modal-heading"><span className={`category-label ${categoryColors[event.category]}`}>{event.category}</span><button className="icon-button" aria-label="Close details" onClick={onClose}><Icon name="close" /></button></div>
    <h2 id="detail-title">{event.title}</h2>
    <p><Icon name="calendar" /> {dateFromKey(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
    <p><Icon name="clock" /> {formatTime(event.time)}</p>
    <p><Icon name="pin" /> {event.location}</p>
  </section></div>
}
