import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Main/Login';
import Categories from './components/Main/Categories';
import Restaurants from './components/Main/Restaurants';

function App() {
  const baseRUL = "https://syqkl02isj.execute-api.us-east-1.amazonaws.com/dev";

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>

        <main>
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} baseURL={baseRUL}/>} exact />
            <Route path="/categorias" render={(props) => <Categories {...props} baseURL={baseRUL}/>} exact />
            <Route path="/" render={(props) => <Restaurants {...props} baseURL={baseRUL}/>} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;