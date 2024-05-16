import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Participant from "@/components/Participent";
import { TParticipant } from "@/types/participant";
import { serverUrl } from "@/utils";


export default function Home() {
  const [participants, setParticipants] = useState<Array<TParticipant>>([]);
  const [reload, setReload] = useState<boolean>(false);
  const getParticipants = async () => {
    const response = await axios.get(`${serverUrl}/participants`);
    setParticipants(response.data);
    console.log(response.data);
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
          <div className="flex flex-row space-x-2">
            <Button variant="contained" color="secondary" href="/"> Back </Button>
            <Button variant="contained" color="primary" href="/participants/add"> Add a Participant </Button>
          </div>
          <div>
            Below is the list of all participants
          </div>
        </div>
      </div>
    </main>
    <div className="m-4">
        {
          participants.map((participant) => {
            return <Participant participant={participant} key={participant.id} reload={reload} setReload={setReload} />;
          })
        }
        </div>
    </div>
  );
}
