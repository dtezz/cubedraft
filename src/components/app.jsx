import React, { Component, useState } from 'react';
import Search from './search.jsx';
import User from './user.jsx';

const App = () => {
  // const [card, setCard] = useState({});

  return (
    <div>
      <h1>MTG Cube Refining</h1>
      <h2>(current status: a simple card search engine)</h2>
      <div>
        <User />
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default App;
