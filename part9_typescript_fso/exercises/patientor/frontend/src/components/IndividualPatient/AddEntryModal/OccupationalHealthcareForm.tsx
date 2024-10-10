import { TextField } from "@mui/material";
import { Field } from "./AddEntryForm";

interface Props { 
    setFields: (newField: Field) => void; 
    fields: Field;
}

const OccupationalHealthcareForm = ({ fields, setFields }: Props) => {
    return (
        <>
            <TextField
            label="Employer Name"
            required
            fullWidth
            value={fields.employerName}
            onChange={({ target }) => setFields({ 
                ...fields, 
                employerName: target.value,
            })}
            />
            <label>Sick Leave Start Date</label>
            <input
                required
                type="date"
                value={fields.sickLeaveStartDate}
                onChange= {({ target }) => setFields({
                    ...fields, 
                    sickLeaveStartDate: target.value,
                })}
            />
            <label>Sick Leave End Date</label>
            <input
                required
                type="date"
                value={fields.sickLeaveEndDate}
                onChange= {({ target }) => setFields({
                    ...fields, 
                    sickLeaveEndDate: target.value,
                })}
            />
        </>
    );  
};

export default OccupationalHealthcareForm;