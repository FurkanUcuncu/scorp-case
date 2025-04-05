import { ITableColumn } from "@/types/user.types";

export const API_URL: string = 'https://dummyjson.com';

export const tableSkeletonColumnWidths: { width: string }[] = [
    {width: '10%'},
    {width: '20%'},
    {width: '10%'},
    {width: '10%'},
    {width: '15%'},
    {width: '35%'}
]

export const tableColumns: ITableColumn[] = [
    { key: 'id', label: 'ID', width: 'w-[10%]' },
    { key: 'name', label: 'Fullname', width: 'w-[20%]', sortable: true, sortKey: 'firstName' },
    { key: 'age', label: 'Age', width: 'w-[10%]', sortable: true, sortKey: 'age' },
    { key: 'gender', label: 'Gender', width: 'w-[10%]' },
    { key: 'city', label: 'City', width: 'w-[15%]' },
    { key: 'email', label: 'Email', width: 'w-[35%]' }
];