import React from 'react';
import './app.scss';
import Statistic from '../statistic/statistic';
import MainPage from '../main-page/main-page';
import CsvParser from '../csv-parser/csv-parser';

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";

const App = ()=> {

  return (
    <Router>
        <div className="App">
                <Redirect exact from="*" to="/"/>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/stats" component={Statistic}/>
                <Route exact path="/csv-parser" component={CsvParser}/>
        </div>
    </Router>
  );
};

export default App;
