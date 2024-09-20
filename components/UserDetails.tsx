import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, CheckCircle, XCircle } from "lucide-react"

interface Project {
  name: string
  description: string
  deadline: string
  payment: number
  paid: number
  status: string
  employer: string
}

interface UserDetailsProps {
  user: {
    image: string
    firstName: string
    lastName: string
    nationalId: string
    whatsappNumber: string
    email: string
    isVerified: boolean
    role: string
  }
  // projects: Project[]
}

export default function UserDetails({ user }: UserDetailsProps) {
  console.log(user)
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-2xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            {/* <Avatar className="w-24 h-24">
              <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar> */}
            <div>
              <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
              <Badge variant="outline" className="mt-1">
                {user.role}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {/* <IdCard className="w-5 h-5 text-gray-500" /> */}
                <span>National ID: {user.nationalId}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>WhatsApp: {user.whatsappNumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                {user.isVerified ? (
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-500" />
                )}
                <span>{user.isVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Ongoing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>${project.payment.toFixed(2)}</TableCell>
                  <TableCell>${project.paid.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.employer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  )
}