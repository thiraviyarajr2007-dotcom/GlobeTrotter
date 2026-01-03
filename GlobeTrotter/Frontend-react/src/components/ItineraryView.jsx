import React, { useState } from "react";
import { Hotel, MapPin, DollarSign, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ItineraryView() {
  const [viewMode, setViewMode] = useState("hotels"); // hotels | places | costs
  const [search, setSearch] = useState("");

  // Sample itinerary data
  const itinerary = {
    hotels: [
      { name: "Hilton Paris Opera", nights: 2, costPerNight: 12000 },
      { name: "Ibis Budget Paris", nights: 1, costPerNight: 6000 }
    ],
    places: [
      { name: "Eiffel Tower", location: "Paris", entryFee: 2500 },
      { name: "Louvre Museum", location: "Paris", entryFee: 1800 }
    ],
    travel: [
      { type: "Flight", from: "India", to: "Paris", cost: 25000 },
      { type: "Metro Pass", from: "Paris", to: "Paris", cost: 1200 }
    ]
  };

  // Filter logic based on search
  const filteredHotels = itinerary.hotels.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlaces = itinerary.places.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTravel = itinerary.travel.filter(t =>
    t.type.toLowerCase().includes(search.toLowerCase()) ||
    t.from.toLowerCase().includes(search.toLowerCase()) ||
    t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Itinerary View</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search hotels, places, travel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring"
          />
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode("hotels")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${viewMode === "hotels" ? "bg-black text-white" : "bg-white shadow"}`}
          >
            <Hotel size={18} /> Hotels
          </button>

          <button
            onClick={() => setViewMode("places")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${viewMode === "places" ? "bg-black text-white" : "bg-white shadow"}`}
          >
            <MapPin size={18} /> Visiting Places
          </button>

          <button
            onClick={() => setViewMode("costs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${viewMode === "costs" ? "bg-black text-white" : "bg-white shadow"}`}
          >
            <DollarSign size={18} /> Travel Cost
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={viewMode + search}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          {viewMode === "hotels" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Hotels</h2>
              {filteredHotels.length === 0 && <p>No hotels found</p>}
              {filteredHotels.map((h, i) => (
                <div key={i} className="border-b py-3">
                  <p className="font-medium">{h.name}</p>
                  <p className="text-sm text-gray-600">
                    {h.nights} nights × ₹{h.costPerNight}
                  </p>
                </div>
              ))}
            </div>
          )}

          {viewMode === "places" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Visiting Places</h2>
              {filteredPlaces.length === 0 && <p>No places found</p>}
              {filteredPlaces.map((p, i) => (
                <div key={i} className="border-b py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.location}</p>
                  <p className="text-sm">Entry Fee: ₹{p.entryFee}</p>
                </div>
              ))}
            </div>
          )}

          {viewMode === "costs" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Travel Costs</h2>
              {filteredTravel.length === 0 && <p>No travel data found</p>}
              {filteredTravel.map((t, i) => (
                <div key={i} className="border-b py-3">
                  <p className="font-medium">{t.type}</p>
                  <p className="text-sm text-gray-600">{t.from} → {t.to}</p>
                  <p className="text-sm">Cost: ₹{t.cost}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
