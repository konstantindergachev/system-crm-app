import React from 'react';
import Logo from '../../components/logo/Logo';
import Navbar from '../../components/navbar/Navbar';

import './Header.scss';

const Header = () => {
  return (
    <header className="nav-wrapper">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
