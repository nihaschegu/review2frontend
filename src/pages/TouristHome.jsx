import { useEffect, useState } from "react";
import { getPlaces, bookPlace } from "../api/api";
import Card from "../components/Card";
import "../App.css";

function TouristHome() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces()
      .then(setPlaces)
      .catch((err) => {
        console.error("Failed to load places:", err);
      });
  }, []);

  // ✅ UPDATED BOOKING FUNCTION
  const handleBooking = async (placeId, fromDate, toDate) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Please login first!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // ❌ Prevent past booking
    if (fromDate < today || toDate < today) {
      alert("Cannot select past dates ❌");
      return;
    }

    // ❌ Validate
    if (!fromDate || !toDate) {
      alert("Select both dates");
      return;
    }

    if (fromDate > toDate) {
      alert("Invalid date range ❌");
      return;
    }

    const bookingData = {
      userId: user.id,
      placeId: placeId,
      fromDate: fromDate,
      toDate: toDate,
      status: "pending",
    };

    console.log("Booking Data:", bookingData);

    try {
      const result = await bookPlace(bookingData);
      console.log("Booking Success:", result);
      alert("Booking Successful ✅");
    } catch (err) {
      console.error("Booking Failed:", err);
      alert("Booking Failed ❌");
    }
  };

  return (
    <div>
      <h2>Explore Places</h2>

      <div className="grid">
        {places.map((place) => (
          <Card
            key={place.id}
            item={place}
            onBook={handleBooking}
          />
        ))}
      </div>
    </div>
  );
}

export default TouristHome;