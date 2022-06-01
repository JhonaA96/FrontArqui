import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import { Usuarios } from './Pages/Usuarios'
import { Juegos } from './Pages/Juegos'
import Login from './Pages/Login'

function App() {
    return (
      <Router>
        <Switch>
          <Route path='/usuarios' component= { Usuarios }/>
          <Route path= '/juegos' component= { Juegos }/>
          <Route path= '/' component={ Login }/>
        </Switch>
      </Router>

    );
}

export default App;