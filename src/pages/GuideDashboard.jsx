import { useState } from "react";

function GuideDashboard() {
  const [place, setPlace] = useState("");
  const [tip, setTip] = useState("");

  const handleAdd = () => {
    alert(`Tip added for ${place}: ${tip}`);
  };

  return (
    <div>
      <h1>Guide Dashboard</h1>

      <input
        placeholder="Place"
        onChange={(e) => setPlace(e.target.value)}
      />

      <input
        placeholder="Tip"
        onChange={(e) => setTip(e.target.value)}
      />

      <button onClick={handleAdd}>Add Tip</button>
    </div>
  );
}

export default GuideDashboard;  