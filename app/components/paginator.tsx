import { useCallback } from "react";
import styles from './paginator.module.css'

interface PaginatorProps {
    setPage: (page: number) => void;
    setRows: (rows: number) => void;
    page: number;
    rows: number;
}

export default function Paginator({ setPage, setRows, page, rows }: PaginatorProps) {
    const setRowCount = useCallback(({ target }: { target: any }) => {
        setRows(Number(target.options[target.selectedIndex].value))
    }, [setRows])

    return (
        <div className={styles.paginator}>
            Rows per Page:&nbsp;
            <select  value={rows} onChange={setRowCount}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
            </select>
            <div className={styles.buttonContainer}>
                <button onClick={() => setPage(-1)}>{'<'}</button>
                <span>{`Page: ${page+1}`}</span>
                <button onClick={() => setPage(1)}>{'>'}</button>
            </div>
        </div>
    )
}