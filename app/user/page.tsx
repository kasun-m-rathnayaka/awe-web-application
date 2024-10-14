"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserHeader from "@/components/UserHeader";

const Page = () => {
  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <UserHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Welcome Writer</CardTitle>
                    <CardDescription>
                      Manage your current assignment and their tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <UserTable
                      titles={titles}
                      data={tasks}
                      handleDelete={handleDelete}
                      handleClick={handleClick}
                    /> */}
                  </CardContent>
                  <CardFooter>
                    {/* <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      writers
                    </div> */}
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