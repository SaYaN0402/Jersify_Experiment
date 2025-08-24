import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
        <div className='bg-zinc-800 text-white min-h-screen  '>
          <nav className=' w-full py-6 justify-between flex  items-center'>
            <GiHamburgerMenu className='w-8 h-8 ml-4'  />
            <img className=' m-auto w-35 h-16 cursor-pointer ' src="./src/assets/Screenshot 2025-08-20 003255.png" alt="JERSIFY" />
            <input type="text" placeholder='Search' className='rounded-2xl text-center m-auto  border border-gray-400 px-40 py-5' />
            <ul className='flex mx-auto space-x-6 justify-center px-10 py-4 gap-4 text-xl font-serif bg-emerald-300'>
              <li className='' >Home</li>
              <li  className='' >About</li>
              <li  className='' >Contact</li>             
            </ul>
            <button className='m-auto px-5 py-3 rounded hover:text-green-400 font-semibold text-4xl border text-center hover:scale-105'>SignUp</button>
            <FaShoppingCart className='w-8 h-8 mr-4' />

          </nav>
        </div>
    </>
  )
}

export default Navbar