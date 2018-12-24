import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from 'views/LandingPage'
import GamePage from 'views/GamePage'

export default (
    <Switch>
        <Route path='/game' component={GamePage} />
        <Route path='/' component={LandingPage} />
    </Switch>
)
