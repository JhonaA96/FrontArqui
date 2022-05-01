import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { index } from './Pages/'
import { crear } from './Pages/crear'
import { editar } from './Pages/editar'

function App() {
    return (
      <Router>
        <Switch>
          <Route path='/index' component= {index}/>
          <Route path= '/crear' component= {crear}/>
          <Route path= '/editar' component= {editar}/>
        </Switch>
      </Router>

    );
}

export default App;