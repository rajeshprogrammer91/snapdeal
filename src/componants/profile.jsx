import { useEffect, useState } from "react"
import axios from 'axios'
const Profile = ()=>{
    const [firstname,setfirstname] = useState('')
    const [lastname,setlastname] = useState('')
    const [mobileno,setmobileno] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    var users_id = localStorage.getItem('users_id')
    console.log(users_id)
    useEffect(()=>{
        axios.get('https://api.uncodecart.com/users/singleuserlist/'+users_id).then((response)=>{
            setfirstname(response.data.message[0].firstname)
            setlastname(response.data.message[0].lastname)
            setmobileno(response.data.message[0].mobileno)
            setemail(response.data.message[0].email)
            setpassword(response.data.message[0].password)
        })
    },[users_id])
    return(
        <>
        {firstname}
        {lastname}
        </>
    )
}
export default Profile