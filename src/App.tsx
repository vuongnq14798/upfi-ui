import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useParams, Redirect } from 'react-router-dom';
import StableCoin from './screens/stablecoin/StableCoin';

function App() {
  return (
    <Router>
      <div className='app'>
        <div className='main'>
          <div className='page'>
            <div className='content'>
              <Switch>
                <Route path={'/stablecoin'} component={StableCoin} />
                <Redirect from='/' to={'/stablecoin'} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
