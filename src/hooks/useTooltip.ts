import { useEffect } from "react";

// tooltip
const useTooltip = () => {
  useEffect(() => {
    const tooltipEl = document.querySelectorAll(".tooltip");
    if (tooltipEl) {
      const tooltipItems = document.querySelectorAll(".tooltip-label");
      tooltipItems.forEach((item) => {
        item.remove();
      });
      const length = tooltipEl.length;
      for (let i = 0; i < length; i++) {
        const attr = tooltipEl[i].getAttribute("data-tooltip") || "";
        const x = document.createElement("SPAN");
        const t = document.createTextNode(attr);
        x.appendChild(t);
        x.className = "tooltip-label";
        tooltipEl[i].appendChild(x);
      }
    }
  });
};

export default useTooltip;
