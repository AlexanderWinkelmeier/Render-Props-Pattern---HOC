import { useState } from "react";

// Erweiterungskomponente (HOC) mit Toggles
// die WrappedComponent wird mit Toggles erweitert
export default function withToggles(WrappedComponent) {
  // gibt eine erweiterte Component-Function zurueck
  return function List(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {/* hier wird die WrappedComponent eingefügt und alle ihre props  (bei ProductsList (siehe unter Apps.js) title und items ), zudem wird das items-prop angefügt */}
        {isOpen && <WrappedComponent {...props} items={displayItems} />}

        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );
  };
}
