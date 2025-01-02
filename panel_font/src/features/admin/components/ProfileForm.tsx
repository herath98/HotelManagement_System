/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from 'react'
import { Badge } from "@/components/common/ui/badge"
import { Button } from "@/components/common/ui/button"
import { X } from 'lucide-react'
import { ProfileFormData } from '../types/input-types'
import { CustomInput } from '@/components/common/Inputs/CustomInput'
import { Card } from '@/components/common/ui/card'


const initialSkills = [
    "Leadership", "Project Management", "Data Analysis", "Marketing Strategy",
    "Graphic Design", "Content Creation", "Market Research", "Client Relations",
    "Event Planning", "Budgeting and Finance", "Negotiation Skills", "Team Collaboration",
    "Adaptability"
]

export default function ProfileForm() {
    const [formData, setFormData] = useState<ProfileFormData>({
        userName: 'Spencer Robin',
        firstName: 'Spencer',
        lastName: 'Robin',
        designation: 'Software Development Manager',
        email: 'spencer.robin22@example.com',
        phone: '+1 (222) 111 - 57840',
        website: 'www.yourwebsite.com',
        location: 'City, Country',
        github: 'github.com/spruko',
        twitter: 'twitter.com/spruko.me',
        linkedin: 'linkedin.com/in/spruko',
        portfolio: 'spruko.com/',
        biographicalInfo: "Hello, I'm [Your Name], a dedicated [Your Profession/Interest] based in [Your Location]. I have a genuine passion for [Your Hobbies/Interests] and enjoy delving into the nuances of [Your Industry/Field]. Specializing in [Your Specialization/Area of Expertise].",
        skills: initialSkills
    })

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const removeSkill = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skill)
        }))
    }

    return (
        <Card className=' mx-auto p-6 space-y-8'>
            <form className="space-y-8">
                <h2 className="text-xl font-semibold">Personal Info :</h2>
                <div className="gap-6 grid grid-cols-2">

                    <CustomInput
                        type="text"
                        label="User Name "
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="First Name "
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Last Name "
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Designation "
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                </div>
                <h2 className="text-xl font-semibold">Contact Info </h2>
                <div className="gap-6 grid grid-cols-2">

                    <CustomInput
                        type="email"
                        label="Email "
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Phone "
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Website "
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Location "
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                </div>

                <h2 className="text-xl font-semibold">Social Info </h2>
                <div className="gap-6 grid grid-cols-2">

                    <CustomInput
                        type="text"
                        label="Github "
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Twitter "
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="LinkedIn "
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                    <CustomInput
                        type="text"
                        label="Portfolio "
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        flexInputText='text-black flex min-w-32  my-auto'
                    />
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">About Info :</h2>
                    <CustomInput
                        type="textarea"
                        label="Biographical Info "
                        name="biographicalInfo"
                        value={formData.biographicalInfo}
                        onChange={handleInputChange}
                        flexInput='flex gap-4 text-black'
                        flexInputText='text-black flex min-w-32 my-auto'
                    />
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">SKILLS :</h2>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                            <Badge
                                key={skill}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1"
                            >
                                {skill}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 ml-2 hover:bg-transparent"
                                    onClick={() => removeSkill(skill)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button
                        type="submit"
                        className="w-full bg-[#5C67F7] max-w-40  text-white py-2 rounded hover:bg-opacity-90 transition duration-300 mt-6"
                    >
                        Update
                    </Button>
                </div>

            </form>
        </Card>
    )
}

