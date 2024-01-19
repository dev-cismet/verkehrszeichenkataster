export const getNumberOfItemsThatFit = (outerWidth, itemWidth) => {
  const gap = 8;
  const totalItemWidth = itemWidth + gap;

  const numberOfItems = Math.floor(outerWidth / totalItemWidth);

  return numberOfItems;
};

export const getDataTypeFromBase64 = (base64String) => {
  const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,/);

  if (match) {
    const mimeType = match[1].toLowerCase();

    if (mimeType.startsWith("image/")) {
      return "image";
    } else if (mimeType === "application/pdf") {
      return "pdf";
    } else {
      return "other";
    }
  }

  return "other";
};

export const titleCase = (string) => {
  if (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  } else {
    return "";
  }
};

export const compare = (a, b) => {
  if (a === undefined || a === null) {
    a = "";
  }
  if (b === undefined || a === null) {
    b = "";
  }

  return (
    isFinite(b) - isFinite(a) ||
    a - b ||
    (a?.length === b?.length && a.toString().localeCompare(b)) ||
    a?.length - b?.length
  );
};
