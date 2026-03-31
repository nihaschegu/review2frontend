import { useState, useEffect } from "react";
import places from "../data/places";
import Card from "../components/Card";
import "../App.css";

function TouristHome() {
  const [search, setSearch] = useState("");
  const [homes, setHomes] = useState([]);

  // LOAD DATA FROM LOCALSTORAGE AND LISTEN FOR CHANGES
  useEffect(() => {
    // We wrap the loading logic in a function so we can reuse it
    const loadHomes = () => {
      const stored = JSON.parse(localStorage.getItem("homestays")) || [];
      setHomes(stored);
    };

    // 1. Load data immediately when the component mounts
    loadHomes();

    // 2. Listen for changes to localStorage (triggers when updated from another tab)
    window.addEventListener("storage", loadHomes);

    // 3. Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", loadHomes);
    };
  }, []);

  // Make sure we only filter if 'location' actually exists to prevent crashes
  const filteredHomes = homes.filter(h =>
    h.location && h.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlaces = places.filter(p =>
    p.location && p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">

      {/* HERO */}
      <div className="hero">
        <h1>Plan Your Perfect Trip ✈️</h1>
        <p>Search stays, explore destinations & book easily</p>

        <div className="search-container">
          <input
            placeholder="Search destinations (Goa, Manali...)"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* HOMESTAYS */}
      <div className="section">
        <h2>🏡 Popular Homestays</h2>
        <div className="grid">
          {filteredHomes.length > 0 ? (
            filteredHomes.map(h => <Card key={h.id} item={h} />)
          ) : (
            <p className="empty">No stays found</p>
          )}
        </div>
      </div>

      {/* ATTRACTIONS */}
      <div className="section">
        <h2>📍 Nearby Attractions</h2>
        <div className="grid">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(p => <Card key={p.id} item={p} />)
          ) : (
            <p className="empty">No places found</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default TouristHome;