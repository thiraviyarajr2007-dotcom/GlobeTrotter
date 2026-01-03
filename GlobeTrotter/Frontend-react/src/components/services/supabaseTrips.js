import { supabase } from './supabaseClient';

export const supabaseTripAPI = {
  async getTrips(userId) {
    const { data } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return data || [];
  },

  async saveTrip(trip, userId) {
    const { data, error } = await supabase
      .from('trips')
      .upsert({ ...trip, user_id: userId })
      .select()
      .single();
    return data;
  },

  async deleteTrip(id, userId) {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    return !error;
  }
};
