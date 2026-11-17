import { categories, categoryColors } from '../events'
import type { Category } from '../events'

interface CategoryFilterProps {
  activeCategories: Category[]
  onToggle: (category: Category) => void
}

export function CategoryFilter({ activeCategories, onToggle }: CategoryFilterProps) {
  return <section className="side-card filter-card"><div className="section-kicker">MAKE IT YOURS</div><h2>Filter by category</h2><p className="card-description">Focus on what matters to you.</p><div className="filter-list">{categories.map((category) => <label key={category}><span><i className={`filter-dot ${categoryColors[category]}`} />{category}</span><input type="checkbox" checked={activeCategories.includes(category)} onChange={() => onToggle(category)} /></label>)}</div></section>
}
