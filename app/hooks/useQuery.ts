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
        if (state.isFetching) return

        setState(prev => ({ ...prev, isFetching: true }))
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('An Error has occurred while fetching the users data.')
                }
                return res.json()
            })
            .then(json => setState({ result: json, isFetching: false }))
            .catch(err => router.push(`/error?msg=${encodeURIComponent(err.message)}`))
    }, [router, state.isFetching])

    return [trigger, state]
}