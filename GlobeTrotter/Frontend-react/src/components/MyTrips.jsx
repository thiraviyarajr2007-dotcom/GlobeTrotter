import { tripAPI } from '../services/tripStorage';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  // Load on mount
  useEffect(() => {
    tripAPI.getTrips().then(setTrips);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this trip?')) {
      await tripAPI.deleteTrip(id);
      setTrips(await tripAPI.getTrips());
    }
  };

  const handleSaveEdit = async (updatedTrip) => {
    await tripAPI.saveTrip(updatedTrip);
    setTrips(await tripAPI.getTrips());
    setEditingTrip(null);
  };

  return (
    <div className="...">
      {/* Add New Trip Button */}
      <button 
        onClick={() => setEditingTrip({ name: '', cities: [], budget: 0 })}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-bounce"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <div className="grid ...">
        {trips.map(trip => (
          <TripCard 
            key={trip.id}
            trip={trip}
            onDelete={handleDelete}
            onEdit={() => setEditingTrip(trip)}
            isEditing={editingTrip?.id === trip.id}
            onSave={handleSaveEdit}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced TripCard with Edit/Delete
const TripCard = ({ trip, onDelete, onEdit, isEditing, onSave }) => {
  const [localTrip, setLocalTrip] = useState(trip);

  if (isEditing) {
    return (
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-300 p-6 rounded-2xl"
      >
        <input 
          value={localTrip.name} 
          onChange={e => setLocalTrip({...localTrip, name: e.target.value})}
          className="w-full p-3 text-2xl font-bold border-b-2 border-yellow-300 focus:border-yellow-500 outline-none mb-4"
          placeholder="Trip name"
        />
        <div className="flex gap-3">
          <button 
            onClick={() => onSave(localTrip)}
            className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-600 shadow-lg"
          >
            Save
          </button>
          <button 
            onClick={() => onEdit(null)}
            className="px-6 py-3 text-gray-500 hover:text-gray-700 font-bold"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="group ...">
      {/* Your existing card content */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
        <button onClick={() => onEdit(trip)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
          <PencilIcon className="w-5 h-5 text-blue-600" />
        </button>
        <button onClick={() => onDelete(trip.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors">
          <TrashIcon className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
};
