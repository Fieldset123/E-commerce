import React from 'react'
import { IoIosClose } from "react-icons/io";
const DisplayImage = ({
  imgUrl,
  onClose
}) => {
  
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center scale-100'>
      <div className='bg-white shadow-lg rounded  mx-auto p-4 max-w-[90vh] max-h-[85vh]'>
      <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
               <IoIosClose />
            </div>
      <div className='flex justify-center p-4 max-w-[85vh] max-h-[80vh]'>
      <img src={imgUrl} className='w-full h-full'/>
    </div>
      </div>   
    </div>
    
  )
}

export default DisplayImage