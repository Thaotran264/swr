import Link from 'next/link'
import React from 'react'

const Card = ({ user }) => {
    return (
        <div className='card'>
            <Link href={`/users/${user?.id}`} >
                <a style={{ display: 'block' }}>
                    {/* <h2>{user.name}</h2> */}
                    <img src={user.avatar} alt={user.avatar} /></a></Link>
        </div >
    )
}

export default Card