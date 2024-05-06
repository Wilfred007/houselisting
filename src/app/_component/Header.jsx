import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div>
      <h2>HouseNation</h2>
      <ul className='md:flex gap-10'>
        <li>
          For Sale
        </li>
        <li>
          For Rent
        </li>
        <li>
          Agent Finder
        </li>
      </ul>
      </div>
      <div className='flex gap-2'>
      <Button className='flex gap-2'><Plus className='h-5 w-5'  />Post Ads</Button>
      <Button variant='ghost'>Login</Button>
      </div>
    </div>
  )
}

export default Header
