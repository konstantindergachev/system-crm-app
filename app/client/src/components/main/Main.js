import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../layout/footer/Footer';
import Navbar from '../navbar/Navbar';
import './Main.scss';

const Main = ({ isAuth, username, logOutClick }) => {
  return (
    <section className="main">
      <Navbar isAuth={isAuth} username={username} logOutClick={logOutClick} />
      <div className="container">
        <h2 className="main__header">
          УОсК <small>(управление отношениями с клиентом)</small>
        </h2>
        <div className="col s12 m5">
          <div className="card-panel grey darken-1">
            <p className="white-text">
              Посмотрите, как мы можем помочь вам зарабатывать в эпоху цифровых
              технологий.
            </p>
            <p className="white-text">
              Оптимизируйте бизнес-процесс Вашего предприятия.
            </p>
            <p className="white-text">
              {' '}
              Наше приложение УОсК дает возможность увеличить
              производительность, сократить расходы и повысить эффективность мер
              по контролю.
            </p>
          </div>
        </div>
        <h4>Как определить, нужна ли мне УОсК</h4>
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel grey darken-1">
              <h5 className="white-text">УОсК для вас, если</h5>
              <p className="white-text">
                У вас есть отдел продаж, и работа с клиентами основана на
                электроных письмах и встречах. Историю общения нужно хранить в
                одном месте, чтобы постоянно привлекать новые лиды и выстраивать
                с ними долгосрочные отношения. Например, УОсК-система идеально
                подойдет для интернет-магазинов или оптовых компаний.
              </p>
            </div>
          </div>
          <div className="col s12 m5">
            <div className="card-panel grey darken-1">
              <h5 className="white-text">УОсК не подойдет, если</h5>
              <p className="white-text">
                Вы владелец розничного магазина, и не заинтересованы в
                выстраивании долгосрочных отношений с клиентами, не звоните и,
                не пишете писем, не отправляете sms-уведомлений. Или же, если вы
                работаете по долгосрочным контрактам, завязанным на личных
                знакомствах. Здесь не поможет ни одна программа, прибыль зависит
                исключительно от опыта менеджера.
              </p>
            </div>
          </div>
        </div>
        {isAuth ? (
          <Link to="/overview" className="waves-effect waves-light btn">
            Обзор
          </Link>
        ) : (
          <Link to="/registration" className="waves-effect waves-light btn">
            Чтобы войти в систему нужно зарегистрироваться
          </Link>
        )}
      </div>
      <Footer />
    </section>
  );
};

Main.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string,
  logOutClick: PropTypes.func.isRequired,
};

export default Main;
