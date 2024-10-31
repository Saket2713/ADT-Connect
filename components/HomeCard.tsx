import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface HomeCardProps{
    className: string,
    img:string,
    title: string,
    description:string,
    handleClick:()=> void;

}
const HomeCard = ({className,img,title,description,handleClick}:HomeCardProps) => {
  return (
    <div className= {cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-auto  min-h-[260px] rounded-[14px] cursor=pointer', className)}
        onClick = {handleClick} >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image src={img} alt='Meeting'
                width={30} height={30}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>
                    {title}
                    <p className='text-lg font-normal'>{description}</p>
                </h1>

            </div>
        </div>
  )
}

export default HomeCard