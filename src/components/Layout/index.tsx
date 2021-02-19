import React from 'react';

import './styles.css';

import NavBar from '../NavBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
