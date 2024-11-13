"use client";
import { CircleX, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TableComponent from "@/components/Table";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import AddForm from "@/components/AddForm";
import toast from "react-hot-toast";
import AssignForm from "@/components/AssignForm";
import EditForm from "@/components/EditForm";

const Page = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [assignId, setAssignId] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    fetchData();
  }, []);

  const titles = [
    "Name",
    "Writer",
    "Description",
    "Deadline",
    "Payment",
    "Paid",
    "Status",
    "Employer",
    "Actions",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/tasks").then((res) => {
        setTasks(res.data);
      });
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = async () => {
    if (search.length > 3) {
      try {
        setTasks([]);
        const response = await axios
          .get(`/api/search/${search}`)
          .then((res) => {
            setTasks(res.data);
          });
      } catch (error: any) {
        console.log("error", error.response);
      }
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`/api/job/${id}`).then((res) => {
        fetchData();
        toast.success("Task Deleted Successfully");
      });
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
    }
  };

  const handleAssign = async (id: any) => {
    setAssignId(id);
    setOpenAssign(true);
  };

  const handleEdit = async (id: any) =>{
    setAssignId(id)
    setOpenEdit(true)
  }

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header setSearch={setSearch} />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  {open && <AddForm setOpen={setOpen} />}
                  {openAssign && (
                    <AssignForm setOpenAssign={setOpenAssign} id={assignId} />
                  )}
                  {openEdit && (
                    <EditForm setOpenAssign={setOpenEdit} id={assignId} />
                  )}
                  {open == false && openAssign == false && openEdit == false ? (
                    <Button
                      size="sm"
                      className="h-7 gap-1"
                      onClick={() => setOpen(true)}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Task
                      </span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 gap-1 bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        setOpen(false);
                        setOpenAssign(false);
                        setOpenEdit(false)
                      }}
                    >
                      <CircleX className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Close Menu
                      </span>
                    </Button>
                  )}
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Home</CardTitle>
                    <CardDescription>
                      Manage your current jobs and tasks and create new ones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TableComponent
                      titles={titles}
                      data={tasks}
                      handleDelete={handleDelete}
                      handleAssign={handleAssign}
                      handleEdit={handleEdit}
                    />
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong> Tasks
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
