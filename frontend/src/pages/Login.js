import React, { useState,useContext} from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import Context from '../context';
const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const[data,setData]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate();
  const {fetchUserDetails,fetchUserAddToCart}=useContext(Context);


  const handleChange=(e)=>{
    const{name,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const dataResponse=await fetch(SummaryApi.signIn.url,{
      method:SummaryApi.signIn.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const dataApi=await dataResponse.json();//converting to json format
    if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
        fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  console.log(data);
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-4 w-full max-w-sm rounded-lg mx-auto '>
          <div className='w-20 h-20 mx-auto rounded'>
            <img src={loginIcons} alt='login icons' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input 
                type='email' 
                placeholder='Enter your email' 
                name='email'
                value={data.email}
                onChange={handleChange}
                className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div classNmae='grid'>
              <label>Password:</label>
              <div className='bg-slate-100 py-2 flex items-center'>
                <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter password' 
                name='password'
                value={data.password}
                onChange={handleChange}
                className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)} >
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>

              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    Forgot password ?
              </Link>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>

          <p className='my-5 '>Don't have account? <Link to='/sign-up' className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login