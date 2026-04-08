import { useLocation } from "react-router-dom";
import "../App.css";

function Details() {
  const { state } = useLocation();

  if (!state) return <h2>No Data</h2>;

  return (
    <div>
      <h1>{state.name}</h1>
      <img src={state.image} width="400" />
      <p>{state.location}</p>
      <p>₹{state.price}</p>
    </div>
  );
}

export default Details;