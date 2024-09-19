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

const AddForm: React.FC<AddFormProps> = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    name: "",
    writer: "",
    description: "",
    deadline: "",
    payment: "",
    paid: "",
    status: "",
    employer: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tasks", task);
      console.log("Task added successfully", response.data);
      toast.success("Task added successfully");
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
            <CardTitle className="text-xl">Add a new Task</CardTitle>
            <CardDescription>Create new jobs and Tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Demo1001"
                    onChange={(e) =>
                      setTask({ ...task, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Writer</Label>
                  <Input
                    id="writer"
                    placeholder="AWE001"
                    onChange={(e) =>
                      setTask({ ...task, writer: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="id">Description</Label>
                  <Input
                    id="id"
                    placeholder="Nature of the Task"
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone-number">Deadline</Label>
                  <Input
                    type="date"
                    id="phone-number"
                    onChange={(e) =>
                      setTask({ ...task, deadline: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Payment</Label>
                  <Input
                    id="first-name"
                    type="number"
                    placeholder="2000"
                    onChange={(e) =>
                      setTask({ ...task, payment: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Paid</Label>
                  <Input
                    id="last-name"
                    type="number"
                    placeholder="2000"
                    onChange={(e) =>
                      setTask({ ...task, paid: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="address">Status</Label>
                  <Input
                    id="address"
                    placeholder="Pending"
                    onChange={(e) =>
                      setTask({ ...task, status: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Employer</Label>
                <Input
                  id="name"
                  placeholder="Employer name"
                  onChange={(e) => setTask({ ...task, employer: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing" : "Create an new Task"}
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AddForm;
