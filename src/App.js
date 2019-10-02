import React from 'react';
import axios from 'axios';
import SearchForm from './search/searchForm'
import SearchHistogram from './search/searchHistogram'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result:{},
      error: null,
      isLoaded: true
    }
  }

  onSubmit(query){
    this.setState({isLoaded: false})
    axios.post("/results.json", query).then(response => {
      this.setState({result: response.data})
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      this.setState({isLoaded: true})
    })
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm isLoaded={this.state.isLoaded} onSubmit={this.onSubmit.bind(this)}/>
        <SearchHistogram isLoaded={this.state.isLoaded} data={this.state.result}/>
      </React.Fragment>
    );
  }
}

export default App;
