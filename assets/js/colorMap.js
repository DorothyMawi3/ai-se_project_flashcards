export function hexToString(hex) {
  const colorMap = {
    "#64d583": "green",
    "#91a8f9": "blue",
    "#ee92d7": "pink",
    "#aa8ef0": "purple",
    "#ee955e": "orange",
    "#f5d770": "yellow",
  };

  return colorMap[hex.toLowerCase()];
}

export function removeColorClasses(element) {
  element.classList.forEach((className) => {
    if (className.includes("_color_")) {
      element.classList.remove(className);
    }
  });
}