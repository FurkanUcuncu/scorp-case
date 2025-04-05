import { useUsers } from '@/composables/useUsers';
import { ISort, IUser, IUserState } from '@/types/user.types';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({
        users: [],
        filteredUsers: [],
        currentFilter: '',
        currentGenderFilter: '',
        currentPage: 1,
        sort: {
            sort: '',
            direction: 'asc'
        },
        selectedUser: null,
        favorites: [],
        total: 0,
        isFetching: false,
        isLoading: true,
        error: null
    }),

    actions: {
        async getUsers() {
            this.isFetching = true;
            const { fetchUsers } = useUsers();
            try {
                const result = await fetchUsers();
                this.users = result.users;
                this.total = result.total;
                this.error = null;
                
                if (this.currentFilter || this.currentGenderFilter) {
                    this.applyFilters();
                } else {
                    this.filteredUsers = result.users;
                }
            } catch (err) {
                this.error = err as Error;
                this.users = [];
            } finally {
                this.isFetching = false;
                this.isLoading = false;
            }
        },

        setUsers(users: IUser[]) {
            this.users = users;
        },

        setFilteredUsers(city: string) {
            this.currentFilter = city;
            this.applyFilters();
        },

        setGenderFilter(gender: string) {
            this.currentGenderFilter = gender;
            this.applyFilters();
        },

        applyFilters() {
            let filtered = [...this.users];
            
            if (this.currentFilter) {
                filtered = filtered.filter(user => 
                    user.address.city.toLowerCase().includes(this.currentFilter.toLowerCase())
                );
            }
            
            if (this.currentGenderFilter) {
                filtered = filtered.filter(user => 
                    user.gender.toLowerCase() === this.currentGenderFilter.toLowerCase()
                );
            }
            
            this.filteredUsers = filtered;
            this.isFetching = false;
        },

        setTotal(total: number) {
            this.total = total;
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
        },

        setSort(sort: ISort) {
            this.sort = sort;
        },

        setSelectedUser(user: IUser | null) {
            this.selectedUser = user;
        },

        addToFavorites(user: IUser) {
            if (!this.favorites.some(fav => fav.id === user.id)) {
                this.favorites.push(user);
            }
        },

        removeFromFavorites(userId: string) {
            this.favorites = this.favorites.filter(user => user.id !== userId);
        },

        setFetching(fetching: boolean) {
            this.isFetching = fetching;
        }
    },
    getters: {
        isFavorite: (state) => (userId: string) => {
            return state.favorites.some(user => user.id === userId);
        }
    }
}); 