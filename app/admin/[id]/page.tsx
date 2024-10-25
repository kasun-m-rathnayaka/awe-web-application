"use client";
import UserDetails from "@/components/UserDetails";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [open, setOpen] = useState(false);
  const [projectList, setProjectList] = useState<any[]>([]);

  const [user, setUser] = useState({
    _id: "",
    image: "",
    firstname: "Loading ",
    lastname: "...",
    nationalid: "",
    whatsappnumber: "",
    email: "",
    isVerified: false,
    role: "",
    projects: []
  });

  const fetchUserAndProjects = async () => {
    try {
      const userResponse = await axios.get(`/api/writer/${params.id}`);
      const user = userResponse.data.user;
      setUser(user);
  
      const projects = user.projects || [];
  
      const projectDetails = await Promise.all(
        projects.map(async (project:any) => {
          const response = await fetch(`/api/tasks/${project._id}`);
          return response.json();
        })
      );
  
      setProjectList(projectDetails);
    } catch (error) {
      console.error('Error fetching user or project details:', error);
    }
  };
  

  useEffect(() => {
    fetchUserAndProjects();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <UserDetails user={user} projects={projectList}/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
