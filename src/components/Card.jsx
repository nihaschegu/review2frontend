import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // 🚀 THE MAGIC: We route to '/details' AND pass the item data hidden in the 'state'
    navigate("/details", { state: item });
  };

  return (
    <div className="card">
      {/* Smart Image Fallback */}
      <img 
        src={item.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"} 
        alt={item.name} 
      />

      <div className="card-body">
        <h3>{item.name}</h3>
        <p>📍 {item.location}</p>

        {/* Dynamic Display: Show Price if it's a Homestay, show Tip if it's a Tourist Place */}
        {item.price ? (
          <p className="price">₹{item.price} <span style={{fontSize:"0.8rem", color:"var(--text-muted)", fontWeight:"normal"}}>/night</span></p>
        ) : (
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", marginBottom: "1rem" }}>
            💡 {item.tip}
          </p>
        )}

        {/* The fixed navigation button */}
        <button className="btn" onClick={handleViewDetails}>
          View Details →
        </button>
      </div>
    </div>
  );
}

export default Card;