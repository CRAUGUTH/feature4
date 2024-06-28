import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <Link to="/list">Lecture List</Link>
        </li>
        <li>
          <Link to="/add">Add Lecture</Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
