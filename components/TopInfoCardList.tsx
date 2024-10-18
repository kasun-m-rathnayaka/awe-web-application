import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const TopInfoCardList = () => {
  return (
    <div className="flex justify-center gap-10">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Remaining Tasks</CardTitle>
          <CardDescription className="text-center py-5 text-2xl">Unfinished jobs in the list</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Late Tasks</CardTitle>
          <CardDescription className="text-center py-5 text-2xl">Unfinished jobs in the list</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription className="text-center py-5 text-2xl">Unfinished jobs in the list</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TopInfoCardList;
