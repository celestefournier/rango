import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Main/Login';
import Categories from './components/Main/Categories';
// import Restaurants from './components/Main/Restaurants';

const token = '';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>

        <main>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Categories} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;