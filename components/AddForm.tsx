"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
interface AddFormProps {
  setOpen: (open: boolean) => void;
}

const AddForm: React.FC<AddFormProps> = ({ setOpen }) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    nationalid: "",
    whatsappnumber: "",
    address: "",
    email: "",
    password: "",
  });

  return (
    <div className="">

    <div className="flex items-center h-screen">
      <div>
        <Toaster />
      </div>
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="id">National ID</Label>
                <Input
                  id="id"
                  placeholder="2000120001012"
                  onChange={(e) =>
                    setUser({ ...user, nationalid: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="phone-number">Whatsapp number</Label>
                <Input
                  type="number"
                  id="phone-number"
                  placeholder="071-678 76 56"
                  onChange={(e) =>
                    setUser({ ...user, whatsappnumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Gangodawila, Nugegoda"
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            {/* <Button type="submit" className="w-full" onClick={handleSignUp}>
              {loading ? "Processing" : "Create an account"}
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default AddForm;
