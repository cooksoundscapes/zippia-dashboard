'use client'
import { useCallback, useEffect, useMemo, useState } from "react"
import UserTable from "./components/user-table"
import { SortDirection, UserData } from "./types"
import DetailsModal from "./components/details-modal"
import Paginator from "./components/paginator"
import useQuery from "./hooks/useQuery"

export default function Home() {
    const [searchValue, setSearchValue] = useState("")
    const [detailsSelected, setDetailsSelected] = useState<UserData>()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [firstFetch, setFirstFetch] = useState(false)
    const [sorting, setSorting] = useState({
        column: 'name',
        direction: 'asc'
    })

    const [getUsersData, queryState] = useQuery<UserData[]>()

    const fetchUserData = useCallback(() => {
        let url = 'https://jsonplaceholder.typicode.com/users'
        
        url += `?&_start=${page * rowsPerPage}&_limit=${rowsPerPage}`
        if (searchValue.length > 0) {
            url += `&name_like=^${searchValue}`
        }
        url += `&_sort=${sorting.direction === 'asc' ? '' : '-'}${sorting.column}`
        getUsersData(url)
    }, [getUsersData, page, rowsPerPage, searchValue, sorting.column, sorting.direction])

    useEffect(() => {
        if (firstFetch) fetchUserData()
    }, [fetchUserData, firstFetch])

    const sortingFunc = useCallback((a: UserData, b: UserData) => {
        let aValue, bValue

        // Using switch case for simplicity; If more flexibility is required,
        // we could use something like "key.split('.').reduce ..."
        switch (sorting.column) {
            case 'address.city':
                aValue = a.address.city
                bValue = b.address.city
                break
            case 'company.name':
                aValue = a.company.name
                bValue = b.company.name
                break
            default:
                aValue = a[sorting.column]
                bValue = b[sorting.column]
                break
        }
        if (!aValue || !bValue) return 0
        if (sorting.direction === 'asc') {
            return (aValue as string).localeCompare(bValue as string)
        } else {
            return (bValue as string).localeCompare(aValue as string)
        }
    }, [sorting])

    const filteredOutput = useMemo(() => {
        if (!queryState.result) return []
        return queryState.result
            .filter(user => user.name.startsWith(searchValue))
            .sort(sortingFunc)
    }, [queryState.result, searchValue, sortingFunc])

    const sortBy = useCallback((column: string, direction: SortDirection) => {
        setSorting({ column, direction })
    }, [])

    const selectDetails = useCallback((details: UserData) => {
        setDetailsSelected(details)
    }, [])

    return (
        <main>
            <div className="user-input">
                <input 
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button onClick={() => setFirstFetch(true)}>Get Users List</button>
            </div>
            <UserTable userData={filteredOutput} sortBy={sortBy} selectDetails={selectDetails} />
            <Paginator
                setPage={(incr) => setPage(prev => Math.max(0, prev + incr))}
                setRows={setRowsPerPage}
                page={page}
                rows={rowsPerPage}
            />
            {
                detailsSelected ? 
                    <DetailsModal {...{...detailsSelected, onClose: () => setDetailsSelected(undefined) }} />
                : null
            }
        </main>
    )   
}