import { TextField } from "@mui/material";
import { Field } from "./AddEntryForm";

interface Props { 
    setFields: (newField: Field) => void; 
    fields: Field;
}

const HopsitalForm = ({ fields, setFields }: Props) => {
    return (
        <>
            <TextField
                label="Discharge Criteria"
                required
                fullWidth
                value={fields.dischargeCriteria}
                onChange={({ target }) => setFields({ 
                    ...fields, 
                    dischargeCriteria: target.value,
                })}
            />
            <label>Discharge Date</label>
            <input
                required
                type="date"
                value={fields.dischargeDate}
                onChange= {({ target }) => setFields({
                    ...fields, 
                    dischargeDate: target.value,
                })}
            />
        </>
    );  
}; 

export default HopsitalForm;