import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from './plugins/firebase';
import CssBaseLine from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      isLogin: false,
      inputValue: '',
      tasks: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { 
      if(user) {
        console.log('is login');
        this.setState({
          userId: user.uid,
          isLogin: true
        });
        this.getTasksData();
      } else {
        console.log('is not login');
      }
    })
  }

  getTasksData() {
    firestore.collection('tasks')
    .where('user_id', '==', this.state.userId)
    .orderBy('created_at')
    .get()
    .then(snapShot => {
      let tasks = [];
      snapShot.forEach(doc => {
        tasks.push({
          id: doc.id,
          text: doc.data().text
        });
      });
      this.setState({
        tasks: tasks
      });
    });
  }
  
  login() {
    firebase.auth().signInAnonymously().then( e => {
      console.log(e);
      this.setState({
        isLogin: true,
        userId: firebase.auth().currentUser.uid
      });
    }).catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
  };

  logout() {
    if(firebase.auth().currentUser == null) {
      return
    }

    firebase.auth().currentUser.delete().then(() => {
      this.setState({
        isLogin: false,
        userId: '',
        inputValue: '',
        tasks: []
      });
    });
  };

  getText(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  addTask() {
    const inputValue = this.state.inputValue;
    if(inputValue == '') {
      return
    }
    firestore.collection('tasks').add({
      text: inputValue,
      created_at: new Date(),
      user_id: this.state.userId
    }).then(() => {
      this.getTasksData();
    });
    this.setState({
      inputValue: ''
    });
  };

  removeTask(e) {
    console.log(e.target.value);
    firestore.collection('tasks')
      .doc(e.target.value)
      .delete()
      .then(() => {
        this.getTasksData()
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
}

export default App;
