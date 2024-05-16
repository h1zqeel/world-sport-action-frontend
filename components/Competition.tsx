import { formatDate, serverUrl } from "@/utils";
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { TParticipant } from "@/types/participant";

export default function Competition({
    competition,
    reload,
    setReload,
}: {
    competition: TCompetition;
    reload: boolean;
    setReload: any;
}) {
    const [addCompetitionVenue, setAddCompetitionVenue] = useState(false);
    const [competitionVenue, setCompetitionVenue] = useState<string>("");
    const [competitionVenues, setCompetitionVenues] = useState<
        Array<{ name: string }>
    >([]);
    const [nonRegisteredParticipantId, setNonRegisteredParticipantId] = useState("");
    const [registeredParticipants, setRegisteredParticipants] = useState<Array<TParticipant>>([]);
    const [role, setRole] = useState("");
    const [team, setTeam] = useState("");
    const [preferredPosition1, setPreferredPosition1] = useState("");
    const [preferredPosition2, setPreferredPosition2] = useState("");
    const [organisation, setOrganisation] = useState("");

    const [availableParticipants, setAvailableParticipants] = useState<
        Array<TParticipant>
    >([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedParticipant, setSelectedParticipant] = useState("0");

    const addCompetitionVenueHandler = async () => {
        if (competitionVenue === "") return alert("Please enter a Venue Name");
        await axios.post(
            `${serverUrl}/competitions/${competition.id}/competitionVenues`,
            { name: competitionVenue }
        );
        await getLanguages();
        setCompetitionVenue("");
        setAddCompetitionVenue(false);
    };

    const getLanguages = async () => {
        const response = await axios.get(
            `${serverUrl}/competitions/${competition.id}/competitionVenues`
        );
        setCompetitionVenues(response.data);
    };

    const deleteCompetition = async () => {
        await axios.delete(
            `${serverUrl}/competitions/${competition.id}`
        );
        setReload(!reload);
    };

    const loadParticipants = async () => {
        const response = await axios.get(`${serverUrl}/participants`);
        setAvailableParticipants(response.data);
    };

    const loadRegisteredParticipants = async () => {
        const response = await axios.get(
            `${serverUrl}/competitions/${competition.id}/participants`
        );
        setRegisteredParticipants(response.data);
    }

    useEffect(() => {
        getLanguages();
    }, [addCompetitionVenue]);

    useEffect(() => {
        loadParticipants();
        loadRegisteredParticipants();
    }, []);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        textAlign: "center",
    };
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedParticipant(event.target.value as string);
    };

    const handleAddParticipant = async () => {
        if (selectedParticipant === "0") {
            alert("Please select a participant");
            return;
        }
        await axios.post(
            `${serverUrl}/competitions/${competition.id}/participants/${selectedParticipant}`,
            {
                role,
                team,
                nonRegisteredParticipantId
            }
        );
        await loadRegisteredParticipants();
        alert("Participant Added Successfully");
        handleClose();
    }

    return (
        <div className="flex flex-col">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add Participant to Competition - CompetitionId:{" "}
                        {competition.id} CompetititonName:{" "}
                        {competition.competitionName}
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedParticipant}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={0} selected={true}>Select Participant</MenuItem>
                        {availableParticipants.filter((participant) => {
                            return !registeredParticipants.find((registeredParticipant) => registeredParticipant.id === participant.id);
                        }).map((participant) => {
                            return (
                                <MenuItem
                                    key={participant.id}
                                    value={participant.id}
                                >
                                    Id.{participant.id} Name.{participant.firstName}{" "}
                                    {participant.middleName}{" "}
                                    {participant.lastName}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {
                        selectedParticipant !== "0" && <div className="flex flex-col my-5 space-y-2">
                            <TextField
                                label="Non Registered Participant Id"
                                value={nonRegisteredParticipantId}
                                onChange={(e) => setNonRegisteredParticipantId(e.target.value)}
                            />
                            <TextField
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <TextField
                                label="Team"
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                            <TextField
                                label="Preferred Position 1"
                                value={preferredPosition1}
                                onChange={(e) => setPreferredPosition1(e.target.value)}
                            />
                            <TextField
                                label="Preferred Position 2"
                                value={preferredPosition2}
                                onChange={(e) => setPreferredPosition2(e.target.value)}
                            />
                            <TextField
                                label="Organisation"
                                value={organisation}
                                onChange={(e) => setOrganisation(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddParticipant}> Add Participant </Button>
                        </div>
                    }
                </Box>
            </Modal>
            <br></br>
            <hr />
            <div className="flex flex-row space-x-10">
                <div
                    key={competition.id}
                    className="competition-details text-left"
                >
                    <h2 className="">
                        <b>CompetitionId:</b> {competition.id}
                        <div className="actions flex flex-row space-x-2 mt-2">
                            <Button variant="outlined" href={`/competitions/${competition.id}`}> Edit </Button>
                            <Button onClick={deleteCompetition} variant="outlined">
                                Delete
                            </Button>
                        </div>
                    </h2>

                    <div className="mt-2">
                        <strong>Competition Name</strong>{" "}
                        {competition.competitionName}
                    </div>
                    <div>
                        <strong>Competition Start Date</strong>{" "}
                        {competition.competitionStartDate
                            ? formatDate(competition.competitionStartDate)
                            : "-"}
                    </div>
                    <div>
                        <strong>Competition End Date</strong>{" "}
                        {competition.competitionEndDate
                            ? formatDate(competition.competitionEndDate)
                            : "-"}
                    </div>
                    <div>
                        <strong>Competition Division</strong>{" "}
                        {competition.competitionDivision || "-"}
                    </div>
                    <div>
                        <strong>Membership Product</strong>{" "}
                        {competition.membershipProduct || "-"}
                    </div>
                    <div>
                        <strong>Membership Division</strong>{" "}
                        {competition.membershipDivision || "-"}
                    </div>
                    <div>
                        <h3>
                            {" "}
                            <b>Competition Venues</b>{" "}
                        </h3>
                        {competitionVenues.map((competitionVenue) => {
                            return (
                                <div key={competitionVenue.name}>
                                    <li> {competitionVenue.name} </li>
                                </div>
                            );
                        })}
                        <div className="mt-2">
                            <Button onClick={() => setAddCompetitionVenue(true)} variant="outlined">
                                Add Venue
                            </Button>
                        </div>
                        {addCompetitionVenue && (
                            <div>
                                <TextField
                                    label="Venue"
                                    value={competitionVenue}
                                    onChange={(e) =>
                                        setCompetitionVenue(e.target.value)
                                    }
                                />
                                <Button onClick={addCompetitionVenueHandler} variant="outlined">
                                    Add
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col text-left">
                    <div><b>Participants</b></div>
                    {
                        registeredParticipants.map((participant) => {
                            return (
                                <div key={participant.id} className="mb-5">
                                    <span >
                                        <div>
                                            Registered Id. {participant.id}
                                        </div>
                                        <div>
                                            Name: {participant.firstName} {participant.middleName} {participant.lastName}
                                        </div>
                                        <Button variant="outlined" href={`/competitions/${competition.id}/participant/${participant.id}`}> View Details </Button>
                                    </span>
                                </div>
                            );
                        })
                    }
                    <Button onClick={handleOpen} variant="contained">
                        Add Participant to this Competition
                    </Button>
                </div>
            </div>
        </div>
    );
}
