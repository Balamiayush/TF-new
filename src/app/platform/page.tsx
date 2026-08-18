
import LayoutWrapper from '@/shared/layouts/wrapper/LayoutWrapper'
import PlatFormHeroSection from './_components/PlatFormHeroSection'
import ScrollAnimationSection from './_components/ScrollAnimationSection'
import ModularBlocksSection from './_components/ModularBlocksSection'
import BehindObsidian from './_components/BehindObsidian'
import Infrastructure from '../(home-page)/_components/InfrastructureSection'
import ReadAllStories from '../(home-page)/_components/ReadAllStoriesSection'
import StartVerifyingSection from '../(home-page)/_components/StartVerifyingSection'
export default function page() {
  return (
   <div className="w-full h-full relative">
    <PlatFormHeroSection/>
    <div className=" py-30">
      <LayoutWrapper className='flex flex-col items-center gap-12 text-center'>
      <p className='text-slate-800  tracking-[-0.3px] text-[20px] leading-[1]'>Why obsidian platform</p>
      <p className='text-[40px] max-w-[803px] text-black font-medium leading-[120%] tracking-[-0.3px]'>A trust operating platform that unifies identity, risk, workflows, and decision intelligence in one platform.</p>
      </LayoutWrapper>
    </div>
    <ScrollAnimationSection/>
    <ModularBlocksSection/>
         <Infrastructure />
   <ReadAllStories/>
   <StartVerifyingSection/>
    <BehindObsidian/>
   </div>
  )
}
