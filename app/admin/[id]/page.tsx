"use client";
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState({
    image: "",
    firstName: "",
    lastName: "",
    nationalId: "",
    whatsappNumber: "",
    email: "",
    isVerified: false,
    role: ""
  });
  const featchUser = async () => {
    try {
      const response = await axios.get(`/api/writer/${params.id}`);
      setUser(response.data.user);
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
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <UserDetails user={user} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
