import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../../layout/footer/Footer';
import { registerUser } from '../../../redux/actions/userActions';
import Navbar from '../../navbar/Navbar';
import TextFieldGroup from '../../ui/text-field-group/TextFieldGroup';
import { REGISTER } from '../../../constants';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  handleChange = (ev) => {
    const { name, email, password, passwordConfirmation, value } = ev.target;
    this.setState({
      [name]: value,
      [email]: value,
      [password]: value,
      [passwordConfirmation]: value,
    });
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const { registerUser, history } = this.props;
    const { username, email, password, passwordConfirmation } = this.state;

    const newUser = {
      name: username,
      email,
      password,
      passwordConfirmation,
    };

    registerUser(newUser, history);

    this.setState((prevState) => ({
      username: (prevState.username = ''),
      email: (prevState.email = ''),
      password: (prevState.password = ''),
      passwordConfirmation: (prevState.passwordConfirmation = ''),
    }));
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    const { errors } = this.props;
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="auth-block">
            <form className="card" onSubmit={this.handleSubmit}>
              <div className="card-content">
                <span className="card-title">{REGISTER.TITLE}</span>
                <TextFieldGroup
                  placeholder="Ім'я:"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  error={errors ? errors.name : ''}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email:"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors ? errors.email : ''}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Пароль:"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  error={errors ? errors.password : ''}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Підтвердження пароля:"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                  error={errors ? errors.passwordConfirmation : ''}
                />
              </div>
              <div className="card-action">
                <button className="modal-action btn waves-effect">{REGISTER.BTN}</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  errors: state.user.user,
});

export default connect(mapStateToProps, { registerUser })(Register);
