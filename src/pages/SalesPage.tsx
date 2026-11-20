import React from 'react'
import { useSales } from '../context/SalesContext'

const SalesPage = () => {
    const {sales} = useSales()
  return (
    <div className='flex justify-center flex-col items-center my-auto min-h-[90vh]'>
        <h1 className='text-2xl font-semibold text-center py-6 flex items-center gap-4'>Just Checking If my Context Works <span className='font-bold text-4xl'>{sales}</span></h1>
    </div>
  )
}

export default SalesPage