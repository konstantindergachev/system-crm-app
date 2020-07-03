// import M from 'materialize-css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../../layout/footer/Footer';
import { loginUser } from '../../../redux/actions/userActions';
import Navbar from '../../navbar/Navbar';
import InfoModal from '../../ui/modal/info-modal/InfoModal';
import TextFieldGroup from '../../ui/text-field-group/TextFieldGroup';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowed: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  componentDidMount() {
    this.isShowedTimer = setTimeout(() => {
      this.setState((oldState) => ({ isShowed: !oldState.isShowed }));
      this.isShowedTimer = 0;
    }, 2500);
  }

  componentWillUnmount() {
    if (this.isShowedTimer) {
      clearTimeout(this.isShowedTimer);
      this.isShowedTimer = 0;
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  handleSubmit = (ev) => {
    const { history } = this.props;
    ev.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, history);
  };
  render() {
    const { isShowed } = this.state;
    const { info, errors } = this.props;
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="auth-block">
            {!isShowed && info !== '' && <InfoModal info={info} />}
            {/* {info !== '' && M.toast({ html: 'I am a toast!' })} */}
            <form className="card" onSubmit={this.handleSubmit}>
              <div className="card-content">
                <span className="card-title">Войти в систему</span>
                <TextFieldGroup
                  type="email"
                  placeholder="Email:"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Пароль:"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
              </div>
              <div className="card-action">
                <button className="modal-action btn waves-effect">Войти</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.protoTypes = {
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  info: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.user.info,
  errors: state.user.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
