import { Diagnosis, Entry, SickLeave } from "../../types";

const OccupationalHealthcareEntry = ({ diagnoses, entry, employerName, sickLeave }:{ diagnoses: Diagnosis[], entry: Entry, employerName: string, sickLeave: SickLeave | undefined }) => {

    const findDiagnosisDescription = (code: string): string => {
        const foundDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        
        if (foundDiagnosis) {
          return foundDiagnosis.name;
        }
      
        return "diagnosis description not found"; 
    };

    return (
        <div style={{border: "1px solid black", margin: "5px", padding: "10px", borderRadius: "10px"}}>
            <small>Type: Occupational Healthcare</small>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            <p>Employed by: {employerName}</p>
            {entry.diagnosisCodes ? 
                (<ul> {entry.diagnosisCodes.map(code => {
                return (<li key={code}>{code} {findDiagnosisDescription(code)}</li>);
                })}</ul>) : 
                ("")
            }
            { sickLeave !== undefined ? 
                (<p>Sick leave from {sickLeave.startDate} to {sickLeave.endDate}</p>) : 
                ("")
            }
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
}; 

export default OccupationalHealthcareEntry;