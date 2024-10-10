import { Diagnosis, Entry, HealthCheckRating } from "../../types";

const HealthCheckEntry = ({ diagnoses, entry, healthCheckRating }:{ diagnoses: Diagnosis[], entry: Entry, healthCheckRating: HealthCheckRating }) => {
    const findDiagnosisDescription = (code: string): string => {
        const foundDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        
        if (foundDiagnosis) {
          return foundDiagnosis.name;
        }
      
        return "diagnosis description not found";
    };

    return (
        <div style={{border: "1px solid black", margin: "5px", padding: "10px", borderRadius: "10px"}}>
            <small>Type: Health Check</small>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            {entry.diagnosisCodes ? 
                (<ul> {entry.diagnosisCodes.map(code => {
                return (<li key={code}>{code} {findDiagnosisDescription(code)}</li>);
                })}</ul>) : 
                ("")
            }
            <p>Health check rating: {healthCheckRating}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
}; 

export default HealthCheckEntry;    