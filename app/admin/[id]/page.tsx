"use client";
import UserDetails from "@/components/UserDetails";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
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
  
  const featchUser = async () => {
    try {
      const response = await axios.get(`/api/writer/${params.id}`);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error: any) {
      console.log({ error: error });
    }
  };

  useEffect(() => {
    featchUser();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {!isLoading && <UserDetails user={user} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
