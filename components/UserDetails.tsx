'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import { IdCardIcon } from "@radix-ui/react-icons";
import UserDetailsTable from "./UserDetailsTable";

interface Project {
  _id: string;
  deadline: string;
  description: string;
  employer: string;
  name: string;
  paid: number;
  payment: number;
  status: string;
  writer: string;
  __v: number;
}

interface UserDetailsProps {
  user: {
    _id: string;
    image: string;
    firstname: string;
    lastname: string;
    nationalid: string;
    whatsappnumber: string;
    email: string;
    verifyed: boolean;
    role: string;
    projects: Project[];
  };
  projects: Project[];
}

export default function UserDetails({ user, projects }: UserDetailsProps) {
  console.log(user)
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-2xl capitalize text-center">{`${user.firstname} - ${user.lastname}`}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <IdCardIcon className="w-5 h-5 text-gray-500" />
                <span>National ID: {user.nationalid}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>WhatsApp: {user.whatsappnumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>Email : {user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                {user.verifyed ? (
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-500" />
                )}
                <span>
                  Status : {user.verifyed ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <UserDetailsTable userId={user._id} projectlist={projects}/>
    </div>
  );
}
