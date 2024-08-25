import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import VerifyEmail from './components/VerifyEmail'
import ForgetPassword from './components/ForgetPassword'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <>
    <section className="">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Profile/>}/>
          <Route path="/otp/verify" element={<VerifyEmail/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
        </Routes>
      </Router>
    </section>
    </>
  )
}

export default App
