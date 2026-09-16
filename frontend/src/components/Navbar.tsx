import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>Macedonia Explorer</h2>

      <div>
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/explore">
          Explore
        </NavLink>

        <NavLink to="/places">
          Places
        </NavLink>

        <NavLink to="/activities">
          Activities
        </NavLink>

        <NavLink to="/graph">
          Graph
        </NavLink>

        <NavLink to="/map">
          Map
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
