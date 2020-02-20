import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListContacts from './components/ListContacts';
import EditContact from './components/EditContact';
import AddContact from './components/AddContact';
import ViewContact from './components/ViewContact';
import DeleteContact from './components/DeleteContact';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <Button variant="outlined" color="primary">
                <Link to="/contact/all">List Contacts</Link>
              </Button>
              <Button variant="outlined" color="primary">
                <Link to="/contact/add">Add Contact</Link>
              </Button>
            </ul>
          </nav>
          <Switch>
            <Route path="/contact/all">
              <ListContacts />
            </Route>
            <Route path="/contact/delete">
              <DeleteContact />
            </Route>
            <Route path="/contact/add">
              <AddContact />
            </Route>
            <Route exact path="/contact/:id">
              <ViewContact />
            </Route>
            <Route exact path="/contact/edit/:id">
              <EditContact />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
