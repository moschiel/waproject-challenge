import { useContext } from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { MyContext } from './context/MyContext';

function App() {
  const { view } = useContext(MyContext);

  return (
    <div className="App">
      {view}
    </div>
  );
}

export default App;
