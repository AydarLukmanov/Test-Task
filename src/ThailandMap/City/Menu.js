import React, { PureComponent } from 'react';
import classnames from 'classnames';

const Menu = ({ setStart, setEnd, onClose }) => (
  <div className="menu">
    <button
      onClick={() => {
        setStart();
        onClose();
      }}
    >
      start
    </button>
    <button
      onClick={() => {
        setEnd();
        onClose();
      }}
    >
      end
    </button>
  </div>
);

export default Menu;
