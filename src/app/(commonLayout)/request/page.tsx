import BuddyRequestsPage from '@/components/modules/BuddyRequest/BuddyRequest'
import React from 'react'
export const dynamic = "force-dynamic";


export default function page() {
  return (
    <div className='mt-4 mb-4 pl-4 pr-4'>
      <BuddyRequestsPage/>
    </div>
  )
}
