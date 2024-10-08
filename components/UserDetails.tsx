"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import { IdCardIcon } from "@radix-ui/react-icons";
import UserDetailsTable from "./UserDetailsTable";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserDetailsProps {
  user: {
    image: string;
    firstname: string;
    lastname: string;
    nationalid: string;
    whatsappnumber: string;
    email: string;
    isVerified: boolean;
    role: string;
    projects: any[];
  };
}

export default function UserDetails({ user }: UserDetailsProps) {
  const [projectList, setProjectList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const featchJobs = async () => {
      if (user.projects.length > 0) {
        user.projects.forEach(async (project) => {
          try {
            console.log('ran')
            const response = await axios.get(
              `/api/tasks/${project._id}`
            );
            setProjectList((prev) => [...prev, response.data]);
          } catch (error: any) {
            console.log({ error: error });
          }
        });
        
        setIsLoading(false);
      }
    };

    featchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-2xl capitalize text-center">{`${user.firstname} ${user.lastname}`}</CardTitle>
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
                {user.isVerified ? (
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-500" />
                )}
                <span>
                  Status : {user.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {!isLoading && <UserDetailsTable projects={projectList} userId={user.firstname} />}
    </div>
  );
}
