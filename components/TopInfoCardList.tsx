"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";

interface TopInfoCardListProps {
  setUser: any;
}

const TopInfoCardList: React.FC<TopInfoCardListProps> = ({ setUser }) => {
  interface TaskData {
    completedtasks: number;
    latetasks: number;
    remainingtasks: number;
  }

  const [data, setData] = useState<TaskData | null>(null);

  const featchInfo = async () => {
    try {
      const res = await axios.get("api/client");
      setUser(res.data.data);
      const { completedtasks, latetasks, remainingtasks } = res.data;
      setData({ completedtasks, latetasks, remainingtasks });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    featchInfo();
  }, []);

  return (
    <div className="flex justify-center gap-10">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Remaining Tasks</CardTitle>
          <CardDescription className="text-center pt-2 text-5xl">
            {data?.remainingtasks || 0}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Late Tasks</CardTitle>
          <CardDescription className="text-center pt-2 text-5xl">
            {data?.latetasks || 0}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription className="text-center pt-2 text-5xl">
            {data?.completedtasks || 0}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TopInfoCardList;
