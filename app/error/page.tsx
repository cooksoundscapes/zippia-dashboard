'use client'

export default function ErrorPage() {

    return (
        <div style={{
            marginTop: '15%',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            color: '#4e4e4e',
        }}>
            <h2 style={{ color: '#ff474c'}}>Warning:</h2>
            <h2>An Error has occurred while fetching the users data.</h2>
        </div>
    )
}