import React, { Component, useState } from 'react';
// import Card from './cards.jsx';
import Search from './search.jsx';

const App = () => {
  // const [card, setCard] = useState({});

  return (
    <div>
      <h1>Welcome to my trash!</h1>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default App;
