import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MainView from './views/MainView/MainView';

function App() {
  const [view, setView] = useState(<MainView />);

  return view;
}

export default App;
