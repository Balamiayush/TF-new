import React from 'react'
import AboutHeroSection from './_components/AboutHeroSection'
import OurMission from './_components/OurMissionSection'
import TimelineSection from './_components/TimelineSection'
import LeadershipTeam from './_components/LeadershipTeam'
import BuiltInNepalSection from './_components/BuiltInNepalSection'

export default function page() {
  return (
    <div className='w-full h-full relative'>
<AboutHeroSection/>
<OurMission/>
<TimelineSection/>
<LeadershipTeam/>
<BuiltInNepalSection/>
    </div>
  )
}
