import React from 'react'
import Card from './Card'

const Page = ({ users }) => {
    return (
        <div className='page-content'>
            {
                users && users?.map(user =>
                    <Card key={user.id} user={user} />)
            }
        </div>
    )
}

export default Page