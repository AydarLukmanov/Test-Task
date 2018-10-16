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

class City extends PureComponent {
  state = { menu: false };

  toggleMenu = () => this.setState({ menu: !this.state.menu });

  closeMenu = () => this.setState({ menu: false });

  render() {
    const {
      name, inactive, start, end, setStart, setEnd,
    } = this.props;
    const { menu } = this.state;
    return (
      <div className={classnames('city', { inactive, start, end })}>
        <div onClick={this.toggleMenu}>{name}</div>
        {menu && <Menu setStart={setStart} setEnd={setEnd} onClose={this.closeMenu} />}
      </div>
    );
  }
}

export default City;
