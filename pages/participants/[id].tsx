import { Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TContactInfo, TMedicalInfo, TEmergencyContact, TSportsInfo, TOccupationEducation, TAccreditationInfo, TChildrenCheckInfo, TUmpireInfo, THealthIndicators } from "@/types/participant";
import { serverUrl } from "@/utils";

export default function Home() {
	const router = useRouter()
	const [firstName, setFirstName] = useState<string | null>(null);
	const [middleName, setMiddleName] = useState<string | null>(null);
	const [lastName, setLastName] = useState<string | null>(null);
	const [gender, setGender] = useState<string | null>(null);
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
	const [countryOfBirth, setCountryBirth] = useState<string | null>(null);
	const [isHidden, setIsHidden] = useState(true);
	const [photographyConsent, setPhotographyConsent] = useState(false);
	const [marketingOptIn, setMarketingOptIn] = useState(false);
	const [doNotSendEmails, setDoNotSendEmails] = useState(false);

	const [contactInfo, setContactInfo] = useState<TContactInfo>({
		email: null,
		mobileNumber: null,
		address: null,
		postalCode: null,
		street1: null,
		suburb: null,
		state: null,
		country: null,
	});

	const [medicalInfo, setMedicalInfo] = useState<TMedicalInfo>({
		existingMedicalCondition: null,
		regularMedication: null,
		hasDisability: false,
		injury: null,
		allergy: null,
		ambulanceCover: false,
	});

	const [emergencyContact, setEmergencyContact] = useState<TEmergencyContact>({
		emergencyFirstName: null,
		emergencyLastName: null,
		emergencyContactName: null,
	});

	const [sportsInfo, setSportsInfo] = useState<TSportsInfo>({
		favouriteTeam: null,
		heardAboutCompetition: null,
		heardAboutOther: null,
		walkingSportInfo: null,
	});

	const [occupationEducation, setOccupationEducation] = useState<TOccupationEducation>({
		occupation: null,
		school: null,
		schoolGrade: null,
		yearsPlayed: null,
		SSP: false,
	});


	const [accreditationInfo, setAccreditationInfo] = useState<TAccreditationInfo>({
		isUmpirePrerequisiteTrainingComplete: false,
		accreditationUmpireLevel: null,
		accreditationUmpireExpiryDate: null,
		associationLevel: null,
		accreditationCoachLevel: null,
		accreditationCoachExpiryDate: null,
	});



	const [childrenCheckInfo, setChildrenCheckInfo] = useState<TChildrenCheckInfo>({
		childrenCheckNumber: null,
		childrenCheckExpiryDate: null,
	});


	const [umpireInfo, setUmpireInfo] = useState<TUmpireInfo>({
		isNewToUmpiring: false,
	});

	const [healthIndicators, setHealthIndicators] = useState<THealthIndicators>({
		chestPain: false,
		heartTrouble: false,
		bloodPressure: 0,
		faintOrSpells: false,
		lowerBackProblem: false,
		physicalActivity: 0,
		jointOrBoneProblem: false,
		pregnant: false,
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const getParticipant = async () => {
		const response = await axios.get(`${serverUrl}/participants/${router.query.id}`);
		const participant = response.data;
		setFirstName(participant.firstName);
		setMiddleName(participant.middleName);
		setLastName(participant.lastName);
		setGender(participant.gender);
		if(participant.dateOfBirth){
			setDateOfBirth(dayjs(participant.dateOfBirth));
		}
		setCountryBirth(participant.countryOfBirth);
		setIsHidden(participant.isHidden);
		setPhotographyConsent(participant.photographyConsent);
		setMarketingOptIn(participant.marketingOptIn);
		setDoNotSendEmails(participant.doNotSendEmails);
		if(participant.ContactInfo) {
			setContactInfo(participant.ContactInfo);
		}
		if(participant.MedicalInfo) {
			setMedicalInfo(participant.MedicalInfo);
		}
		if(participant.EmergencyContact) {
			setEmergencyContact(participant.EmergencyContact);
		}
		if(participant.SportsInfo) {
			setSportsInfo(participant.SportsInfo);
		}
		if(participant.OccupationEducation) {
			setOccupationEducation(participant.OccupationEducation);
		}
		if(participant.AccreditationInfo) {
			setAccreditationInfo({
				...participant.AccreditationInfo,
				accreditationUmpireExpiryDate: participant.AccreditationInfo.accreditationUmpireExpiryDate ? dayjs(participant.AccreditationInfo.accreditationUmpireExpiryDate) : null,
				accreditationCoachExpiryDate: participant.AccreditationInfo.accreditationCoachExpiryDate ? dayjs(participant.AccreditationInfo.accreditationCoachExpiryDate) : null,
			});
		}
		if(participant.ChildrenCheckInfo) {
			setChildrenCheckInfo({
				...participant.ChildrenCheckInfo,
				childrenCheckExpiryDate: participant.ChildrenCheckInfo.childrenCheckExpiryDate ? dayjs(participant.ChildrenCheckInfo.childrenCheckExpiryDate) : null,
			});
		}
		if(participant.UmpireInfo) {
			setUmpireInfo(participant.UmpireInfo);
		}
		if(participant.HealthIndicators) {
			setHealthIndicators(participant.HealthIndicators);
		}
	};

	useEffect(()=>{
		if(!router.isReady) return;
		getParticipant()
	}, [router.isReady])

	const saveParticipant = async () => {
		setSuccess("");
		setError("");
		const participant = {
			firstName,
			middleName,
			lastName,
			gender,
			dateOfBirth,
			countryOfBirth,
			isHidden,
			photographyConsent,
			marketingOptIn,
			doNotSendEmails,
			contactInfo,
			medicalInfo,
			emergencyContact,
			sportsInfo,
			occupationEducation,
			accreditationInfo,
			childrenCheckInfo,
			umpireInfo,
			healthIndicators,
			ContactInfo: contactInfo,
			MedicalInfo: medicalInfo,
			EmergencyContact: emergencyContact,
			SportsInfo: sportsInfo,
			OccupationEducation: occupationEducation,
			AccreditationInfo: accreditationInfo,
			UmpireInfo: umpireInfo,
			HealthIndicators: healthIndicators,
			ChildrenCheckInfo: childrenCheckInfo
		};

		try {
			await axios.put(`${serverUrl}/participants/${router.query.id}`, participant);
			setSuccess("Participant Update Successfully!");
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
		{router.query.id}
		<div className="flex flex-col text-center">
		<h1 className="mb-5 text-xl">World Sport Action - Edit Participant</h1>
		<div className="flex flex-col space-y-2 mb-10">
		<TextField InputLabelProps={{ shrink: true }} label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
		<TextField InputLabelProps={{ shrink: true }} label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
		<DatePicker label="Date of Birth" value={dateOfBirth} onChange={(date) => setDateOfBirth(date)} format="YYYY-MM-DD" />
		<TextField InputLabelProps={{ shrink: true }} label="Country of Birth" value={countryOfBirth} onChange={(e) => setCountryBirth(e.target.value)} />
		<div className="flex-row text-left"><label>Is Hidden</label><Checkbox {...{ inputProps: { 'aria-label': 'isHidden' } }} onChange={(e) => setIsHidden(e.target.checked)} value={isHidden} /></div>
		<div className="flex-row text-left"><label>Photography Consent</label><Checkbox {...{ inputProps: { 'aria-label': 'photographyConsent' } }} onChange={(e) => setPhotographyConsent(e.target.checked)} value={photographyConsent} /></div>
		<div className="flex-row text-left"><label>Marketing Opt In</label><Checkbox {...{ inputProps: { 'aria-label': 'marketingOptIn' } }} onChange={(e) => setMarketingOptIn(e.target.checked)} value={marketingOptIn} /></div>
		<div className="flex-row text-left"><label>Do Not Send Emails</label><Checkbox {...{ inputProps: { 'aria-label': 'doNotSendEmails' } }} onChange={(e) => setDoNotSendEmails(e.target.checked)} value={doNotSendEmails} /></div>
		<label className="text-left font-bold">Contact Info</label>
		<TextField InputLabelProps={{ shrink: true }} label="Email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Mobile Number" value={contactInfo.mobileNumber} onChange={(e) => setContactInfo({ ...contactInfo, mobileNumber: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Address" value={contactInfo.address} onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Postal Code" value={contactInfo.postalCode} onChange={(e) => setContactInfo({ ...contactInfo, postalCode: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Street1" value={contactInfo.street1} onChange={(e) => setContactInfo({ ...contactInfo, street1: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Suburb" value={contactInfo.suburb} onChange={(e) => setContactInfo({ ...contactInfo, suburb: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="State" value={contactInfo.state} onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Country" value={contactInfo.country} onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })} />
		<label className="text-left font-bold">Medical Info</label>
		<TextField InputLabelProps={{ shrink: true }} label="Existing Medical Condition" value={medicalInfo.existingMedicalCondition} onChange={(e) => setMedicalInfo({ ...medicalInfo, existingMedicalCondition: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Regular Medication" value={medicalInfo.regularMedication} onChange={(e) => setMedicalInfo({ ...medicalInfo, regularMedication: e.target.value })} />
		<div className="flex-row text-left"><label>Has Disability</label><Checkbox {...{ inputProps: { 'aria-label': 'hasDisability' } }} onChange={(e) => setMedicalInfo({ ...medicalInfo, hasDisability: e.target.checked })} value={medicalInfo.hasDisability} /></div>
		<TextField InputLabelProps={{ shrink: true }} label="Injury" value={medicalInfo.injury} onChange={(e) => setMedicalInfo({ ...medicalInfo, injury: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Allergy" value={medicalInfo.allergy} onChange={(e) => setMedicalInfo({ ...medicalInfo, allergy: e.target.value })} />
		<div className="flex-row text-left"><label>Ambulance Cover</label><Checkbox {...{ inputProps: { 'aria-label': 'ambulanceCover' } }} onChange={(e) => setMedicalInfo({ ...medicalInfo, ambulanceCover: e.target.checked })} value={medicalInfo.ambulanceCover} /></div>
		<label className="text-left font-bold">Emergency Contact</label>
		<TextField InputLabelProps={{ shrink: true }} label="Emergency First Name" value={emergencyContact.emergencyFirstName} onChange={(e) => setEmergencyContact({ ...emergencyContact, emergencyFirstName: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Emergency Last Name" value={emergencyContact.emergencyLastName} onChange={(e) => setEmergencyContact({ ...emergencyContact, emergencyLastName: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Emergency Contact Name" value={emergencyContact.emergencyContactName} onChange={(e) => setEmergencyContact({ ...emergencyContact, emergencyContactName: e.target.value })} />
		<label className="text-left font-bold">Sports Info</label>
		<TextField InputLabelProps={{ shrink: true }} label="Favourite Team" value={sportsInfo.favouriteTeam} onChange={(e) => setSportsInfo({ ...sportsInfo, favouriteTeam: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Heard About Competition" value={sportsInfo.heardAboutCompetition} onChange={(e) => setSportsInfo({ ...sportsInfo, heardAboutCompetition: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Heard About Other" value={sportsInfo.heardAboutOther} onChange={(e) => setSportsInfo({ ...sportsInfo, heardAboutOther: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Walking Sport Info" value={sportsInfo.walkingSportInfo} onChange={(e) => setSportsInfo({ ...sportsInfo, walkingSportInfo: e.target.value })} />
		<label className="text-left font-bold">Occupation Education</label>
		<TextField InputLabelProps={{ shrink: true }} label="Occupation" value={occupationEducation.occupation} onChange={(e) => setOccupationEducation({ ...occupationEducation, occupation: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="School" value={occupationEducation.school} onChange={(e) => setOccupationEducation({ ...occupationEducation, school: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="School Grade" value={occupationEducation.schoolGrade} onChange={(e) => setOccupationEducation({ ...occupationEducation, schoolGrade: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} type="number" label="Years Played" value={occupationEducation.yearsPlayed} onChange={(e) => setOccupationEducation({ ...occupationEducation, yearsPlayed: parseInt(e.target.value) })} />
		<div className="flex-row text-left"><label>SSP</label><Checkbox {...{ inputProps: { 'aria-label': 'SSP' } }} onChange={(e) => setOccupationEducation({ ...occupationEducation, SSP: e.target.checked })} value={occupationEducation.SSP} /></div>
		<label className="text-left font-bold">Accreditation Info</label>
		<div className="flex-row text-left"><label>Is Umpire Prerequisite Training Complete</label><Checkbox {...{ inputProps: { 'aria-label': 'isUmpirePrerequisiteTrainingComplete' } }} onChange={(e) => setAccreditationInfo({ ...accreditationInfo, isUmpirePrerequisiteTrainingComplete: e.target.checked })} value={accreditationInfo.isUmpirePrerequisiteTrainingComplete} /></div>
		<TextField InputLabelProps={{ shrink: true }} label="Accreditation Umpire Level" value={accreditationInfo.accreditationUmpireLevel} onChange={(e) => setAccreditationInfo({ ...accreditationInfo, accreditationUmpireLevel: e.target.value })} />
		<DatePicker label="Accreditation Umpire Expiry Date" value={accreditationInfo.accreditationUmpireExpiryDate} onChange={(date) => setAccreditationInfo({ ...accreditationInfo, accreditationUmpireExpiryDate: date })} format="YYYY-MM-DD" />
		<TextField InputLabelProps={{ shrink: true }} label="Association Level" value={accreditationInfo.associationLevel} onChange={(e) => setAccreditationInfo({ ...accreditationInfo, associationLevel: e.target.value })} />
		<TextField InputLabelProps={{ shrink: true }} label="Accreditation Coach Level" value={accreditationInfo.accreditationCoachLevel} onChange={(e) => setAccreditationInfo({ ...accreditationInfo, accreditationCoachLevel: e.target.value })} />
		<DatePicker label="Accreditation Coach Expiry Date" value={accreditationInfo.accreditationCoachExpiryDate} onChange={(date) => setAccreditationInfo({ ...accreditationInfo, accreditationCoachExpiryDate: date })} format="YYYY-MM-DD" />
		<label className="text-left font-bold">Children Check Info</label>
		<TextField InputLabelProps={{ shrink: true }} label="Children Check Number" value={childrenCheckInfo.childrenCheckNumber} onChange={(e) => setChildrenCheckInfo({ ...childrenCheckInfo, childrenCheckNumber: e.target.value })} />
		<DatePicker label="Children Check Expiry Date" value={childrenCheckInfo.childrenCheckExpiryDate} onChange={(date) => setChildrenCheckInfo({ ...childrenCheckInfo, childrenCheckExpiryDate: date })} format="YYYY-MM-DD" />
		<label className="text-left font-bold">Umpire Info</label>
		<div className="flex-row text-left"><label>Is New To Umpiring</label><Checkbox {...{ inputProps: { 'aria-label': 'isNewToUmpiring' } }} onChange={(e) => setUmpireInfo({ ...umpireInfo, isNewToUmpiring: e.target.checked })} value={umpireInfo.isNewToUmpiring} /></div>
		<label className="text-left font-bold">Health Indicators</label>
		<div className="flex-row text-left"><label>Chest Pain</label><Checkbox {...{ inputProps: { 'aria-label': 'chestPain' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, chestPain: e.target.checked })} value={healthIndicators.chestPain} /></div>
		<div className="flex-row text-left"><label>Heart Trouble</label><Checkbox {...{ inputProps: { 'aria-label': 'heartTrouble' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, heartTrouble: e.target.checked })} value={healthIndicators.heartTrouble} /></div>
		<TextField InputLabelProps={{ shrink: true }} label="Blood Pressure" value={healthIndicators.bloodPressure} type="number" onChange={(e) => setHealthIndicators({ ...healthIndicators, bloodPressure: parseInt(e.target.value) })} />
		<div className="flex-row text-left"><label>Faint Or Spells</label><Checkbox {...{ inputProps: { 'aria-label': 'faintOrSpells' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, faintOrSpells: e.target.checked })} value={healthIndicators.faintOrSpells} /></div>
		<div className="flex-row text-left"><label>Lower Back Problem</label><Checkbox {...{ inputProps: { 'aria-label': 'lowerBackProblem' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, lowerBackProblem: e.target.checked })} value={healthIndicators.lowerBackProblem} /></div>
		<TextField InputLabelProps={{ shrink: true }} label="Physical Activity" value={healthIndicators.physicalActivity} type="number" onChange={(e) => setHealthIndicators({ ...healthIndicators, physicalActivity: parseInt(e.target.value) })} />
		<div className="flex-row text-left"><label>Joint Or Bone Problem</label><Checkbox {...{ inputProps: { 'aria-label': 'jointOrBoneProblem' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, jointOrBoneProblem: e.target.checked })} value={healthIndicators.jointOrBoneProblem} /></div>
		<div className="flex-row text-left"><label>Pregnant</label><Checkbox {...{ inputProps: { 'aria-label': 'pregnant' } }} onChange={(e) => setHealthIndicators({ ...healthIndicators, pregnant: e.target.checked })} value={healthIndicators.pregnant} /></div>
		{error && <p className="text-red-500">{error}</p>}
		{success && <p className="text-green-500">{success}</p>}

		<div className="flex flex-row justify-around"><Button variant="contained" color="secondary" href="/participants"> Cancel </Button> <Button variant="contained" color="primary" onClick={saveParticipant}> Update </Button></div>

		</div>
		</div>
	</main>
);
}
