import React from 'react';
import classnames from 'classnames';

const Path = ({
  path, cost, selected, onClick,
}) => (
  <div onClick={onClick} className={classnames('path', { selected })}>
    <div className="cities">
      {path.map(({ from, to }, i) => {
        if (path.length - 1 === i) {
          return [<div> {from.name} - </div>, <div> {to.name} </div>];
        }
        return <div> {from.name} - </div>;
      })}
    </div>
    <div> cost: {cost} </div>
  </div>
);

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
