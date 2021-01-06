import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ServerContext } from './app/ServerContext';
import { PriceGlanceTable } from './features/item-details/PriceGlance';
import Navbar from './features/navbar/NavBar';
import { ServerPicker } from './features/server-picker/ServerPicker';
import Items from './routes/Items';

function App() {
  const [server, setServer] = useState(3682);
  
  return (
    <ServerContext.Provider value={{ server, setServer }}>
      <Router>
        <div>
          <Navbar />
          {/* <ServerPicker /> */}

          <main>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <ItemSelector itemId={10377} /> */}
            {/* <ItemSelector itemId={124105} /> */}

            <Switch>
              <Route path="/items/:id">
                <Items />
              </Route>

              <Route path="/">
                <Link to="/items/10377">To the item!</Link>
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
