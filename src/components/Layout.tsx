import type { ReactNode } from 'react'
import { Icon } from './Icon'

export type Page = 'calendar' | 'events'

export function Layout({ page, onNavigate, search, onSearch, children }: {
  page: Page
  onNavigate: (page: Page) => void
  search: string
  onSearch: (value: string) => void
  children: ReactNode
}) {
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">w</div><div><strong>wellspring<span>.</span></strong><small>BOTTLING CO.</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Workspace">
        <button className={page === 'calendar' ? 'active' : ''} aria-current={page === 'calendar' ? 'page' : undefined} onClick={() => onNavigate('calendar')}><Icon name="calendar" /> Calendar</button>
        <button className={page === 'events' ? 'active' : ''} aria-current={page === 'events' ? 'page' : undefined} onClick={() => onNavigate('events')}><Icon name="events" /> Events</button>
      </nav>
      <div className="side-note"><Icon name="sparkle" /><div><strong>Better days, bottled.</strong><p>A little planning goes a long way.</p></div></div>
      <div className="sidebar-bottom"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Operations manager</small></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{page === 'calendar' ? 'Calendar' : 'Events'}</strong></div><label className="search"><Icon name="search" size={17} /><input placeholder="Search events..." aria-label="Search events" value={search} onChange={(event) => onSearch(event.target.value)} /></label></header>
      <div className="page-content">{children}<footer className="page-footer"><span>MADE FOR THE WAY YOU WORK</span><span>Wellspring Bottling Co. &nbsp; ✳</span></footer></div>
    </main>
  </div>
}

export function PageHeading({ title, description, onCreate }: { title: string; description: string; onCreate: () => void }) {
  return <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR WORKSPACE</div><h1>{title}<span>.</span></h1><p>{description}</p></div><button className="primary-button" onClick={onCreate}><Icon name="plus" /> Create event</button></div>
}
