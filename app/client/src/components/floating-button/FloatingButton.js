import M from 'materialize-css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <i className="large material-icons">add</i>
        </Link>
        <ul>
          <li>
            <Link to="/order" className="btn-floating green">
              <i className="material-icons">assignment</i>
            </Link>
          </li>
          <li>
            <Link to="/categories/new" className="btn-floating blue">
              <i className="material-icons">list</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FloatingButton;
