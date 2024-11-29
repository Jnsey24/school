import React , {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles, { layout } from "../style";
import {jwtDecode} from 'jwt-decode';
import Footer from '../pages/Footer';


const Dashboard = () =>{
    const navigate = useNavigate();
    const [token,setAuthToken]= useState(localStorage.getItem('token') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role,setUserRole] = useState('');
    const [id,setid] =useState('');

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        setAuthToken(token); 
        setIsLoggedIn(true);
        setid(jwtDecode(token).id);
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole);
      }
    },[])

    const handleLogin = () => {
      navigate('/login');
    };

    
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setAuthToken('');
      setIsLoggedIn(false);
      setUserRole('');
      navigate('/');
    };

    const Handledetails = () =>{
      if(isLoggedIn && role){
        navigate(`/${role}/${id}`);
      }
      else{
        navigate('/login');
      }
    }
  


return(
    <div className={`${layout.sectionReverse}  ${styles.boxWidth} py-6 space-y-4`}>


  <div className={`flex justify-center items-center py-4 ${styles.heading2}`}>
     <h1>School Management System</h1>
    </div>
 
    <div  className={`${layout.sectionInfo}  ${styles.boxWidth} pr-3`}>
    {
      !isLoggedIn ? (
        <>
          <button
        onClick={handleLogin}
        className={`py-1 px-4 font-poppins font-medium text-[40px] text-primary bg-grey-gradient rounded-[15px] outline-none ${styles.button}`}>
         Login IN
       </button>
        </>
       ):( 
       <>
        <button
        onClick={handleLogout} 
        className={`py-1 px-4 font-poppins font-medium text-[40px] text-primary bg-grey-gradient rounded-[15px] outline-none ${styles.button}`}>
         Logout
       </button>
       </>
      )
     }  
    
    
  </div>

  <div className={`${layout.sectionInfo} ${styles.flexCenter}`}>
    <h2 className={styles.heading2}>
      Platform to Handle your <br className="sm:block hidden" /> School Data
    </h2>
    <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
    SMS is an online platform designed to streamline and simplify school management by providing a  space for administrators, teachers and students
    </p>
  </div>
  <div className={`${layout.sectionInfo} ${styles.flexCenter} py-6 space-y-4`}>
        <button
         onClick= {Handledetails}
         className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles.heading2}`}>
          VIEW DETAILS
        </button>
      </div>

      <Footer />

</div>

)
};
export default Dashboard;