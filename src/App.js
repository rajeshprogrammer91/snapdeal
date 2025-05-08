import logo from './logo.svg';
import './App.css';
import './css/test.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/homepage';
import Registrationpage from './pages/registrationpage';
import Userlistpage from './pages/userlistpage';
import Editpage from './pages/editpage';
import Loginpage from './pages/loginpage';
import Profilepage from './pages/profilepage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/registration' element={<Registrationpage/>} />
        <Route path='/login' element={<Loginpage/>} />
        <Route path='/edit/:id' element={<Editpage/>} />
        <Route path='/userlist' element={<Userlistpage/>}/>
        <Route path='/profile' element={<Profilepage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  
  );
}

export default App;
