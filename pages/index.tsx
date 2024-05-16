import { Inter } from "next/font/google";
import { Button } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-row justify-center mt-20">
      <div className="flex flex-col text-center">
      <h1 className="mb-5 text-xl">Welcome to World Sport Action</h1>
      <div className="flex flex-row space-x-2">
        <Button variant="contained" color="primary" href="/participants"> Participants </Button>
        <Button variant="contained" color="primary" href="/competitions"> Competitions </Button>
      </div>
      </div>
    </main>
  );
}
