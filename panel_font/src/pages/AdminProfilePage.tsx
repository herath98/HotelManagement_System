import { Card } from '@/components/common/ui/card'
import ProfileCard from '@/features/admin/components/ProfileCard'
import ProfileForm from '@/features/admin/components/ProfileForm'
import React from 'react'



export default function AdminProfilePage() {
    return (
        <div className='min-h-screen '>
               <div className='mb-5'>
            <Card className="h-24 px-4 flex items-center" >
                <div>  <h2 className="text-[22px]   items-center text-dark-gray">Admin Profile</h2>
                <p>Update Status <span className="bg-light-gray px-2 py-1 text-[12px] rounded ml-1">last update 5 min. ago</span></p></div>
              
                </Card>
            
        </div>
            <Card className='h-64 bg-gradient-to-r from-gray-400 to-gray-300'>
     
            </Card>
            <div className='flex -mt-32  mx-5 gap-4'>
                <div className='w-[500px]'>
                    <ProfileCard name={"Spencer Robin"}
                        designation={"Software Development Manager"}
                        city={"Hamburg"}
                        country={"Germany"}
                        email={"spencer.robin22@example.com"}
                        phone={"+1 (222) 111 - 57840"}
                        experience={"10 Years"}
                        age={28}
                        avatarUrl={"/placeholder.svg"} />
                </div>
                <div className='w-full'>
                    <ProfileForm/>
                </div>

            </div>

        </div>
    )
}
