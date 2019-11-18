import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';


import Home from './pages/Home';
import AddApp from './pages/AddApp';
import Profile from './pages/Profile';
import { SPACE_NAME }from './Constants';

const getThreeBox = async address => {
  const profile = await Box.getProfile(address);
  return profile;
};



export default class App extends Component {
  state = {
    needToAWeb3Browser: false
  };
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }

  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      const threeBox = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBox });
    }
    const rach = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    this.setState({ box });
    const space = await this.state.box.openSpace(SPACE_NAME);
    this.setState({space})

    //TODO rename to appThread
    const thread = await space.joinThread("application_list", {
      firstModerator: rach,
      members: false
    });
    this.setState({thread});
    const posts = await this.state.thread.getPosts();
    this.setState({ posts });
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <Router>
        <div>
          <Nav/>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/add-application">
              {this.state.accounts && (
                <AddApp
                  accounts={this.state.accounts}
                  thread={this.state.thread}
                  box={this.state.box}
                  space={this.state.space}
                  threadMembers={this.state.threadMembers}
                  posts={this.state.posts}
                  threeBox={this.state.threeBox}
                />
              )}
              {!this.state.accounts && <h1>Login with metamask</h1>}
            </Route>
            <Route path="/">
              <Home posts={this.state.posts}
                    space={this.state.space}
                    box={this.state.box}
                    usersAddress={this.state.accounts ?this.state.accounts[0]:null} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

