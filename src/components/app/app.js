import React from 'react';
import './app.scss';
import Statistic from '../statistic/statistic';
import MainPage from '../main-page/main-page';
import CsvParser from '../csv-parser/csv-parser';

import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

const App = ()=> {

  return (
    <Router>
        <div className="App">
                <Route exact path="/" component={MainPage}/>
                <Route path="/stats" component={Statistic}/>
                <Route path="/csv-parser/" component={CsvParser}/>
        </div>
    </Router>
  );
};

export default App;
