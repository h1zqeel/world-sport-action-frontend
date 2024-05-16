import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { serverUrl } from "@/utils";

export default function Home() {
	const router = useRouter()
	const getCompetition = async () => {
		const response = await axios.get(`${serverUrl}/competitions/${router.query.id}/participants/${router.query.participantId}`);
		setFullParticipantRegistrationDetails(response.data);
	};
	const [fullParticipantRegistrationDetails, setFullParticipantRegistrationDetails] = useState<any>(null);

	useEffect(()=>{
		if(!router.isReady) return;
		getCompetition()
	}, [router.isReady])

return (
	<main className="flex flex-row justify-center mt-20">
		<h1>Full Participant Registration Details</h1>
		<div className="flex flex-col space-y-2 mb-10">
			<div><strong>competitionName</strong> {fullParticipantRegistrationDetails?.competitionName}</div>
			<div><strong>competitionStartDate</strong> {fullParticipantRegistrationDetails?.competitionStartDate}</div>
			<div><strong>competitionEndDate</strong> {fullParticipantRegistrationDetails?.competitionEndDate}</div>
			<div><strong>competitionDivision</strong> {fullParticipantRegistrationDetails?.competitionDivision}</div>
			<div><strong>membershipProduct</strong> {fullParticipantRegistrationDetails?.membershipProduct}</div>
			<div><strong>membershipDivision</strong> {fullParticipantRegistrationDetails?.membershipDivision}</div>
			<div><strong>preferredPosition1</strong> {fullParticipantRegistrationDetails?.preferredPosition1}</div>
			<div><strong>preferredPosition2</strong> {fullParticipantRegistrationDetails?.preferredPosition2}</div>
			<div><strong>organisation</strong> {fullParticipantRegistrationDetails?.organisation}</div>
			<div><strong>role</strong> {fullParticipantRegistrationDetails?.role}</div>
			<div><strong>team</strong> {fullParticipantRegistrationDetails?.team}</div>
			<div><strong>competitionVenue</strong> {fullParticipantRegistrationDetails?.competitionVenue}</div>
			<div><strong>registeredParticipantId</strong> {fullParticipantRegistrationDetails?.registeredParticipantId}</div>
			<div><strong>nonRegisteredParticipantId</strong> {fullParticipantRegistrationDetails?.nonRegisteredParticipantId}</div>
			<div><strong>userId</strong> {fullParticipantRegistrationDetails?.userId}</div>
			<div><strong>firstName</strong> {fullParticipantRegistrationDetails?.firstName}</div>
			<div><strong>middleName</strong> {fullParticipantRegistrationDetails?.middleName}</div>
			<div><strong>lastName</strong> {fullParticipantRegistrationDetails?.lastName}</div>
			<div><strong>gender</strong> {fullParticipantRegistrationDetails?.gender}</div>
			<div><strong>languages</strong> {fullParticipantRegistrationDetails?.languages}</div>
			<div><strong>culture</strong> {fullParticipantRegistrationDetails?.culture}</div>
			<div><strong>occupation</strong> {fullParticipantRegistrationDetails?.occupation}</div>
			<div><strong>externalUserId</strong> {fullParticipantRegistrationDetails?.externalUserId}</div>
			<div><strong>dateOfBirth</strong> {fullParticipantRegistrationDetails?.dateOfBirth}</div>
			<div><strong>email</strong> {fullParticipantRegistrationDetails?.email}</div>
			<div><strong>mobileNumber</strong> {fullParticipantRegistrationDetails?.mobileNumber}</div>
			<div><strong>postalCode</strong> {fullParticipantRegistrationDetails?.postalCode}</div>
			<div><strong>street1</strong> {fullParticipantRegistrationDetails?.street1}</div>
			<div><strong>suburb</strong> {fullParticipantRegistrationDetails?.suburb}</div>
			<div><strong>state</strong> {fullParticipantRegistrationDetails?.state}</div>
			<div><strong>country</strong> {fullParticipantRegistrationDetails?.country}</div>
			<div><strong>isUmpirePrerequisiteTrainingComplete</strong> {fullParticipantRegistrationDetails?.isUmpirePrerequisiteTrainingComplete}</div>
			<div><strong>accreditationUmpireLevel</strong> {fullParticipantRegistrationDetails?.accreditationUmpireLevel}</div>
			<div><strong>accreditationUmpireExpiryDate</strong> {fullParticipantRegistrationDetails?.accreditationUmpireExpiryDate}</div>
			<div><strong>associationLevel</strong> {fullParticipantRegistrationDetails?.associationLevel}</div>
			<div><strong>accreditationCoachLevel</strong> {fullParticipantRegistrationDetails?.accreditationCoachLevel}</div>
			<div><strong>accreditationCoachExpiryDate</strong> {fullParticipantRegistrationDetails?.accreditationCoachExpiryDate}</div>
			<div><strong>childrenCheckNumber</strong> {fullParticipantRegistrationDetails?.childrenCheckNumber}</div>
			<div><strong>childrenCheckExpiryDate</strong> {fullParticipantRegistrationDetails?.childrenCheckExpiryDate}</div>
			<div><strong>emergencyFirstName</strong> {fullParticipantRegistrationDetails?.emergencyFirstName}</div>
			<div><strong>emergencyLastName</strong> {fullParticipantRegistrationDetails?.emergencyLastName}</div>
			<div><strong>emergencyContactNumber</strong> {fullParticipantRegistrationDetails?.emergencyContactNumber}</div>
			<div><strong>marketingOptIn</strong> {fullParticipantRegistrationDetails?.marketingOptIn}</div>
			<div><strong>mergedUserId</strong> {fullParticipantRegistrationDetails?.mergedUserId}</div>
			<div><strong>isHIdden</strong> {fullParticipantRegistrationDetails?.isHIdden}</div>
			<div><strong>photographyConsent</strong> {fullParticipantRegistrationDetails?.photographyConsent}</div>
			<div><strong>identifyAs</strong> {fullParticipantRegistrationDetails?.identifyAs}</div>
			<div><strong>countryOfBirth</strong> {fullParticipantRegistrationDetails?.countryOfBirth}</div>
			<div><strong>umpireInfo</strong> {fullParticipantRegistrationDetails?.umpireInfo}</div>
			<div><strong>heardyAboutCompetition</strong> {fullParticipantRegistrationDetails?.heardyAboutCompetition}</div>
			<div><strong>heardByOther</strong> {fullParticipantRegistrationDetails?.heardByOther}</div>
			<div><strong>favouriteTeam</strong> {fullParticipantRegistrationDetails?.favouriteTeam}</div>
			<div><strong>yearsPlayed</strong> {fullParticipantRegistrationDetails?.yearsPlayed}</div>
			<div><strong>otherSports</strong> {fullParticipantRegistrationDetails?.otherSports}</div>
			<div><strong>volunteer</strong> {fullParticipantRegistrationDetails?.volunteer}</div>
			<div><strong>school</strong> {fullParticipantRegistrationDetails?.school}</div>
			<div><strong>schoolGrade</strong> {fullParticipantRegistrationDetails?.schoolGrade}</div>
			<div><strong>SSP</strong> {fullParticipantRegistrationDetails?.SSP}</div>
			<div><strong>preferredPlay</strong> {fullParticipantRegistrationDetails?.preferredPlay}</div>
			<div><strong>existingMedicalCondition</strong> {fullParticipantRegistrationDetails?.existingMedicalCondition}</div>
			<div><strong>regularMedication</strong> {fullParticipantRegistrationDetails?.regularMedication}</div>
			<div><strong>hasDisability</strong> {fullParticipantRegistrationDetails?.hasDisability}</div>
			<div><strong>disabilityCareNumber</strong> {fullParticipantRegistrationDetails?.disabilityCareNumber}</div>
			<div><strong>disabilityType</strong> {fullParticipantRegistrationDetails?.disabilityType}</div>
			<div><strong>injury</strong> {fullParticipantRegistrationDetails?.injury}</div>
			<div><strong>ambulanceCover</strong> {fullParticipantRegistrationDetails?.ambulanceCover}</div>
			<div><strong>healthIndicators</strong> {fullParticipantRegistrationDetails?.healthIndicators}</div>
			<div><strong>walkingSportInfo</strong> {fullParticipantRegistrationDetails?.walkingSportInfo}</div>
			<div><strong>doNotSendEmail</strong> {fullParticipantRegistrationDetails?.doNotSendEmail}</div>
		</div>
	</main>
);
}
