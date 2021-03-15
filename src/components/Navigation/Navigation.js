

// class Navigation extends Component {
  function  Navigation({onRouteChange}){

  // render() {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={()=>onRouteChange('_signin') } className='f3 link dim black underline pa4 pointer'>Sign Out</p>
      </nav>
    );
  // }
}

export default Navigation;
