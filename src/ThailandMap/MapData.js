export const citiesMap = {
  A: {
    name: '(A) Bangkok',
    lat: 13.7563,
    lng: 100.5018,
  },
  B: {
    name: '(B) Pattaya',
    lat: 12.9236,
    lng: 100.8825,
  },
  C: {
    name: '(C) Chiang Mai',
    lat: 18.7061,
    lng: 98.9817,
  },
  D: {
    name: '(D) Phitsanulok',
    lat: 16.8211,
    lng: 100.2659,
  },
  E: {
    name: '(E) Khon Kaen',
    lat: 16.4322,
    lng: 102.8236,
  },
  F: {
    name: '(F) Chumphon Province',
    lat: 10.493,
    lng: 99.18,
  },
};

const exampleRoads = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1';

export const roads = exampleRoads.split(', ').map((str) => {
  const from = citiesMap[str[0]];
  const to = citiesMap[str[1]];
  const cost = parseInt(str[2], 10);
  return {
    from,
    to,
    cost,
  };
});

export const getAllPossiblePaths = (start, end, edges) => {
  const allPaths = [];
  const generatePath = (path = [], currentCity = start) => {
    for (const edge of edges) {
      if (currentCity === edge.from && !path.includes(edge)) {
        if (edge.to === end) {
          allPaths.push([...path, edge]);
        } else {
          generatePath([...path, edge], edge.to);
        }
      }
    }
  };
  generatePath();

  return allPaths;
};
