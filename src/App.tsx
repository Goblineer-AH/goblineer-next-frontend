import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ServerContext } from './app/ServerContext';
import { PriceGlanceTable } from './features/item-details/PriceGlance';
import Navbar from './features/navbar/NavBar';
import Items from './routes/Items';

function App() {
  const [server, setServer] = useState(3682);
  
  return (
    <ServerContext.Provider value={{ server, setServer }}>
      <Router>
        <div>
          <Navbar />

          <main>
            <Switch>
              <Route path="/items/:id">
                <Items />
              </Route>

              <Route path="/">
                <PriceGlanceTable itemIds={[152512, 152513, 152579, 168185]}/>
                <PriceGlanceTable itemIds={[152510, 152509, 152505, 152508, 152506, 152507, 152511, 168487]}/>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ServerContext.Provider>
  );
}

export default App;
