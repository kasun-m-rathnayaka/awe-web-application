"use client";
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
  setOpenAssign: (open: boolean) => void;
  id: any;
  name: string;
}

const EditForm = ({ setOpenAssign, id, name }: AddFormProps) => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [task, setTask] = useState({
    name: name,
    description: "New Task",
    deadline: "",
    payment: "",
    status: "In Progress",
    employer: "Annoymous",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/editjob/${id}`, task);
      toast.success("Task assigned successfully");
      setLoading(false);
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const handleValueChange = (value: any) => {
    setTask({ ...task, status: value });
  };
  return (
    <div className="z-10 absolute top-[104px] right-6 flex items-center">
      <div>
        <Toaster />
      </div>
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Edit Task</CardTitle>
          <CardDescription>Edit Job Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-2">
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="id">Name</Label>
                <Input
                  id="id"
                  placeholder={task.name}
                  onChange={(e) => setTask({ ...task, name: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="id">Description</Label>
                <Input
                  id="id"
                  placeholder="Nature of the Task"
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="phone-number">
                  Deadline <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="date"
                  id="phone-number"
                  onChange={(e) =>
                    setTask({ ...task, deadline: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first-name">
                  Payment <span className="text-red-400">*</span>
                </Label>
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
            </div>
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
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="id">Employer</Label>
                  <Input
                    id="id"
                    placeholder="Employer name"
                    onChange={(e) =>
                      setTask({ ...task, employer: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing" : "Edit Task Details"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditForm;
