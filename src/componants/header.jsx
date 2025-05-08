import { useNavigate } from 'react-router-dom'
import '../css/header.css'
const Header = ()=>{
    const navigate = useNavigate()
    var firstname = localStorage.getItem('firstname')
    console.log(firstname)
    const handlelogout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    return(
        <>
        <div id="navbar-parent">
            <div id="logo">webphplearn.com</div>
            <ul class="nav-links">
                <input type="checkbox" id="checkbox-toggle"/>
                <label for="checkbox-toggle" class="hamburger">&#9776;</label>
                <div class="menu">
                <li><a onClick={()=>{navigate('/')}}>Home</a></li>
                {firstname == null &&
                <>
                    <li><a onClick={()=>{navigate('/registration')}}>Registration</a></li>
                    <li><a onClick={()=>{navigate('/login')}}>Log</a></li>
                </>
                }
                {firstname != null &&
                <>
                    <li><a onClick={()=>{navigate('/profile')}}>Profile</a></li>
                    <li><a onClick={()=>{navigate('/userlist')}}>User list</a></li>
                    <li><a onClick={handlelogout}>{firstname}(Logout)</a></li>
                </>
                }
                <li class="services">
                    <a href="services.html">Services</a> <i class="ri-arrow-up-s-fill"></i><i class="ri-arrow-down-s-fill"></i>
                    <ul class="dropdown">
                        <li><a href="react.html">React Js</a></li>
                        <li><a href="node.html">NodeJs</a></li>
                    </ul>
                </li>     
                <li><a>Contact</a></li>   
                </div>
            </ul>
        </div>

        </>
    )
}
export default Header