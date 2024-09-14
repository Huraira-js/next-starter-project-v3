"use client"
import { useState } from "react";
import classes from "./Landing.module.css";
import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";
export default function Landing() {
  const [data, setData] = useState("");
  return <>
  <Input value={data} setter={setData} />
  <Button label={"Submit"} onClick={()=> setData("Okay")} />
  </>;
}
