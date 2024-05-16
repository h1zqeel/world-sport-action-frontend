import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { serverUrl } from "@/utils";

export default function Home() {
	const [competitionName, setCompetitionName] = useState<string | null>(null);
	const [competitionStartDate, setCompetitionStartDate] = useState<Dayjs | null>(null);
	const [competitionEndDate, setCompetitionEndDate] = useState<Dayjs | null>(null);
	const [competitionDivision, setCompetitionDivision] = useState<string | null>(null);
	const [membershipProduct, setMembershipProduct] = useState<string | null>(null);
	const [membershipDivision, setMembershipDivision] = useState<string | null>(null);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const saveCompetition = async () => {
		setError("");
		setSuccess("");

		const competition = {
			competitionName,
			competitionStartDate,
			competitionEndDate,
			competitionDivision,
			membershipProduct,
			membershipDivision
		};

		try {
			await axios.post(`${serverUrl}/competitions`, competition);
			setSuccess("Competition Added Successfully!");

			setCompetitionName("");
			setCompetitionStartDate(null);
			setCompetitionEndDate(null);
			setCompetitionDivision("");
			setMembershipProduct("");
			setMembershipDivision("");
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
		<h1 className="mb-5 text-xl">World Sport Action - Add Competition</h1>
		<div className="flex flex-col space-y-2 mb-10">
		<TextField InputLabelProps={{ shrink: true }} label="Competition Name" value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} />
		<DatePicker label="Competition Start Date" value={competitionStartDate} onChange={(date) => setCompetitionStartDate(date)} format="YYYY-MM-DD" />
		<DatePicker label="Competition End Date" value={competitionEndDate} onChange={(date) => setCompetitionEndDate(date)} format="YYYY-MM-DD"/>
		<TextField InputLabelProps={{ shrink: true }} label="Competition Division" value={competitionDivision} onChange={(e) => setCompetitionDivision(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Membership Product" value={membershipProduct} onChange={(e) => setMembershipProduct(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Membership Division" value={membershipDivision} onChange={(e) => setMembershipDivision(e.target.value)} />
		{error && <p className="text-red-500">{error}</p>}
		{success && <p className="text-green-500">{success}</p>}

		<div className="flex flex-row justify-around"><Button variant="contained" color="secondary" href="/competitions"> Cancel </Button> <Button variant="contained" color="primary" onClick={saveCompetition}> Save </Button></div>
		</div>
		</div>
	</main>
);
}
