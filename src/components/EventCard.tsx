import { categoryColors, dateFromKey, formatTime } from "../data/events";
import type { CalendarEvent } from "../data/events";
import { Icon } from "./Icon";
import styles from "./Event.module.css";

interface EventCardProps {
  event: CalendarEvent;
  onSelect: (event: CalendarEvent) => void;
  showDate?: boolean;
}

export function EventCard({
  event,
  onSelect,
  showDate = false,
}: EventCardProps) {
  return (
    <button className={styles["schedule-item"]} onClick={() => onSelect(event)}>
      <span
        className={`${styles["schedule-line"]} ${styles[categoryColors[event.category]]}`}
      />
      <span className={styles["schedule-content"]}>
        <span
          className={`${styles["category-label"]} ${styles[categoryColors[event.category]]}`}
        >
          {event.category}
        </span>
        <strong>{event.title}</strong>
        {showDate && (
          <span>
            <Icon name="calendar" size={14} />{" "}
            {dateFromKey(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
        <span>
          <Icon name="clock" size={14} /> {formatTime(event.time)}
        </span>
        <span>
          <Icon name="pin" size={14} /> {event.location}
        </span>
      </span>
      <Icon name="right" size={16} />
    </button>
  );
}
