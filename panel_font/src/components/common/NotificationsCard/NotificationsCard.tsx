import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/ui/avatar"
import { Badge } from "@/components/common/ui/badge"
import { Button } from "@/components/common/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card"
import { ScrollArea } from "@/components/common/ui/scroll-area"
import { Gift, MoreVertical, ShoppingCart, X } from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'comment' | 'follow' | 'offer'
  title: string
  description: string
  time: string
  avatar?: string
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Updates',
    description: 'Order #54321 has been shipped.',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Comment on Post',
    description: 'Reacted: John Richard on your next p...',
    time: '2 hours ago',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    type: 'follow',
    title: 'Follow Request',
    description: 'Kelin Brown has sent you the request.',
    time: '1 Day ago',
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    type: 'offer',
    title: 'Exclusive Offers',
    description: 'Enjoy 20% off on your next purchase!',
    time: '5 hours ago'
  }
]

export default function NotificationsCard() {
  return (
    <Card className="w-[380px] border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Notifications</CardTitle>
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className="bg-purple-500 hover:bg-purple-500/90 text-white"
          >
            4 Unread
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 border-b-[1px] hover:rounded-lg p-3 hover:bg-muted/50 relative group"
              >
                <div className="flex-shrink-0 ">
                  {notification.type === 'order' && (
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                  )}
                  {notification.type === 'offer' && (
                    <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                      <Gift className="h-5 w-5" />
                    </div>
                  )}
                  {(notification.type === 'comment' || notification.type === 'follow') && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex-1  space-y-1">
                  <p className="text-sm font-medium leading-none  group-hover:text-purple-500">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.type === 'order' && (
                      <>
                        Order <span className="text-pink-500">#{notification.description.match(/\d+/)?.[0]}</span> has been shipped.
                      </>
                    )}
                    {notification.type === 'comment' && (
                      <>
                        Reacted: <span className="text-[#ff7b72]">{notification.description.split(':')[1]}</span>
                      </>
                    )}
                    {notification.type === 'follow' && (
                      <>
                        <span className="text-blue-500">{notification.description.split(' has')[0]}</span> has sent you the request.
                      </>
                    )}
                    {notification.type === 'offer' && (
                      <>
                        Enjoy <span className="text-green-500">20% off</span> on your next purchase!
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button className="w-full bg-[#5C67F7] mt-4  hover:bg-blue-700">
          View All
        </Button>
      </CardContent>
    </Card>
  )
}

