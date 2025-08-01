import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <Link to="/home">AniWall</Link>
        </div>
      </div>

      <div className="navbar-middle">
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/favorites" className="nav-link">Saved</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
