import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { DollarSign, MapPin, Activity } from 'lucide-react';
import { supabase } from '../services/supabase'; // Your Supabase client

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const ItineraryBuilder = () => {
  const [spots, setSpots] = useState([]); // Live from DB
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi default
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Live DB subscription
  useEffect(() => {
    // Initial load
    loadSpots();

    // Realtime subscription
    const channel = supabase
      .channel('trips-spots')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'trips' }, 
        (payload) => {
          console.log('Live spot update:', payload);
          loadSpots(); // Refresh
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSpots = async () => {
    const { data } = await supabase
      .from('trips')
      .select('name, cities, google_data')
      .limit(50);
    
    if (data && data.length > 0) {
      const markers = data.flatMap(trip => 
        trip.google_data?.map(g => ({
          lat: g.lat,
          lng: g.lng,
          name: g.name,
          photo: g.photo,
          trip: trip.name
        })) || []
      );
      setSpots(markers);
      
      // Auto-center on first spot
      if (markers[0]) {
        setCenter({ lat: markers[0].lat, lng: markers[0].lng });
      }
    }
  };

  const addLiveSpot = async (city, lat, lng, photo) => {
    const spot = {
      name: city,
      lat,
      lng,
      photo,
      created_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('spots') // Create spots table if needed
      .insert([spot]);
    
    if (!error) {
      loadSpots(); // Triggers realtime update
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
            🗺️ Live Spots Map
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Spots update LIVE from your Supabase database. Add markers → See instantly!
          </p>
          <div className="flex justify-center gap-4 mt-6 text-sm">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
              {spots.length} Live Spots
            </span>
            <button 
              onClick={loadSpots}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Live Google Map */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={4}
                options={{
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ]
                }}
              >
                {spots.map((spot, index) => (
                  <Marker
                    key={`${spot.lat}-${spot.lng}-${index}`}
                    position={{ lat: spot.lat, lng: spot.lng }}
                    title={spot.name}
                    onClick={() => setSelectedSpot(spot)}
                    icon={{
                      url: spot.photo || 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: new window.google.maps.Point(20, 20)
                    }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>

            {/* Spot List */}
            <div className="mt-6 space-y-3 max-h-48 overflow-y-auto">
              {spots.slice(0, 5).map((spot, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedSpot(spot)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={spot.photo} 
                    alt={spot.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg truncate">{spot.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{spot.trip}</p>
                  </div>
                  <MapPin className="w-5 h-5 text-blue-500 ml-auto" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls + Add Spot */}
          <div className="space-y-6">
            {/* Add Live Spot */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-indigo-200/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-green-500" />
                Add Live Spot
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="City name (e.g. Paris)"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      // Mock Google Places lookup
                      addLiveSpot(e.target.value, 48.8566, 2.3522, 'https://maps.googleapis.com/maps/api/place/photo?...');
                      e.target.value = '';
                    }
                  }}
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <button 
                    onClick={() => addLiveSpot('Paris', 48.8566, 2.3522, 'paris.jpg')}
                    className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition-all"
                  >
                    🗼 Paris
                  </button>
                  <button 
                    onClick={() => addLiveSpot('Tokyo', 35.6895, 139.6917, 'tokyo.jpg')}
                    className="p-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl hover:shadow-xl transition-all"
                  >
                    🗼 Tokyo
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Spot Info */}
            <AnimatePresence>
              {selectedSpot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-indigo-200/50"
                >
                  <h3 className="text-2xl font-bold mb-4">{selectedSpot.name}</h3>
                  <img 
                    src={selectedSpot.photo} 
                    alt={selectedSpot.name}
                    className="w-full h-48 object-cover rounded-2xl shadow-xl mb-4"
                  />
                  <p className="text-gray-700 mb-4">{selectedSpot.trip}</p>
                  <button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transition-all"
                    onClick={() => setSelectedSpot(null)}
                  >
                    Add to Itinerary
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
