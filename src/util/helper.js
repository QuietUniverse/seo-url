export const formatBlanks = function (value) {
  return value !== null || undefined ? value + "" : "Not found";
};

export const isObject = function (value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const pastelColors = [
  { backgroundColor: "#daefff", color: "#3d759d" },
  { backgroundColor: "#ffeefa", color: "#ff5fd1" },
  { backgroundColor: "#eaffd6", color: "#669347" },
  { backgroundColor: "#fff7e6", color: "#ffa613" },
  { backgroundColor: "#f8f0ff", color: "#9250d0" },
  { backgroundColor: "#ffecec", color: "#ff5341" },
  { backgroundColor: "#e2fffc", color: "#16c2a8" },
];

export const getRandomColor = function () {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

export const getDifferentRandomColors = function (num) {
  let count = 0;
  const colorsArr = [];
  while (count !== num) {
    const randomColor = getRandomColor();
    if (!colorsArr.includes(randomColor)) {
      colorsArr.push(randomColor);
      count++;
    }
  }

  return colorsArr;
};

export const hexToRGB = function (hex) {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
};
