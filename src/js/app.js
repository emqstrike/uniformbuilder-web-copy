import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App/App'
import Home from './components/Home/Home'
import SavedDesigns from './components/SavedDesigns'
import NicoComponent from './components/NicoComponent'

render(
    <Router>
        <App>
            <Switch>
                <Route exact path='/app' component={Home} />
                <Route path='/saved-designs' component={SavedDesigns} />
                <Route path='/test' component={NicoComponent} />
                {/*<Route component={NotFound} />*/}
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
)