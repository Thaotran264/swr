import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const User = () => {
    const router = useRouter()
    const { id } = router.query
    const [user, setUser] = useState()
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/users/${id}`)
            console.log(res)
        }
        getData()
    }, [])
    return (
        <div>User</div>
    )
}

export default User