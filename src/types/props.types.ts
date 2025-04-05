import { ISort, IUser } from "@/types/user.types";

export interface IPaginationProps {
    totalPages: number;
    isFetching: boolean;
    range?: number;
    jumpSize?: number;
}

export interface ITableHeaderProps {
    onSortChange: (column: string) => void;
    sort: ISort;
}

export interface TableBodyProps {
    isLoading: boolean;
    error: Error | null;
    users: IUser[];
}

export interface ITableSkeletonProps {
    rowCount: number;
    columns: {
        width: string;
    }[];
}

export interface ISorterProps {
    sortColumn: string;
    currentSort: ISort;
}

export interface SearchInputProps {
    isFetching: boolean;
}