import { Icon } from "../components/Icon";
import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import styles from "../components/Event.module.css";
import { EventDetails, EventModal } from "../components/EventModal";
import { usePages } from "../hooks/pagesHook";

export function Layout() {
  const [activePage, setActivePage] = useState<string>("calendar");
  const pageState = usePages();

  const navItems = [
    { name: "home", label: "Home", path: "/" },
    {
      name: "calendar",
      label: "Calendar",
      // icon: "calendar",
      path: "/calendar",
    },
    { name: "events", label: "Events", icon: "events", path: "/events" },

    { name: "build", label: "build", path: "/build" },
    { name: "order", label: "order", path: "/order" },
    {name: 'sales', label: "sales", path:"/sales"}
  ];
  return (
    <div className={styles["app-shell"]}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles["brand-mark"]}>w</div>
          <div>
            <strong>
              wellspring<span>.</span>
            </strong>
            <small>BOTTLING CO.</small>
          </div>
        </div>
        <div className={styles["workspace-label"]}>WORKSPACE</div>
        <nav className={styles["side-nav"]} aria-label="Workspace">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles["side-nav-button"]}`
                  : `${styles["side-nav-button"]}`
              }
              onClick={() => setActivePage(item.name)}
            >
              {item.icon && <Icon name={item.icon} />} {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles["side-note"]}>
          <Icon name="sparkle" />
          <div>
            <strong>Better days, bottled.</strong>
            <p>A little planning goes a long way.</p>
          </div>
        </div>
        <div className={styles["sidebar-bottom"]}>
          <div className={styles.avatar}>JD</div>
          <div>
            <strong>Jordan Davis</strong>
            <small>Operations manager</small>
          </div>
        </div>
      </aside>
      <main className={styles["main-content"]}>
        <div className={styles["page-content"]}>
          <Outlet context={pageState} />
          <footer className={styles["page-footer"]}>
            <span>MADE FOR THE WAY YOU WORK</span>
            <span>Wellspring Bottling Co. &nbsp; ✳</span>
          </footer>
        </div>
      </main>
      {pageState.showModal && (
        <EventModal
          initialDate={pageState.selectedDate}
          onClose={() => pageState.setShowModal(false)}
          onSave={pageState.saveEvent}
        />
      )}
      {pageState.selectedEvent && (
        <EventDetails
          event={pageState.selectedEvent}
          onClose={() => pageState.setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export function PageHeading({
  title,
  description,
  onCreate,
}: {
  title: string;
  description: string;
  onCreate: () => void;
}) {
  return (
    <div className={styles["page-heading"]}>
      <div>
        <div className={styles.eyebrow}>
          <span className={styles["eyebrow-dot"]} /> YOUR WORKSPACE
        </div>
        <h1>
          {title}
          <span>.</span>
        </h1>
        <p>{description}</p>
      </div>
      <button className={styles["primary-button"]} onClick={onCreate}>
        <Icon name="plus" /> Create event
      </button>
    </div>
  );
}
