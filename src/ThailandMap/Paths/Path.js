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

export default Path;
