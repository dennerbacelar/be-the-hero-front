import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/logon';
import Registrar from './pages/registrar';
import Perfil from './pages/perfil';
import NovoCaso from './pages/novoCaso';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registrar" component={Registrar} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/caso/novo" component={NovoCaso} />
            </Switch>
        </BrowserRouter>
    );
}