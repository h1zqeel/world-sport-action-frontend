import { Dayjs } from "dayjs";

type TContactInfo = {
    email: string | null;
    mobileNumber: string | null;
    address: string | null;
    postalCode: string | null;
    street1: string | null;
    suburb: string | null;
    state: string | null;
    country: string | null;
};

type TMedicalInfo = {
    existingMedicalCondition: string | null;
    regularMedication: string | null;
    hasDisability: boolean;
    injury: string | null;
    allergy: string | null;
    ambulanceCover: boolean;
};

type TEmergencyContact = {
    emergencyFirstName: string | null;
    emergencyLastName: string | null;
    emergencyContactName: string | null;
};

type TSportsInfo = {
    favouriteTeam: string | null;
    heardyAboutCompetition: string | null;
    heardAboutOther: string | null;
    walkingSportInfo: string | null;
};

type TOccupationEducation = {
    occupation: string | null;
    school: string | null;
    schoolGrade: string | null;
    yearsPlayed: number | null;
    SSP: boolean;
};

type TAccreditationInfo = {
    isUmpirePrerequisiteTrainingComplete: boolean;
    accreditationUmpireLevel: string | null;
    accreditationUmpireExpiryDate: Dayjs | null;
    associationLevel: string | null;
    accreditationCoachLevel: string | null;
    accreditationCoachExpiryDate: Dayjs | null;
};

type TChildrenCheckInfo = {
    childrenCheckNumber: string | null;
    childrenCheckExpiryDate: Dayjs | null;
};

type TUmpireInfo = {
    isNewToUmpiring: boolean;
};

type THealthIndicator = {
    chestPain: boolean;
    heartTrouble: boolean;
    bloodPressure: number;
    faintOrSpells: boolean;
    lowerBackProblem: boolean;
    physicalActivity: number;
    jointOrBoneProblem: boolean;
    pregnant: boolean;
};

type TParticipant = {
	id: number | undefined;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    countryOfBirth: string | null;
    isHidden: boolean;
    photographyConsent: boolean;
    marketingOptIn: boolean;
    doNotSendEmail: boolean;
    externalUserId: string | null;
    ContactInfo: TContactInfo;
    MedicalInfo: TMedicalInfo;
    EmergencyContact: TEmergencyContact;
    SportsInfo: TSportsInfo;
    OccupationEducation: TOccupationEducation;
    AccreditationInfo: TAccreditationInfo;
    ChildrenCheckInfo: TChildrenCheckInfo;
    UmpireInfo: TUmpireInfo;
    HealthIndicator: THealthIndicator;
	Languages: Array<string>;
};

export type {
    TContactInfo,
    TMedicalInfo,
    TEmergencyContact,
    TSportsInfo,
    TOccupationEducation,
    TAccreditationInfo,
    TChildrenCheckInfo,
    TUmpireInfo,
    THealthIndicator,
    TParticipant
};
