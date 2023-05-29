"use client";

import {
  KeyboardEvent,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

function Tabs({ children }: { children: ReactElement[] }) {
  const [active, setActive] = useState(0);
  //select tabItems
  const tabItemsRef: RefObject<HTMLElement[]> = useRef([]);
  const [defaultFocus, setDefaultFocus] = useState(false);

  useEffect(() => {
    if (defaultFocus) {
      //@ts-ignore
      tabItemsRef.current[active].focus();
    } else {
      setDefaultFocus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  //change tab item on click
  const handleKeyDown = (event: KeyboardEvent<EventTarget>, index: number) => {
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
        {children.map((item: ReactElement, index: number) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active && "active"}`}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            //@ts-ignore
            ref={(ref) => (tabItemsRef.current[index] = ref)}
          >
            {item.props.name}
          </li>
        ))}
      </ul>

      {children.map((data: ReactElement, index: number) => (
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
