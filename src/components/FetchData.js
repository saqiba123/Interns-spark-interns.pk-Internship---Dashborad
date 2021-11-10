import React, { Component } from "react";

class FetchData extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
      });
  }
  render() {
    return <div>test</div>;
  }
}

export default FetchData;
