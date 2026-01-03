// LocalStorage with auto-backup
const TRIPS_KEY = 'globetrotter_trips_v2';

export const tripAPI = {
  // Get all trips (mock + saved)
  async getTrips() {
    try {
      const saved = localStorage.getItem(TRIPS_KEY);
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Paris Escape', startDate: '2026-03-15', endDate: '2026-03-20', cities: ['Paris'], budget: 50000, spent: 12000, imageUrl: '/paris.jpg' },
        { id: 2, name: 'Tokyo Adventure', startDate: '2026-04-10', endDate: '2026-04-18', cities: ['Tokyo'], budget: 80000, spent: 45000, imageUrl: '/tokyo.jpg' }
      ];
    } catch {
      return [];
    }
  },

  // Save/update trip
  async saveTrip(trip) {
    const trips = await this.getTrips();
    const index = trips.findIndex(t => t.id === trip.id);
    if (index > -1) {
      trips[index] = { ...trips[index], ...trip };
    } else {
      trips.push({ id: Date.now(), ...trip });
    }
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    return trip;
  },

  // Delete trip
  async deleteTrip(id) {
    const trips = await this.getTrips();
    const filtered = trips.filter(t => t.id !== id);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(filtered));
    return filtered;
  }
};
