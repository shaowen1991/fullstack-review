import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentWillMount () {
    $.get('/repos', (data) => {
      console.log(data);
      this.setState({
        repos: data
      });
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('/repos/import', {term: term}, 
    //if success
    () => {
      console.log('success make req to server');
      //after posting data, trigger refresh with new data
      $.get('/repos', (data) => {
        console.log(data);
        this.setState({
          repos: data
        });
      });
    }),
    //if fail
    () => {
      console.log('fail make req to server');
    }
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));