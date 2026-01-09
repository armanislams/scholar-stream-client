import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserId = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure()
        const { data: uid = '', isLoading } = useQuery({
          queryKey: ["users"],
          enabled: !authLoading && !!user?.email,
          queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data.userId;
          },
        });
    
    return {
        uidLoading: authLoading || isLoading,
        uid
    }
};

export default useUserId;