import React,{useState} from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link,Navigate, useNavigate} from 'react-router-dom'
import loginIcons from '../assest/signin.gif'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common';
import {toast} from "react-toastify"
const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

    const[data,setData]=useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      profilePic:""

    })
  
  
    const handleChange=(e)=>{
      const{name,value}=e.target
      setData((preve)=>{
        return{
          ...preve,
          [name]:value
        }
      })
    }
    
    const handleUploadPic=async(e)=>{
        const file=e.target.files[0]

        const imagePic=await imageTobase64(file)
        setData((preve)=>{
            return{
                ...preve,
                profilePic:imagePic
        }
        })
    }

    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(data.password===data.confirmPassword){
        const dataResponse= await fetch(SummaryApi.signUp.url,{
          method:SummaryApi.signUp.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
  
        const dataApi=await dataResponse.json() 
        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login");
        }
        if(dataApi.error){
          toast.error(dataApi.message)
        }
        
      }
      else{
        toast.error("Password doesn't matched")
        console.log("Please check password and confirm password")
      }
      
    }
  
   


  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-4 w-full max-w-sm rounded-lg mx-auto '>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
               <img src={data.profilePic || loginIcons} alt='login icons' />
            </div>
        <form>
            <label>
            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full '>
               Upload Photo 
            </div>
            <input type='file' className='hidden' onChange={handleUploadPic}/>
            </label>
            
        </form>
            
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

          <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input 
                type='text' 
                placeholder='Enter your name' 
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>


            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input 
                type='email' 
                placeholder='Enter your email' 
                name='email'
                value={data.email}
                onChange={handleChange}
                required
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
                required
                className='w-full h-full outline-none bg-transparent pl-2' />
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
            </div>

            <div classNmae='grid'>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 py-2 flex items-center'>
                <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder='Confirm password' 
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent pl-2' />
                <div className='cursor-pointer text-xl' onClick={() => showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true)} >
                  <span>
                    {
                      showConfirmPassword ? (
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

        
            </div>


            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
          </form>

          <p className='my-5 '>Already have an account? <Link to='/login' className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp