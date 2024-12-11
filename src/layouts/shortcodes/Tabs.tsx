"use client";

import React, {
  KeyboardEvent,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

// Define an interface for the Tab props
interface TabProps {
  name: string;
  children: React.ReactNode;
}

function Tabs({ children }: { children: ReactElement<TabProps>[] }) {
  const [active, setActive] = useState(0);
  const tabItemsRef: RefObject<HTMLElement[]> = useRef([]);
  const [defaultFocus, setDefaultFocus] = useState(false);

  useEffect(() => {
    if (defaultFocus) {
      tabItemsRef.current?.[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active, defaultFocus]);

  // Change tab item on key down
  const handleKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % children.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + children.length) % children.length);
    }
  };

  return (
    <div className="tab">
      <ul className="tab-nav" role="tablist">
        {children.map((item, index) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active ? "active" : ""}`}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(ref) => {
              if (ref) {
                const current = tabItemsRef.current || [];
                current[index] = ref;
                tabItemsRef.current = current;
              }
            }}
          >
            {item.props.name}
          </li>
        ))}
      </ul>

      {children.map((data, index) => (
        <div
          key={index}
          className={`tab-content ${index === active ? "block" : "hidden"}`}
        >
          {data.props.children}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
