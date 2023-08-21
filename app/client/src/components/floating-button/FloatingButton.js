import M from 'materialize-css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FLOATING_BTN } from '../../constants';

import './FloatingButton.scss';

class FloatingButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }
  componentDidMount() {
    M.FloatingActionButton.init(this.buttonRef.current);
  }
  render() {
    return (
      <div className="fixed-action-btn" ref={this.buttonRef}>
        <Link to="/overview" className="btn-floating btn-large red">
          <i className="large material-icons">{FLOATING_BTN.ADD}</i>
        </Link>
        <ul>
          <li>
            <Link to="/order" className="btn-floating green">
              <i className="material-icons">{FLOATING_BTN.ASSIGNMENT}</i>
            </Link>
          </li>
          <li>
            <Link to="/categories/new" className="btn-floating blue">
              <i className="material-icons">{FLOATING_BTN.LIST}</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FloatingButton;
