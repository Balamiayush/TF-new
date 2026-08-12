import LayoutWrapper from '@/shared/layouts/wrapper/LayoutWrapper'
import Button from '@/shared/ui/buttons/Button'
import React from 'react'

export default function AboutHeroSection() {
  return (
<div className='  w-full h-screen relative flex bg-[#EDF4FF] items-center  '>
        <LayoutWrapper>
            <div className="w-full h-[356px] lg:hidden">
                <video src="" autoPlay loop muted></video>
            </div>
            <div className='flex flex-col gap-4 lg:gap-8'>
                <h2 className=' text-[32px] lg:text-[48px]  font-medium max-w-[699px] leading-[1.2]'>Humans at the Center. Compliance at the Foundation</h2>
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
        </LayoutWrapper>
    </div>
  )
}
