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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [checking, setChecking] = useState(false);
  const [task, setTask] = useState({
    name: "",
    writer: "Not yet assigned",
    description: "New Task",
    deadline: "",
    payment: '0',
    paid: "0",
    status: "In Progress",
    employer: "Annoymous",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tasks", task);
      console.log("Task added successfully", response.data);
      toast.success("Task added successfully");
      setLoading(false);
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleValueChange = (value: any) => {
    setTask({ ...task, status: value });
  };

  const handleCheck = async (value: string) => {
    try {
      if (task.writer.length > 3) {
        const response = await axios.get(`/api/users/user/${value}`);
        setChecking(false);
      }
    } catch (error: any) {
      console.log("error", error.response);
      // toast.error(error.response.data.message);      
    }
  }

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
                    placeholder="AWE001"
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">
                    Writer
                    {task.writer.length > 3 ? (
                      checking == true ? (
                        <span className="pl-5 text-red-400 text-sm">
                          checking ...
                        </span>
                      ) : (
                        <span className="pl-5 text-green-400 text-sm">
                          wirter-found
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    id="writer"
                    placeholder="Demo1001"
                    onChange={(e) => {
                      setTask({ ...task, writer: e.target.value });
                      setChecking(true);
                      handleCheck(e.target.value);
                    }}
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
              <div className="grid grid-cols-2 gap-2">
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
                    onChange={(e) => setTask({ ...task, paid: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="address">Status</Label>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Amendment">Amendment</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Attention">Attention</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Employer</Label>
                <Input
                  id="name"
                  placeholder="Employer name"
                  onChange={(e) =>
                    setTask({ ...task, employer: e.target.value })
                  }
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
