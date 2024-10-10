import { Select, MenuItem } from "@mui/material";
import { Field } from "./AddEntryForm";

interface Props { 
    setFields: (newField: Field) => void; 
    fields: Field;
}

const HealthCheckForm = ({ fields, setFields }: Props) => {
    return (
        <>
            <Select
            required
            fullWidth
            value={fields.healthCheckRating}
            onChange={({ target }) => setFields({ 
                ...fields, 
                healthCheckRating: target.value,
            })}
            >
                <MenuItem
                key={"0"}
                value={"0"}
                >Healthy</MenuItem>
                <MenuItem
                key={"1"}
                value={"1"}
                >Low Risk</MenuItem>
                <MenuItem
                key={"2"}
                value={"2"}
                >High Risk</MenuItem>
                <MenuItem
                key={"3"}
                value={"3"}
                >Critical Risk</MenuItem>
            </Select>
        </>
    );
};

export default HealthCheckForm;