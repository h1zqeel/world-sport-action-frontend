import { TParticipant } from "@/types/participant";
import { formatDate, serverUrl } from "@/utils";
import { Button, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Participant({
    participant,
	reload,
	setReload
}: {
    participant: TParticipant;
	reload: boolean;
	setReload: any;
}) {
	const [addLanguage, setAddLanguage] = useState(false);
	const [language, setLanguage] = useState<string>("")
	const [userLanguages, setUserLanguages] = useState<Array<{name : string}>>([]);
	const [addOtherSport, setAddOtherSport] = useState(false);
	const [otherSport, setOtherSport] = useState<string>("")
	const [userOtherSports, setUserOtherSports] = useState<Array<{name : string}>>([]);
	const [addVolunteer, setAddVolunteer] = useState(false);
	const [volunteer, setVolunteer] = useState<{isActive : boolean, description: string}>({isActive: false, description: ""});
	const [userVolunteer, setUserVolunteer] = useState<Array<{isActive : boolean, description: string}>>([]);
	const [addPreferredPlay, setAddPreferredPlay] = useState(false);
	const [preferredPlay, setPreferredPlay] = useState<string>("")
	const [userPreferredPlays, setUserPreferredPlays] = useState<Array<{day : string}>>([]);


	const addLanguageHandler = async () => {
		if(language === "") return alert("Please enter a language");
		await axios.post(`${serverUrl}/participants/${participant.id}/languages`, {name: language});
		await getLanguages();
		setLanguage('');
		setAddLanguage(false);
	}

	const getLanguages = async () => {
		const response = await axios.get(`${serverUrl}/participants/${participant.id}/languages`);
		setUserLanguages(response.data);
	}

	useEffect(() => {
		getLanguages();
	}, [addLanguage])


	const addOtherSportHandler = async () => {
		if(otherSport === "") return alert("Please enter a language");
		await axios.post(`${serverUrl}/participants/${participant.id}/otherSports`, {name: otherSport});
		await getOtherSports();
		setOtherSport('');
		setAddOtherSport(false);
	}

	const getOtherSports = async () => {
		const response = await axios.get(`${serverUrl}/participants/${participant.id}/otherSports`);
		setUserOtherSports(response.data);
	}

	useEffect(() => {
		getOtherSports();
	}, [addOtherSport])

	const addPreferredPlayHandler = async () => {
		if(preferredPlay === "") return alert("Please enter a day");
		await axios.post(`${serverUrl}/participants/${participant.id}/preferredPlays`, {day: preferredPlay});
		await getPreferredPlays();
		setPreferredPlay('');
		setAddPreferredPlay(false);
	}

	const getPreferredPlays = async () => {
		const response = await axios.get(`${serverUrl}/participants/${participant.id}/preferredPlays`);
		setUserPreferredPlays(response.data);
	}

	useEffect(() => {
		getPreferredPlays();
	}, [addPreferredPlay])

	const addVolunteerHandler = async () => {
		if(volunteer.description === "") return alert("Please enter a description");
		await axios.post(`${serverUrl}/participants/${participant.id}/volunteers`, volunteer);
		await getVolunteer();
		setVolunteer({isActive: false, description: ""});
		setAddVolunteer(false);
	}

	const getVolunteer = async () => {
		const response = await axios.get(`${serverUrl}/participants/${participant.id}/volunteers`);
		setUserVolunteer(response.data);
	}

	useEffect(() => {
		getVolunteer();
	}
	, [addVolunteer]);

	const deleteParticipant = async () => {
		await axios.delete(`${serverUrl}/participants/${participant.id}`);
		setReload(!reload);
	}

    return (
        <div key={participant.id} className="participant-details text-left">
            <br></br>
            <hr />
            <h2>
                <b>ParticipantId:</b> {participant.id}
				<div className="actions flex flex-row space-x-2 my-2">
                <Button variant="outlined" href={`/participants/${participant.id}`}> Edit </Button>
				<Button variant="outlined" onClick={deleteParticipant}> Delete </Button>
            	</div>
            </h2>
            <div>
                <strong>Name:</strong>{" "}
                {`${participant.firstName || ""} ${
                    participant.middleName || ""
                } ${participant.lastName || ""}`}
            </div>
            <div>
                <strong>Enternal User Id</strong> {participant.externalUserId || "-"}
            </div>
            <div>
                <strong>Gender:</strong> {participant.gender || "-"}
            </div>
            <div>
                <strong>Date of Birth:</strong> {participant.dateOfBirth ? formatDate(participant.dateOfBirth) : "-"}
            </div>
            <div>
                <strong>Country of Birth:</strong>{" "}
                {participant.countryOfBirth || "-"}
            </div>
            <div>
                <strong>Email:</strong> {participant.ContactInfo.email || "-"}
            </div>
            <div>
                <strong>Mobile Number:</strong>{" "}
                {participant.ContactInfo.mobileNumber || "-"}
            </div>
            <div>
                <strong>Address:</strong>{" "}
                {participant.ContactInfo.address || "-"}
            </div>
            <div>
                <strong>Postal Code:</strong>{" "}
                {participant.ContactInfo.postalCode || "-"}
            </div>
            <div>
                <strong>Emergency First Name:</strong>{" "}
                {participant.EmergencyContact.emergencyFirstName || "-"}
            </div>
            <div>
                <strong>Emergency Last Name:</strong>{" "}
                {participant.EmergencyContact.emergencyLastName || "-"}
            </div>
            <div>
                <strong>Emergency Contact:</strong>{" "}
                {participant.EmergencyContact.emergencyContactName || "-"}
            </div>
            <div>
                <strong>Favourite Team:</strong>{" "}
                {participant.SportsInfo.favouriteTeam || "-"}
            </div>
            <div>
                <strong>Heard About Competition:</strong>{" "}
                {participant.SportsInfo.heardAboutCompetition || "-"}
            </div>
            <div>
                <strong>Heard About Other:</strong>{" "}
                {participant.SportsInfo.heardAboutOther || "-"}
            </div>
            <div>
                <strong>Occupation:</strong>{" "}
                {participant.OccupationEducation.occupation || "-"}
            </div>
            <div>
                <strong>School:</strong>{" "}
                {participant.OccupationEducation.school || "-"}
            </div>
            <div>
                <strong>School Grade:</strong>{" "}
                {participant.OccupationEducation.schoolGrade || "-"}
            </div>
            <div>
                <strong>Years Played:</strong>{" "}
                {participant.OccupationEducation.yearsPlayed || "-"}
            </div>
            <div>
                <strong>Accreditation Umpire Level:</strong>{" "}
                {participant.AccreditationInfo.accreditationUmpireLevel || "-"}
            </div>
            <div>
                <strong>Accreditation Umpire Expiry Date:</strong>{" "}
                {participant.AccreditationInfo.accreditationUmpireExpiryDate ? formatDate(participant.AccreditationInfo.accreditationUmpireExpiryDate) :
                    "-"}
            </div>
            <div>
                <strong>Association Level:</strong>{" "}
                {participant.AccreditationInfo.associationLevel || "-"}
            </div>
            <div>
                <strong>Accreditation Coach Level:</strong>{" "}
                {participant.AccreditationInfo.accreditationCoachLevel || "-"}
            </div>
            <div>
                <strong>Accreditation Coach Expiry Date:</strong>{" "}
                {participant.AccreditationInfo.accreditationCoachExpiryDate ? formatDate(participant.AccreditationInfo.accreditationCoachExpiryDate) :
                    "-"}
            </div>
            <div>
                <strong>Children Check Number:</strong>{" "}
                {participant.ChildrenCheckInfo.childrenCheckNumber || "-"}
            </div>
            <div>
                <strong>Children Check Expiry Date:</strong>{" "}
                {participant.ChildrenCheckInfo.childrenCheckExpiryDate ? formatDate(participant.ChildrenCheckInfo.childrenCheckExpiryDate) : "-"}
            </div>
            <div>
                <strong>Is New to Umpiring:</strong>{" "}
                {participant.UmpireInfo.isNewToUmpiring ? "Yes" : "No"}
            </div>
            {participant.HealthIndicators && (
                <>
                    <div>
                        <strong>Chest Pain:</strong>{" "}
                        {participant.HealthIndicators.chestPain ? "Yes" : "No"}
                    </div>
                    <div>
                        <strong>Heart Trouble:</strong>{" "}
                        {participant.HealthIndicators.heartTrouble
                            ? "Yes"
                            : "No"}
                    </div>
                    <div>
                        <strong>Blood Pressure:</strong>{" "}
                        {participant.HealthIndicators.bloodPressure || "-"}
                    </div>
                    <div>
                        <strong>Faint or Spells:</strong>{" "}
                        {participant.HealthIndicators.faintOrSpells
                            ? "Yes"
                            : "No"}
                    </div>
                    <div>
                        <strong>Lower Back Problem:</strong>{" "}
                        {participant.HealthIndicators.lowerBackProblem
                            ? "Yes"
                            : "No"}
                    </div>
                    <div>
                        <strong>Physical Activity:</strong>{" "}
                        {participant.HealthIndicators.physicalActivity || "-"}
                    </div>
                    <div>
                        <strong>Joint or Bone Problem:</strong>{" "}
                        {participant.HealthIndicators.jointOrBoneProblem
                            ? "Yes"
                            : "No"}
                    </div>
                    <div>
                        <strong>Pregnant:</strong>{" "}
                        {participant.HealthIndicators.pregnant ? "Yes" : "No"}
                    </div>
                </>
            )}
            <div>
                <strong>Hidden:</strong> {participant.isHidden ? "Yes" : "No"}
            </div>
            <div>
                <strong>Photography Consent:</strong>{" "}
                {participant.photographyConsent ? "Yes" : "No"}
            </div>
            <div>
                <strong>Marketing Opt-In:</strong>{" "}
                {participant.marketingOptIn ? "Yes" : "No"}
            </div>
            <div>
                <strong>Do Not Send Emails:</strong>{" "}
                {participant.doNotSendEmails ? "Yes" : "No"}
            </div>
			<div className="mt-2">
				<h3 className="mb-2"> <b>Languages</b> </h3>
				{
					userLanguages.map((language) => {
						return <div key={language.name}> <li> {language.name} </li></div>
					})
				}
				<Button variant="outlined" onClick={()=>setAddLanguage(true)}> Add Language</Button>
				{
					addLanguage && <div className="mt-2">
						<TextField label="Language" value={language} onChange={(e)=>setLanguage(e.target.value)} />
						<Button onClick={addLanguageHandler}> Add </Button>
						</div>
				}
			</div>

			<div className="mt-2">
				<h3 className="mb-2"> <b>Other Sports</b> </h3>
				{
					userOtherSports.map((otherSport) => {
						return <div key={otherSport.name}> <li> {otherSport.name} </li></div>
					})
				}
				<Button variant="outlined" onClick={()=>setAddOtherSport(true)}> Add Other Sport</Button>
				{
					addOtherSport && <div className="mt-2">
						<TextField label="Other Sport" value={otherSport} onChange={(e)=>setOtherSport(e.target.value)} />
						<Button onClick={addOtherSportHandler}> Add </Button>
						</div>
				}
			</div>

			<div className="mt-2">
				<h3 className="mb-2"> <b>Preferred Play Days</b> </h3>
				{
					userPreferredPlays.map((preferredPlay) => {
						return <div key={preferredPlay.day}> <li> {preferredPlay.day} </li></div>
					})
				}
				<Button variant="outlined" onClick={()=>setAddPreferredPlay(true)}> Add Preferred Play Day</Button>
				{
					addPreferredPlay && <div className="mt-2">
						<TextField label="Preferred Play Day" value={preferredPlay} onChange={(e)=>setPreferredPlay(e.target.value)} />
						<Button onClick={addPreferredPlayHandler}> Add </Button>
						</div>
				}
			</div>

			<div className="mt-2">
				<h3 className="mb-2"> <b>Volunteer</b> </h3>
				{
					userVolunteer.map((volunteer) => {
						return <div key={volunteer.description}> <li> <b>Description:</b> {volunteer.description} <b>isActive:</b> {volunteer.isActive ? 'Yes' : 'No'} </li></div>
					})
				}
				<Button variant="outlined" onClick={()=>setAddVolunteer(true)}> Add Volunteer</Button>
				{
					addVolunteer && <div className="mt-2">
						<TextField label="Description" value={volunteer.description} onChange={(e)=>setVolunteer({...volunteer, description: e.target.value})} />
						<div className="flex-row text-left"><label>isActive</label><Checkbox {...{ inputProps: { 'aria-label': 'isActive' } }}  onChange={(e) => setVolunteer({...volunteer, isActive: e.target.checked})} value={volunteer.isActive} /></div>
						<Button onClick={addVolunteerHandler}> Add </Button>
						</div>
				}
			</div>
        </div>
    );
}
