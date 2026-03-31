import { useState, useEffect } from "react";
import "../App.css";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("listings");

  // EDIT STATE - Added 'image' property
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    price: "",
    image: "" 
  });

  // ✅ LOAD DATA
  useEffect(() => {
    const loadListings = () => {
      const storedListings = JSON.parse(localStorage.getItem("homestays")) || [];
      setData(storedListings);
    };

    loadListings();

    // Listen for changes in case a Host adds a property in another tab
    window.addEventListener("storage", loadListings);
    return () => window.removeEventListener("storage", loadListings);
  }, []);

  // ✅ DELETE 
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      localStorage.setItem("homestays", JSON.stringify(updated));
      
      // Tell other open tabs (Host/Tourist) to update instantly
      window.dispatchEvent(new Event("storage"));
    }
  };

  // EDIT START - Added image fallback
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      location: item.location,
      price: item.price,
      image: item.image || ""
    });
  };

  // EDIT CHANGE
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ✅ SAVE EDIT 
  const saveEdit = () => {
    const updated = data.map((item) =>
      item.id === editingId ? { ...item, ...editForm } : item
    );
    setData(updated);
    localStorage.setItem("homestays", JSON.stringify(updated));
    
    // Tell other open tabs to update instantly
    window.dispatchEvent(new Event("storage"));
    
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // --- POLISHED UI STYLES ---
  const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-color)", transition: "var(--transition-theme)", fontFamily: "system-ui, sans-serif" },
    sidebar: { width: "260px", backgroundColor: "var(--surface)", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", borderRight: "1px solid var(--border-subtle)", transition: "var(--transition-theme)" },
    brand: { fontSize: "1.5rem", color: "var(--primary)", marginBottom: "2rem", fontWeight: "800", letterSpacing: "-0.5px" },
    navBtn: (isActive) => ({
      backgroundColor: isActive ? "var(--primary-glow)" : "transparent",
      color: isActive ? "var(--primary)" : "var(--text-muted)",
      border: "none",
      padding: "1rem",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      marginBottom: "0.5rem",
      fontWeight: "700",
      textAlign: "left",
      transition: "var(--transition-fast)",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }),
    logoutBtn: {
      marginTop: "auto",
      backgroundColor: "var(--danger-bg)",
      color: "var(--danger-text)",
      border: "none",
      padding: "1rem",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      fontWeight: "700",
      transition: "var(--transition-fast)"
    },
    main: { flex: 1, padding: "2rem 5%", overflowY: "auto" },
    header: { marginBottom: "2.5rem", color: "var(--text-main)" },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem"
    },
    statCard: {
      backgroundColor: "var(--surface)",
      padding: "1.5rem",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid var(--border-subtle)",
      transition: "var(--transition-theme)"
    },
    statLabel: { fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700", marginBottom: "0.5rem" },
    statValue: { fontSize: "2.5rem", fontWeight: "800", color: "var(--primary)", margin: 0 },
    
    // Form & Button Polish
    editInput: {
      width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px",
      border: "1px solid var(--input-border)", background: "var(--bg-color)", 
      color: "var(--text-main)", boxSizing: "border-box", fontSize: "0.95rem"
    },
    actionRow: { display: "flex", gap: "10px", marginTop: "15px" },
    primaryBtn: { flex: 1, backgroundColor: "var(--primary)", color: "#fff", border: "none", padding: "0.8rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", transition: "0.2s" },
    editBtn: { flex: 1, backgroundColor: "var(--primary-glow)", color: "var(--primary)", border: "none", padding: "0.8rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", transition: "0.2s" },
    deleteBtn: { flex: 1, backgroundColor: "var(--danger-bg)", color: "var(--danger-text)", border: "none", padding: "0.8rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700", transition: "0.2s" },
    ghostBtn: { flex: 1, backgroundColor: "transparent", color: "var(--text-muted)", border: "1px solid var(--border-subtle)", padding: "0.8rem", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }
  };

  return (
    <div style={styles.layout}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.brand}>🛡️ Admin Center</h2>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          <button style={styles.navBtn(activeTab === "listings")} onClick={() => setActiveTab("listings")}>
            🏡 Manage Listings
          </button>
        </nav>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, fontSize: "2.2rem" }}>Dashboard Overview</h1>
        </div>

        {/* STATS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Listings</p>
            <h2 style={styles.statValue}>{data.length}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Avg Price</p>
            <h2 style={styles.statValue}>
              ₹{data.length ? Math.round(data.reduce((acc, curr) => acc + Number(curr.price), 0) / data.length) : 0}
            </h2>
          </div>
        </div>

        {/* LISTINGS */}
        {activeTab === "listings" && (
          <>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--text-main)", fontSize: "1.5rem" }}>Active Properties</h2>
            
            {data.length === 0 ? (
              <div className="empty">No properties found. Waiting for hosts to upload...</div>
            ) : (
              <div className="grid">
                {data.map((item) => (
                  <div key={item.id} className="card">
                    {/* Image Fallback Fix */}
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div style={{ height: "220px", backgroundColor: "var(--bg-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                        No Image Provided
                      </div>
                    )}

                    <div className="card-body">
                      {editingId === item.id ? (
                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                          <input style={styles.editInput} name="name" value={editForm.name} onChange={handleEditChange} placeholder="Property Name" />
                          <input style={styles.editInput} name="location" value={editForm.location} onChange={handleEditChange} placeholder="Location" />
                          <input style={styles.editInput} name="price" type="number" value={editForm.price} onChange={handleEditChange} placeholder="Price" />
                          
                          {/* NEW: Image input field so admin can edit the photo */}
                          <input style={styles.editInput} name="image" value={editForm.image} onChange={handleEditChange} placeholder="Image URL" />

                          <div style={{ ...styles.actionRow, marginTop: "auto" }}>
                            <button style={styles.primaryBtn} onClick={saveEdit}>Save</button>
                            <button style={styles.ghostBtn} onClick={() => setEditingId(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>{item.name}</h3>
                          <p style={{ color: "var(--text-muted)", margin: "0 0 1rem 0" }}>📍 {item.location}</p>
                          <p className="price" style={{ marginTop: "auto", fontSize: "1.4rem", fontWeight: "800", color: "var(--primary)" }}>₹{item.price}</p>

                          <div style={styles.actionRow}>
                            <button style={styles.editBtn} onClick={() => startEditing(item)}>✏️ Edit</button>
                            <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;