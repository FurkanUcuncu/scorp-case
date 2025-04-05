import { useUserStore } from '@/stores/userStore';
import { IUserResponse } from '@/types/user.types';
import { API_URL } from '@/utils/constants';
import { storeToRefs } from 'pinia';

export const useUsers = () => {
    const userStore = useUserStore();
    const { sort, currentPage } = storeToRefs(userStore);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                `${API_URL}/users?limit=10&skip=${(currentPage.value - 1) * 10}&sortBy=${sort.value.sort}&order=${sort.value.direction}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            
            const data: IUserResponse = await response.json();

            return {
                users: data.users,
                total: data.total
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    return {
        fetchUsers
    };
};
