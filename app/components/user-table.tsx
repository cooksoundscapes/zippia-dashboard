import { useMemo } from 'react';
import { SortDirection, UserData  } from '../types';
import styles from './user-table.module.css'

export interface UserTableProps {
    userData: UserData[];
    sortBy: (column: string, direction: SortDirection) => void
    selectDetails: (details: UserData) => void
}

const headerEntries: { title: string; searchBy: string }[] = [
    {
        title: 'Name',
        searchBy: 'name'
    },
    {
        title: 'User Name',
        searchBy: 'username'
    },
    {
        title: 'E-mail',
        searchBy: 'email'
    },
    {
        title: 'Phone',
        searchBy: 'phone'
    },
    {
        title: 'City',
        searchBy: 'address.city'
    },
    {
        title: 'Web Site',
        searchBy: 'website'
    },
    {
        title: 'Company Name',
        searchBy: 'company.name'
    },
]

export default function UserTable({ userData, sortBy, selectDetails }: UserTableProps) {
    const dataRows = useMemo(() => {
        return userData.map((user) => (
            <tr className={styles.trow} key={user.id} onClick={() => selectDetails(user)}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address?.city}</td>
                <td>{user.website}</td>
                <td>{user.company?.name}</td>
            </tr>
        ))
    }, [selectDetails, userData])

    const tableHeader = useMemo(() => headerEntries.map(entry => (
        <th key={entry.title}>
            <div className={styles.header}>
                <span>{entry.title}</span>
                <div>
                    <button className={styles.sortingButton} onClick={() => sortBy(entry.searchBy, 'asc')}>▲</button>
                    <button className={styles.sortingButton} onClick={() => sortBy(entry.searchBy, 'desc')}>▼</button>
                </div>
            </div>
        </th>
    )), [sortBy])

    return (
        <table className={styles.tableBody}>
            <thead>
                <tr>
                    {tableHeader}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {dataRows}
            </tbody>
        </table>
    )
}