export const getNumberOfItemsThatFit = (outerWidth, itemWidth) => {
  const gap = 8;
  const totalItemWidth = itemWidth + gap;

  const numberOfItems = Math.floor(outerWidth / totalItemWidth);

  return numberOfItems;
};
