import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Competition from "@/components/Competition";
import { serverUrl } from "@/utils";


export default function Home() {
  const [competitions, setCompetitions] = useState<Array<TCompetition>>([]);
  const [reload, setReload] = useState<boolean>(false);
  const getParticipants = async () => {
    const response = await axios.get(`${serverUrl}/competitions`);
    setCompetitions(response.data);
  }


  useEffect(() => {
    getParticipants();
  }, [reload]);

  return (
    <div className="flex flex-col">
    <main className="flex flex-row justify-center mt-20">
      <div className="flex flex-col text-center">
        <h1 className="mb-5 text-xl">World Sport Action</h1>
        <div className="flex flex-col space-y-2">
          <Button variant="contained" color="primary" href="/competitions/add"> Add a Competition </Button>
          <div>
            Below is the list of all Competitions
          </div>
        </div>
      </div>
    </main>
    <div className="m-4">
        {
          competitions.map((competition) => {
            return <Competition competition={competition} key={competition.id} reload={reload} setReload={setReload} />;
          })
        }
        </div>
    </div>
  );
}
