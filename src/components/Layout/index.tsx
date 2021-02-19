import React from 'react';

import './styles.css';

import NavBar from '../NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
