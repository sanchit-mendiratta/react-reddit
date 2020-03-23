import React, { Component } from "react";
import { render } from "react-dom";
import { NavBar } from "./components/NavBar";
import { Posts } from "./components/Posts";
import { Favorites } from "./components/Favorites";
import "./styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      master: [],
      data: [],
      favorites: [],
      subreddit: "",
      sortType: "hot",
      error: "",
      undo: [],
      redo: []
    };
  }
  async apiRequest(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const data = json.data.children.map(item => ({
        title: item.data.title,
        ups: item.data.ups,
        id: item.data.id,
        url: item.data.url,
        fav: false
      }));
      this.setState({
        data: data,
        master: Array.from(data),
        error: "",
        sortType: "hot"
      });
    } catch (error) {
      this.setState({
        data: [],
        master: [],
        error: "No results found!"
      });
    }
  }
  fetchMasterData() {
    this.apiRequest("https://www.reddit.com/r/popular.json");
    this.setState({
      subreddit: ""
    });
  }
  componentDidMount() {
    this.fetchMasterData();
  }
  callUndo() {
    const arr = Array.from(this.state.undo);
    if (arr.length) {
      const fn = arr.pop();
      this.state.redo.push(fn);
      fn();
      this.setState({
        undo: arr
      });
    }
  }
  callRedo() {
    const arr = Array.from(this.state.redo);
    if (arr.length) {
      const fn = arr.pop();
      fn();
      this.setState({
        redo: arr
      });
    }
  }
  markFavourite(id) {
    let chosen = this.state.favorites.filter(item => item.id === id);
    if (chosen && chosen.length && chosen[0]) {
      this.state.favorites = this.state.favorites.filter(item => item.id != id);
    } else {
      chosen = this.state.data.filter(item => item.id == id);
      chosen[0].fav = true;
      this.state.favorites.push(...chosen);
    }
    this.state.undo.push(
      function () {
        this.markFavourite.call(this, id);
      }.bind(this)
    );
    this.setState({ favorites: [...this.state.favorites] });
  }
  resetFavs() {
    this.state.data.forEach(item => {
      item.fav = false;
    });
    this.state.master.forEach(item => {
      item.fav = false;
    });

    this.state.favorites.forEach(item => {
      this.state.data.forEach(inner => {
        if (inner.id == item.id) inner.fav = true;
      });
      this.state.master.forEach(inner => {
        if (inner.id == item.id) inner.fav = true;
      });
    });
  }
  selectChange(e) {
    let type = e.target.value;
    let sorted = [];
    if (type == "hot") {
      sorted = Array.from(this.state.master);
    } else if (type == "ascending") {
      sorted = this.state.data.sort((a, b) => a.ups - b.ups);
    } else if (type == "descending") {
      sorted = this.state.data.sort((a, b) => b.ups - a.ups);
    }
    this.setState({
      sortType: type,
      data: sorted
    });
  }
  subredditChange(e) {
    this.setState({
      subreddit: e.target.value
    });
  }
  subredditSearch() {
    if (!this.state.subreddit.length) this.fetchMasterData();
    else
      this.apiRequest(`https://www.reddit.com/r/${this.state.subreddit}.json`);
  }
  render() {
    this.resetFavs();
    return (
      <React.Fragment>
        <NavBar />
        <Posts
          {...this.state}
          selectChange={this.selectChange.bind(this)}
          markFavourite={this.markFavourite.bind(this)}
          subredditChange={this.subredditChange.bind(this)}
          subredditSearch={this.subredditSearch.bind(this)}
          fetchMasterData={this.fetchMasterData.bind(this)}
          callUndo={this.callUndo.bind(this)}
          callRedo={this.callRedo.bind(this)}
        />
        <Favorites
          data={this.state.favorites}
          markFavourite={this.markFavourite.bind(this)}
        />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
