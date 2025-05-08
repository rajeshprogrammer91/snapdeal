import { useEffect, useState } from 'react'
import '../css/registration.css'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const Registration = ()=>{
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate();
    console.log(location.pathname.split('/')[1])
    console.log(params)
    const [firstname,setfirstname] = useState('')
    const [lastname,setlastname] = useState('')
    const [mobileno,setmobileno] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [forminfo,setforminfo] = useState('')
    const [formname,setformname] = useState('')
    const [buttonname,setbuttonname] = useState('')
    const nameExpression = /^[a-zA-Z]{5,10}$/
    useEffect(()=>{
        if(location.pathname.split('/')[1]=='edit'){
            setformname('Update form')
            setbuttonname('Update')
            axios.get('https://api.uncodecart.com/users/singleuserlist/'+params.id).then((response)=>{
                setfirstname(response.data.message[0].firstname)
                setlastname(response.data.message[0].firstname)
                setmobileno(response.data.message[0].mobileno)
                setemail(response.data.message[0].email)
                setpassword(response.data.message[0].password)
            })
        }
        if(location.pathname.split('/')[1]=='registration'){
            setformname('Registration form')
            setbuttonname('Registration')
        }
        if(location.pathname.split('/')[1]=='login'){
            setformname('Login form')
            setbuttonname('Login')
        }
        
    },[])
    const handleFirstname = (event)=>{
        setfirstname(event.target.value)
    }
    const handleLastname = (event)=>{
        setlastname(event.target.value)
    }
    const handleMobileno = (event)=>{
        setmobileno(event.target.value)
    }
    const handleEmail = (event)=>{
        setemail(event.target.value)
    }
    const handlePassword = (event)=>{
        setpassword(event.target.value)
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        let formData = {firstname:firstname,lastname:lastname,mobileno:mobileno,email:email,password:password}
        if(location.pathname.split('/')[1]=='edit'){
            axios.put('https://api.uncodecart.com/users/updateuser/'+params.id,formData).then((response)=>{
                navigate('/userlist')
            })
        }else if(location.pathname.split('/')[1]=='registration'){
            if(firstname == ""){
                setforminfo('First name cannot be empty')
            }else if(!firstname.match(nameExpression)){
                setforminfo('First name Should be only letters')
            }else{
                axios.post('https://api.uncodecart.com/users/registration',formData).then((response)=>{
                    setforminfo(response.data.message)
                    setfirstname('')
                    setlastname('')
                    setpassword('')
                    setemail('')
                    setmobileno('')
                })
            }
           
        }else{
            axios.post('https://api.uncodecart.com/users/login',formData).then((response)=>{
                if(response.data.message == 'Either password or email is wrong'){
                    setforminfo(response.data.message)
                }else{
                    localStorage.setItem('firstname',response.data.message[0].firstname)
                    localStorage.setItem('users_id',response.data.message[0].users_id)
                    navigate('/userlist')
                }
            })
        }
    }
    return(
        <>
        <div id="form-top-container">
            <div id="form-container">
                <div class="header-form">{formname} </div>
                <div>{forminfo}</div>
                <form class="form">
        { buttonname != 'Login' && 
            <>
                <div class="input-box">
                    <label for="firstname">First name </label>
                    <input type="text" placeholder="First name" value={firstname} onChange={handleFirstname}/>
                </div>
                <div class="input-box">
                    <label for="lastname">Last name </label>
                    <input type="text" placeholder="Last name" value={lastname} onChange={handleLastname}/>
                </div>
                <div class="input-box">
                    <label for="mobileno">Mobile no </label>
                    <input type="text" placeholder="Mobile no" value={mobileno} onChange={handleMobileno}/>
                </div>
                </>
        }
                <div class="input-box">
                    <label for="email">Email </label>
                    <input type="text" placeholder="Email" value={email} onChange={handleEmail}/>
                </div>
                <div class="input-box">
                    <label for="password">Password</label>
                    <input type="text" placeholder="Password" value={password} onChange={handlePassword}/>
                </div>
                <input type="submit" value={buttonname} onClick={handleSubmit}/>
                </form>
                </div>
            </div>

        </>
    )
}
export default Registration