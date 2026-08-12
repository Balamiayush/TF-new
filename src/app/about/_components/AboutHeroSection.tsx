import LayoutWrapper from '@/shared/layouts/wrapper/LayoutWrapper'
import Button from '@/shared/ui/buttons/Button'
import React from 'react'

export default function AboutHeroSection() {
  return (
<div className='  w-full h-[800px] lg:h-[728px] relative  bg-[#EDF4FF]  '>
        <LayoutWrapper>
            <div className=" w-full h-full flex lg:flex-row flex-col-reverse lg:items-end justify-between">
                  <div className='flex flex-col gap-4 lg:gap-8'>
                <h2 className=' text-[32px] lg:text-[48px]  font-medium md:max-w-[500px] lg:max-w-[699px] leading-[1.2]'>Humans at the Center. Compliance at the Foundation</h2>
                <div className=' flex flex-col gap-6 '>
                    <p className=' text-[#1A1A1ACC] max-w-[500px]'>Transforming users into verified identities boosts security and trust. This process should be seamless, ensuring swift onboarding while safeguarding our community.</p>
                    <div className=' flex gap-2'>
                        <Button variant='secondary'>
                            Read Manifesto
                        </Button>
                        <Button variant='ghost' >
                            Talk to Us
                        </Button>
                    </div>
                </div>
            </div>
            <div className="lg:w-[443px] w-[356px] h-[400px] max-lg:mb-[45px] lg:h-full mix-blend-multiply">
                <video className='w-full h-full ' src="https://tf-landing-puce.vercel.app/about-us/about-hero-video.webm" autoPlay loop muted>

                </video>
            </div>
          
            </div>
        </LayoutWrapper>
    </div>
  )
}
