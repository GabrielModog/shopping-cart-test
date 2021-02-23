import React from 'react';

import './styles.css';

const NavBar: React.FC<any> = () => {
  return (
    <nav>
      <div>
        <h3 id="title">Shop It</h3>
      </div>
      <div>
        <h5>John Doe</h5>
      </div>
    </nav>
  );
};

export default NavBar;
