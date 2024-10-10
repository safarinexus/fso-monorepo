import { Diagnosis, Entry, Discharge } from "../../types";

const HospitalEntry = ({ diagnoses, entry, discharge }:{ diagnoses: Diagnosis[], entry: Entry, discharge: Discharge }) => {
    const findDiagnosisDescription = (code: string): string => {
        const foundDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        
        if (foundDiagnosis) {
          return foundDiagnosis.name;
        }
      
        return "diagnosis description not found";
    };

    return (
        <div style={{border: "1px solid black", margin: "5px", padding: "10px", borderRadius: "10px"}}>
            <small>Type: Hospital Diagnosis</small>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            {entry.diagnosisCodes ? 
                (<ul> {entry.diagnosisCodes.map(code => {
                return (<li key={code}>{code} {findDiagnosisDescription(code)}</li>);
                })}</ul>) : 
                ("")
            }
            <p>Discharged on {discharge.date}: {discharge.criteria}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
}; 

export default HospitalEntry;