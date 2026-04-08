import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Card({ item, onBook }) {
  const navigate = useNavigate();

  // ✅ ADD STATE FOR DATES
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="card">
      <img src={item.image} alt={item.name} />

      <div className="card-body">
        <h3>{item.name}</h3>
        <p>📍 {item.location}</p>

        {item.price && <p>₹{item.price}</p>}

        {/* ✅ DATE INPUTS */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button onClick={() => navigate("/details", { state: item })}>
          View Details
        </button>

        {/* ✅ PASS DATES HERE */}
        <button onClick={() => onBook(item.id, fromDate, toDate)}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Card;