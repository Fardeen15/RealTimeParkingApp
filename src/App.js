import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignIn from './component/signIn/signin';
import SignUp from './component/signUp/signUp';
import MainPage from './component/frontPage/MianPage';

class App extends React.Component {
  render() {

    return (
      <div className="App">
        <Router>
          <Route exact path='/' render={() => {
            return (
              <SignIn/>
            )
          }} />
           <Route path='/SignUp' render={() => {
            return (
              <SignUp/>
            )
          }} /> 
          <Route path='/MainPage' render={() => {
            return (
              <MainPage/>
            )
          }} />
        </Router>
      </div>
    );
  }

}

export default App;
