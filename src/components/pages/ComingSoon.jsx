import { Rocket } from 'lucide-react';
import React from 'react'
import Ambassador from '@/components/pages/Ambassador';

const ComingSoon = () => {
  return (
    <div className='bg-black h-screen w-full'>
      <Ambassador />
      <div className='absolute w-full h-auto bg-black text-white text-center justify-center'>
        <span className='flex items-center justify-center text-center flex-col'>
          <Rocket className='mx-auto mt-40' size={100} />
          <h1 className='text-6xl font-bold pt-10'>Coming Soon</h1>
        </span>
        <p className='text-2xl mt-4'>Our website is under construction. Stay tuned!</p>
      </div>
    </div>
  )
}

export default ComingSoon;