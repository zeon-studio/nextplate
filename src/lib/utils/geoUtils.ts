export const CALIFORNIA_COORD: [number, number] = [
  34.02963095004345, -117.97370799183287,
];
export const INDIANA_COORD: [number, number] = [
  39.143945003619635, -85.94584495338714,
];

export const calculateCenterCoordinates = (
  coord1: [number, number],
  coord2: [number, number],
): [number, number] => {
  const centerLatitude = (coord1[0] + coord2[0]) / 2;
  const centerLongitude = (coord1[1] + coord2[1]) / 2;
  return [centerLatitude, centerLongitude];
};
