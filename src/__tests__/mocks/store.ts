import { IUser } from '@/types/user.types';
import { defineStore } from 'pinia';

export const useMockUserStore = defineStore('user', {
  state: () => ({
    users: [] as IUser[],
    selectedUser: null as IUser | null,
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    total: 0,
    query: '',
    gender: '',
    sort: {
      sort: 'id',
      direction: 'asc'
    }
  }),
  actions: {
    async getUsers() {
      this.isLoading = true;
      try {
        // Mock API response
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        this.users = data.users;
        this.total = data.total;
      } catch (error) {
        this.error = 'Error loading users';
      } finally {
        this.isLoading = false;
      }
    },
    setSelectedUser(user: IUser) {
      this.selectedUser = user;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setQuery(query: string) {
      this.query = query;
    },
    setGender(gender: string) {
      this.gender = gender;
    },
    setSort(sort: string, direction: 'asc' | 'desc' | 'none') {
      this.sort.sort = sort;
      this.sort.direction = direction;
    }
  }
}); 