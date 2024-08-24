'use client'

import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
    const params = useSearchParams()

    return (
        <div style={{
            marginTop: '15%',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            color: '#4e4e4e',
        }}>
            <h2 style={{ color: '#ff474c'}}>Warning:</h2>
            <h2>{params.get('msg')}</h2>
        </div>
    )
}