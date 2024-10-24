"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
import toast, { Toaster } from "react-hot-toast";
interface AddFormProps {
  setOpen: (open: boolean) => void;
}

const AddWriter: React.FC<AddFormProps> = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    nationalid: "",
    whatsappnumber: "",
    address: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("User added successfully", response.data);
      toast.success("User added successfully");
      setLoading(false)
    } catch (error:any) {
      console.log("error", error.response);
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  return (
    <motion.div
      className="static"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-10 absolute top-[104px] right-6 flex items-center">
        <div>
          <Toaster />
        </div>
        <Card className="mx-auto max-w-sm ">
          <CardHeader>
            <CardTitle className="text-xl">Add a new Writer</CardTitle>
            <CardDescription>Create new Writers</CardDescription>
          </CardHeader>
          <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">User ID</Label>
                <Input
                  id="first-name"
                  placeholder="Demo1001"
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Name</Label>
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
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing" : "Create an Writer"}
            </Button>
          </div>
        </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AddWriter;
