import { Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { serverUrl } from "@/utils";

export default function Home() {
	const router = useRouter()
	const [competitionName, setCompetitionName] = useState<string | null>(null);
	const [competitionStartDate, setCompetitionStartDate] = useState<Dayjs | null>(null);
	const [competitionEndDate, setCompetitionEndDate] = useState<Dayjs | null>(null);
	const [competitionDivision, setCompetitionDivision] = useState<string | null>(null);
	const [membershipProduct, setMembershipProduct] = useState<string | null>(null);
	const [membershipDivision, setMembershipDivision] = useState<string | null>(null);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const getCompetition = async () => {
		const response = await axios.get(`${serverUrl}/competitions/${router.query.id}`);
		const competition = response.data;
		setCompetitionName(competition.competitionName);
		if(competition.competitionStartDate){
			setCompetitionStartDate(dayjs(competition.competitionStartDate));
		}
		if(competition.competitionEndDate){
			setCompetitionEndDate(dayjs(competition.competitionEndDate));
		}
		setCompetitionDivision(competition.competitionDivision);
		setMembershipProduct(competition.membershipProduct);
		setMembershipDivision(competition.membershipDivision);
	};

	useEffect(()=>{
		if(!router.isReady) return;
		getCompetition()
	}, [router.isReady])

	const saveCompetition = async () => {
		setSuccess("");
		setError("");
		const competition = {
			competitionName,
			competitionStartDate,
			competitionEndDate,
			competitionDivision,
			membershipProduct,
			membershipDivision
		};

		try {
			await axios.put(`${serverUrl}/competitions/${router.query.id}`, competition);
			setSuccess("Competition Update Successfully!");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response ? error.response.data : error.message);
			} else {
				setError("Something Went Wrong!");
			}
		}
	};

return (
	<main className="flex flex-row justify-center mt-20">
		<div className="flex flex-col text-center">
		<h1 className="mb-5 text-xl">World Sport Action - Edit Competition</h1>
		<div className="flex flex-col space-y-2 mb-10">
		<TextField InputLabelProps={{ shrink: true }} id='test' label="Competition Name" value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} />
		<DatePicker label="Competition Start Date" value={competitionStartDate} onChange={(date) => setCompetitionStartDate(date)} format="YYYY-MM-DD" />
		<DatePicker label="Competition End Date" value={competitionEndDate} onChange={(date) => setCompetitionEndDate(date)} format="YYYY-MM-DD"/>
		<TextField InputLabelProps={{ shrink: true }} label="Competition Division" value={competitionDivision} onChange={(e) => setCompetitionDivision(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Membership Product" value={membershipProduct} onChange={(e) => setMembershipProduct(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Membership Division" value={membershipDivision} onChange={(e) => setMembershipDivision(e.target.value)} />
		{error && <p className="text-red-500">{error}</p>}
		{success && <p className="text-green-500">{success}</p>}

		<div className="flex flex-row justify-around"><Button variant="contained" color="secondary" href="/competitions"> Cancel </Button> <Button variant="contained" color="primary" onClick={saveCompetition}> Update </Button></div>
		</div>
		</div>
	</main>
);
}
