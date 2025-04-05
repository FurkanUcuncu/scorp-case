export interface IUser {
    id: string
    firstName: string
    lastName: string
    age: number
    gender: string
    address: {
        city: string
        country: string
    }
    email: string
}

export interface ISort {
    sort: string;
    direction: 'asc' | 'desc';
}

export interface IUserState {
    users: IUser[],
    filteredUsers: IUser[],
    currentFilter: string,
    currentGenderFilter: string,
    currentPage: number,
    sort: ISort,
    selectedUser: IUser | null,
    favorites: IUser[],
    total: number,
    isFetching: boolean,
    isLoading: boolean,
    error: Error | null
}

export interface IUserResponse {
    users: IUser[],
    total: number
}

export interface ITableColumn {
    key: string;
    label: string;
    width: string;
    sortable?: boolean;
    sortKey?: string;
}