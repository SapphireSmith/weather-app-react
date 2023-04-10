import React from 'react'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherServices'

const Forcast = ({ title, items }) => {
    return (
        <div className='mb-10'>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>
                    {title}
                </p>
            </div>
            <hr className='my-3' />

            <div className='flex flex-row items-center justify-between text-white'>

                {
                    items.map((item, index) => (
                        <div
                        key={index}
                        className='flex flex-col items-center justify-center'>
                            <p className='font-light text-sm'>{item.title}</p>
                            <img
                                src={iconUrlFromCode(item.icon)}
                                className='w-12'
                                alt="" />
                            <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                        </div>
                    ))


                }

            </div>
        </div>
    )
}

export default Forcast