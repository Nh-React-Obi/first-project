import { categories, categoryColors } from "../data/events";
import type { Category } from "../data/events";
import styles from "./Event.module.css";

interface CategoryFilterProps {
  activeCategories: Category[];
  onToggle: (category: Category) => void;
}

export function CategoryFilter({
  activeCategories,
  onToggle,
}: CategoryFilterProps) {
  return (
    <section className={`${styles["side-card"]} ${styles["filter-card"]}`}>
      <div className={styles["section-kicker"]}>MAKE IT YOURS</div>
      <h2>Filter by category</h2>
      <p className={styles["card-description"]}>
        Focus on what matters to you.
      </p>
      <div className={styles["filter-list"]}>
        {categories.map((category) => (
          <label key={category}>
            <span>
              <i
                className={`${styles["filter-dot"]} ${styles[categoryColors[category]]}`}
              />
              {category}
            </span>
            <input
              type="checkbox"
              checked={activeCategories.includes(category)}
              onChange={() => onToggle(category)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
