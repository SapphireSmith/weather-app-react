import React from 'react'
import Search from '../assets/search.svg'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'
const Inputs = () => {
  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          type="text"
          placeholder='Search for city...'
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch
          size={35}
          className='text-white cursor-pointer transition ease-out hover:scale-125' />
        <UilLocationPinAlt
          size={35}
          className='text-white cursor-pointer transition ease-in-out hover:scale-125' />
      </div>

      <div className=' flex flex-row w-1/4 items-center justify-center'>
        <button className='metric text-xl text-white font-light'>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button className='imperial text-xl text-white font-light'>°F</button>
      </div>
    </div>
  )
}

export default Inputs