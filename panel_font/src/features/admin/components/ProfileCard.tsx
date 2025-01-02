import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/common/ui/card"
import { Building2, MapPin } from 'lucide-react'

interface ProfileCardProps {
  name: string
  designation: string
  city: string
  country: string
  email: string
  phone: string
  experience: string
  age: number
  avatarUrl?: string
}

export default function ProfileCard({
  name ,
  designation ,
  city ,
  country ,
  email ,
  phone ,
  experience ,
  age,
  avatarUrl
}: ProfileCardProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{designation}</p>
          <div className="flex items-center text-[12px] justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{city}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{country}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
    

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-orange-500">Basic Info :</h3>
          <div className="space-y-3 text-[12px]">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Name :</span>
              <span className="col-span-2 text-muted-foreground">{name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Designation :</span>
              <span className="col-span-2 text-muted-foreground">{designation}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Email :</span>
              <span className="col-span-2 text-muted-foreground">{email}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Phone :</span>
              <span className="col-span-2 text-muted-foreground">{phone}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Experience :</span>
              <span className="col-span-2 text-muted-foreground">{experience}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Age :</span>
              <span className="col-span-2 text-muted-foreground">{age}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

