import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {UIShell} from "./components";
import {ScoreboardControlView, ScoreboardView} from "./views";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UIShell />}>
          <Route index element={<ScoreboardView />} />
          <Route path="control" element={<ScoreboardControlView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
