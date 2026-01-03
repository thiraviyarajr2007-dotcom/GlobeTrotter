import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase'; // or localStorage

export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await supabase.from('trips').select('*').limit(100);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5min cache
    suspense: true, // React 18 streaming
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trip) => supabase.from('trips').insert([trip]).select(),
    onSuccess: () => queryClient.invalidateQueries(['trips']),
  });
};
import axios from "axios";

export const getTrips = () =>
  axios.get("http://localhost:5000/api/trips");
