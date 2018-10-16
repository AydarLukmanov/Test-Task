import React from 'react';
import Path from './Path';

const Paths = ({
  start, end, paths, selectedPath, selectPath,
}) => {
  if (!start || !end) {
    return 'Please select cities';
  }
  return (
    <div>
      <div>Start: {start.name} </div>
      <div>End: {end.name} </div>
      { paths.length === 0 && 'No such route'}
      { paths.length === 1 && 'One route found'}
      { paths.length > 1 && `${paths.length} routes found`}
      {paths
        .map((path, index) => ({
          path,
          cost: path.reduce((sum, { cost }) => cost + sum, 0),
          index,
        }))
        .sort(({ cost: costA }, { cost: costB }) => (costA > costB ? 1 : -1))
        .map(({ path, cost, index }) => (
          <Path
            onClick={() => selectPath(index)}
            selected={selectedPath === index}
            path={path}
            cost={cost}
          />
        ))}
    </div>
  );
};

export default Paths;
