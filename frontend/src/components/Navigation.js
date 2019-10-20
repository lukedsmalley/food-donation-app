export function Navigation(props) {
  if (props.session) {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <a class="btn btn-outline-info"></a>
        </Link>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/restaurant">
              <a class="nav-link">Restaurant</a>
            </Link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="btn btn-outline-info" onClick={props.onLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <a class="btn btn-outline-info"></a>
        </Link>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/login">
              <a class="btn btn-outline-info">Login</a>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
