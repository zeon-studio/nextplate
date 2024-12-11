/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

// Define an interface for Tab props
interface TabProps {
  name: string;
  children: ReactNode;
}

// Extend ReactElement to include our custom props
type TabElement = ReactElement<TabProps>;

function Tabs({ children }: { children: TabElement[] }) {
  const [active, setActive] = useState(0);
  const tabItemsRef = useRef<(HTMLElement | null)[]>([]);
  const [defaultFocus, setDefaultFocus] = useState(false);

  useEffect(() => {
    if (defaultFocus) {
      tabItemsRef.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);

  // Typed handleKeyDown
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
              tabItemsRef.current[index] = ref;
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
