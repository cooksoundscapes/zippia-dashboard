import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface QueryState<T> {
    isFetching: boolean;
    result?: T
}

export default function useQuery<T>(): [(url: string) => void, QueryState<T>] {
    const [state, setState] = useState<QueryState<T>>({
        isFetching: false,
    })
    const router = useRouter()

    const trigger = useCallback((url: string) => {
        setState(prev => ({ ...prev, isFetching: true }))
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error()
                }
                return res.json()
            })
            .then(json => setState({ result: json, isFetching: false }))
            .catch(err => router.push(`/error`))
    }, [router])

    return [trigger, state]
}