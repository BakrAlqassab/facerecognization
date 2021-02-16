import React, { Component } from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className='f3 link dim black underline pa4 pointer'>Sign Out</p>
      </nav>
    );
  }
}

export default Navigation;
