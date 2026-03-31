import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // "Catch" the data passed from the Card component
  const item = location.state; 

  // --- NEW: RESERVATION LOGIC ---
  const handleReserve = () => {
    // 1. Get existing bookings or empty array
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // 2. Create the new booking object
    const newBooking = {
      id: Date.now(),
      propertyName: item.name,
      // In a real app, 'item.hostId' would be unique. 
      // For now, we link it to the item's name so the host can identify it.
      hostId: item.hostId || "host_123", 
      price: item.price,
      image: item.image,
      status: "Pending", 
      bookedAt: new Date().toLocaleDateString(),
      customerName: "Tourist User" // You could pull actual username from localStorage here
    };

    // 3. Save to localStorage
    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    
    // 4. Trigger a storage event so other tabs/dashboards update instantly
    window.dispatchEvent(new Event("storage"));

    alert(`🎉 Success! Your reservation for ${item.name} is now pending host approval.`);
    navigate("/home");
  };

  // Fallback: If someone refreshes the page or goes directly to /details without clicking a card
  if (!item) {
    return (
      <div className="section" style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="empty">
          <h2>Oops! No property selected.</h2>
          <button className="btn" style={{ width: "200px", marginTop: "1.5rem" }} onClick={() => navigate("/home")}>
            Go Back to Search
          </button>
        </div>
      </div>
    );
  }

  // --- INLINE STYLES ---
  const styles = {
    container: { padding: "2rem 5%", maxWidth: "1200px", margin: "0 auto", animation: "slideUpFade 0.6s ease forwards" },
    backBtn: { background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "1rem", fontWeight: "800", cursor: "pointer", marginBottom: "2rem" },
    headerText: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", color: "var(--text-main)", marginBottom: "0.5rem" },
    locationText: { fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2rem" },
    imageHero: { width: "100%", height: "50vh", minHeight: "400px", objectFit: "cover", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", marginBottom: "3rem" },
    contentGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem" },
    bookingCard: { background: "var(--surface)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-hover)", position: "sticky", top: "120px" },
    priceLg: { fontSize: "2.5rem", fontWeight: "900", color: "var(--primary)", margin: "0 0 1.5rem 0" },
    fakeInput: { width: "100%", padding: "14px", border: "1px solid var(--input-border)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", background: "var(--bg-color)", color: "var(--text-main)", boxSizing: "border-box" }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back to Explore</button>

      <h1 style={styles.headerText}>{item.name}</h1>
      <p style={styles.locationText}>📍 {item.location}</p>

      <img src={item.image} alt={item.name} style={styles.imageHero} />

      <div style={styles.contentGrid}>
        <div>
          <h2 style={{ fontSize: "1.8rem", color: "var(--text-main)", marginBottom: "1rem" }}>About this place</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2rem" }}>
            {item.tip ? item.tip : `Experience the best of ${item.location} in this beautiful property.`}
          </p>
          <h3 style={{ fontSize: "1.4rem", color: "var(--text-main)", marginBottom: "1rem" }}>✨ What this place offers</h3>
          <ul style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "2" }}>
            <li>Fast & Free WiFi</li>
            <li>Dedicated workspace</li>
            <li>Free parking on premises</li>
          </ul>
        </div>

        {item.price && (
          <div>
            <div style={styles.bookingCard}>
              <h2 style={styles.priceLg}>₹{item.price} <span style={{ fontSize: "1.2rem", fontWeight: "normal" }}>/ night</span></h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>CHECK-IN</label>
                  <input type="date" style={styles.fakeInput} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>CHECK-OUT</label>
                  <input type="date" style={styles.fakeInput} />
                </div>
              </div>
              
              {/* --- UPDATED BUTTON --- */}
              <button className="btn" onClick={handleReserve} style={{ marginTop: "1rem" }}>
                Confirm Reservation
              </button>
              
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "1rem" }}>You won't be charged yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;