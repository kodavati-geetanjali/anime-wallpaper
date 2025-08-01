import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import WallpaperCard from '../components/wallpaper';
import '../css/search.css'; // ✅ Import the custom CSS file

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Search query:", query);
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/search?query=${query}&page=${page}`);
        const data = await res.json();
             console.log("Received from backend:", data);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, page]);

  const handleNext = ()  => setPage((prev) => prev+1)

  return (
    <div className="search-results">
      <h2 className="search-heading">Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <>
          <div className="wallpaper-grid">
            {results.map((img, index) => (
              <WallpaperCard key={index} thumb={img.thumb} full={img.full} />
            ))}
          </div>
          <div className="pagination-container">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="pagination-button"
              disabled={page === 1}
            >
              Prev
            </button>

            <span className="page-number">Page {page}</span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="pagination-button"
            >
              Next
            </button>
          </div>

        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
