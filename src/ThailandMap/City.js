import React from 'react';
import classnames from 'classnames';

const City = ({
  name, inactive, start, end,
}) => (
  <div className={classnames('city', { inactive, start, end })}>{name}</div>
);

export default City;
