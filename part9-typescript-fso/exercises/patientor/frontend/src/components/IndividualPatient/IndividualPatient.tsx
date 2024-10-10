import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Button } from "@mui/material";
import { Patient, Diagnosis, Entry, EntryWithoutId } from "../../types";
import { apiBaseUrl } from "../../constants";
import HospitalEntry from "./Hospital"; 
import OccuptionalHealthcareEntry from "./OccupationalHealthcare"; 
import HealthCheckEntry from "./HealthCheck";
import patientService from "../../services/patients";
import axios from "axios";
import AddEntryModal from "./AddEntryModal/AddEntryModal";


const IndividualPatient = ({ diagnoses }:{ diagnoses: Diagnosis[] }) => {
    const [loading, setLoading] = useState<boolean>(true); 
    const [patient, setPatient] = useState<Patient|string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const { patientId } = useParams<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitEntry = async (object: EntryWithoutId ) => {
        if (typeof patientId === "string") {
            try {
                const addedEntry = await patientService.addEntryByPatient(patientId, object);
                if (typeof patient !== "string") { 
                    const newEntries = patient.entries.concat(addedEntry); 
                    setPatient({
                        ...patient, 
                        entries: newEntries,
                    });
                    setError("");
                    setModalOpen(false);
                }
            } catch (e: unknown) { 
                if (axios.isAxiosError(e)) {
                    if (e.response?.data) {
                        console.error(e.response);
                        if (e.response.data.error[0]) {
                            setError(e.response.data.error[0].message); 
                        } else {
                            setError("an error occurred.");
                        }
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
    };

    function assertNever(_entry: never): import("react").ReactNode {
        throw new Error("Unknown entry type"); 
    }

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital": 
                return <HospitalEntry entry={entry} diagnoses={diagnoses} discharge={entry.discharge}/>;
            case "OccupationalHealthcare":
                return <OccuptionalHealthcareEntry entry={entry} diagnoses={diagnoses} employerName={entry.employerName} sickLeave={entry.sickLeave}/>; 
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} diagnoses={diagnoses} healthCheckRating={entry.healthCheckRating}/>;
            default: 
                return assertNever(entry);
        }
    };

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);
    
        const fetchPatient = async () => {
            if (typeof patientId === "string") {
                const patient = await patientService.getById(patientId);
                setPatient(patient);
            }
        };
        setLoading(false);
        void fetchPatient();

    }, [patientId]);

    if (loading) {
    return <h1>Loading...</h1>;
    }

    if (typeof patient === "string") { 
        return <h1>Patient not found...</h1>; 
    }

    return (
        <>
            <h1>{patient.name}</h1>
            <p>Gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            {patient.entries.map((entry) => {
                return (
                    <EntryDetails key={entry.id} entry={entry}/>
                );
            })}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </>
    );
}; 

export default IndividualPatient;