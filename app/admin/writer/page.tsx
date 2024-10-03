"use client";
import { PlusCircle } from "lucide-react";
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
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserTable from "@/components/UserTable";
import { useRouter } from "next/navigation";
import AddWriter from "@/components/AddWriter";

const Page = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

const titles = [
    "First Name",
    "Last Name",
    "National ID",
    "WhatsApp Number",
    "Email",
    "Verified",
    "Role",
    "Actions",
];

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/writer").then((res) => {
        setTasks(res.data);
      });
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`/api/writer/${id}`).then((res) => {
        fetchData();
        toast.success("Writer Deleted Successfully");
      });
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
    }
  };

  const handleClick = (id: any) => {
    router.push(`/admin/${id}`)
  }

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  {open && <AddWriter setOpen={setOpen} />}
                  {open == false ? (
                    <Button
                      size="sm"
                      className="h-7 gap-1"
                      onClick={() => setOpen(true)}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Writer
                      </span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 gap-1 bg-red-600 hover:bg-red-700"
                      onClick={() => setOpen(false)}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
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
                    <CardTitle>Writer</CardTitle>
                    <CardDescription>
                      Manage your current writers and their tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserTable
                      titles={titles}
                      data={tasks}
                      handleDelete={handleDelete}
                      handleClick={handleClick}
                    />
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      writers
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Page