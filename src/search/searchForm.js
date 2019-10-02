import React from 'react';

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.interval = React.createRef();
    this.query = React.createRef();
    this.from = React.createRef();
    this.to = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit({
      query: this.query.current.value,
      interval: this.interval.current.value,
      start_date: this.from.current.value,
      end_date: this.to.current.value
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' defaultValue='scott' ref={this.query} />
        <input type='text' defaultValue='1d' ref={this.interval} />
        <input type='text' defaultValue='2019-08-01' ref={this.from} />
        <input type='text' defaultValue='2019-08-31' ref={this.to} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default SearchForm
