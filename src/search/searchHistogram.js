import React from 'react';
import { Bar } from "react-chartjs-2";
import randomcolor from 'randomcolor';

class SearchHistogram extends React.Component {
  constructor(props){
    super(props);
  }

  barOptions() {
    return {
      scales: {
        yAxes: [
          {
            stacked: true
          }
        ],
        xAxes: [
          {
            stacked: true
          }
        ]
      }
    };
  }

  barData() {
    if(Object.keys(this.props.data).length === 0) return {};
    const buckets = this.props.data['aggregations']['first_agg']['buckets']
    let labels = []
    let datasets = []
    let hashmap = {}
    buckets[0]['second_agg']['buckets'].forEach((medium) => {
      hashmap[medium['key']] = []
    })
    buckets.map((bucket, index) => {
      labels.push(bucket['key_as_string'])
      let second_bucket = bucket['second_agg']['buckets']
      second_bucket.forEach((bucket) => {
        hashmap[bucket['key']].push(bucket['doc_count'])
      })
    })
    Object.keys(hashmap).forEach((key) => {
      datasets.push({label: key, backgroundColor: randomcolor(), data: hashmap[key]})
    })
    return {
      labels: labels,
      datasets: datasets
    };
  }

  render(){
    return <Bar options={this.barOptions()} data={this.barData()} />;
  }
}
SearchHistogram.defaultProps = {
  data: {}
}

export default SearchHistogram
