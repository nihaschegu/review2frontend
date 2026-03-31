import React, { useState, useEffect } from "react";
import "../App.css";

function HostDashboard() {
  const [activeTab, setActiveTab] = useState("listings"); // 'listings' or 'bookings'
  const [form, setForm] = useState({ name: "", location: "", price: "", image: "" });
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ SYNC DATA: Load Listings AND Bookings
  useEffect(() => {
    const loadAllData = () => {
      const storedListings = JSON.parse(localStorage.getItem("homestays")) || [];
      const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      setListings(storedListings);
      setBookings(storedBookings);
    };

    loadAllData();
    window.addEventListener("storage", loadAllData);
    return () => window.removeEventListener("storage", loadAllData);
  }, []);

  // --- LISTING FUNCTIONS ---
  const handleAdd = () => {
    if (!form.name || !form.location || !form.price) {
      alert("Please fill all fields");
      return;
    }
    let stored = JSON.parse(localStorage.getItem("homestays")) || [];
    const finalImage = form.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

    if (editId) {
      stored = stored.map((item) => item.id === editId ? { ...form, image: finalImage, id: editId } : item);
      setEditId(null);
    } else {
      stored.push({ ...form, image: finalImage, id: Date.now() });
    }

    localStorage.setItem("homestays", JSON.stringify(stored));
    window.dispatchEvent(new Event("storage"));
    setForm({ name: "", location: "", price: "", image: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setActiveTab("listings"); // Switch to listings tab if editing
  };

  const handleDelete = (id) => {
    const updated = listings.filter((item) => item.id !== id);
    localStorage.setItem("homestays", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // --- BOOKING FUNCTIONS ---
  const updateBookingStatus = (id, newStatus) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    window.dispatchEvent(new Event("storage"));
  };

  // --- STYLES ---
  const styles = {
    container: { display: "flex", gap: "2rem", padding: "2rem", maxWidth: "1200px", margin: "0 auto", color: "var(--text-main)" },
    sidebar: { flex: "0 0 320px", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)", height: "fit-content" },
    tabBtn: (isActive) => ({
      width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", cursor: "pointer",
      backgroundColor: isActive ? "var(--primary)" : "transparent",
      color: isActive ? "#fff" : "var(--text-muted)",
      fontWeight: "700", transition: "0.3s", textAlign: "left"
    }),
    mainContent: { flex: "1" },
    header: { marginBottom: "1.5rem", fontSize: "1.8rem", fontWeight: "800" },
    inputGroup: { display: "flex", flexDirection: "column", marginBottom: "1rem" },
    input: { padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--input-border)", backgroundColor: "var(--bg-color)", color: "var(--text-main)" },
    bookingCard: { display: "flex", backgroundColor: "var(--surface)", borderRadius: "12px", padding: "1rem", marginBottom: "1rem", border: "1px solid var(--border-subtle)", gap: "1rem" },
    statusBadge: (status) => ({
      padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold",
      backgroundColor: status === "Confirmed" ? "#dcfce7" : status === "Rejected" ? "#fee2e2" : "#fef9c3",
      color: status === "Confirmed" ? "#166534" : status === "Rejected" ? "#991b1b" : "#854d0e"
    }),
    actionBtn: { padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600", marginRight: "8px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "1.5rem" }}>Host Dashboard</h2>
        
        {/* TAB NAVIGATION */}
        <button style={styles.tabBtn(activeTab === "listings")} onClick={() => setActiveTab("listings")}>🏡 My Listings</button>
        <button style={styles.tabBtn(activeTab === "bookings")} onClick={() => setActiveTab("bookings")}>📩 Reservations ({bookings.length})</button>
        
        <hr style={{ margin: "20px 0", opacity: 0.1 }} />

        {/* FORM (Only shows if in Listing Tab) */}
        {activeTab === "listings" && (
          <div>
            <h3>{editId ? "Edit Property" : "Add Property"}</h3>
            <div style={styles.inputGroup}>
              <input style={styles.input} value={form.name} placeholder="Property Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <input style={styles.input} value={form.location} placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <input style={styles.input} type="number" value={form.price} placeholder="Price per night" onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <input style={styles.input} value={form.image} placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <button className="btn" onClick={handleAdd}>{editId ? "Update" : "Publish"}</button>
          </div>
        )}
      </div>

      <div style={styles.mainContent}>
        {activeTab === "listings" ? (
          <>
            <h2 style={styles.header}>Your Properties</h2>
            <div className="grid">
              {listings.map(item => (
                <div className="card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="card-body">
                    <h3>{item.name}</h3>
                    <p>📍 {item.location}</p>
                    <p className="price">₹{item.price}</p>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button className="editBtn" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="deleteBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.header}>Incoming Reservations</h2>
            {bookings.length === 0 ? <p className="empty">No reservations yet.</p> : (
              bookings.map(b => (
                <div style={styles.bookingCard} key={b.id}>
                  <img src={b.image} style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h3>{b.propertyName}</h3>
                      <span style={styles.statusBadge(b.status)}>{b.status}</span>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Booked on: {b.bookedAt}</p>
                    <p style={{ fontWeight: "bold", margin: "5px 0" }}>Total: ₹{b.price}</p>
                    
                    {b.status === "Pending" && (
                      <div style={{ marginTop: "10px" }}>
                        <button style={{ ...styles.actionBtn, backgroundColor: "#22c55e", color: "#fff" }} onClick={() => updateBookingStatus(b.id, "Confirmed")}>Approve</button>
                        <button style={{ ...styles.actionBtn, backgroundColor: "#ef4444", color: "#fff" }} onClick={() => updateBookingStatus(b.id, "Rejected")}>Reject</button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HostDashboard;