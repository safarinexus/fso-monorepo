import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, Select, MenuItem, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryWithoutId, HealthCheckRating } from "../../../types";

import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HopsitalForm from "./HospitalForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

export interface Field {
  description: string; 
  date: string;
  specialist: string; 
  diagnosisCodes: string; 
  type: string; 
  healthCheckRating?: string;
  dischargeDate?: string;
  dischargeCriteria?: string; 
  employerName?: string; 
  sickLeaveStartDate?: string; 
  sickLeaveEndDate?: string;
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [form, setForm] = useState("healthcheck");
  const [fields, setFields] = useState<Field>({
    description: "", 
    date: "", 
    specialist: "", 
    diagnosisCodes: "", 
    type: form, 
    healthCheckRating: "0",
    dischargeDate: "",
    dischargeCriteria: "", 
    employerName: "", 
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
  }); 

  

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const codes = fields.diagnosisCodes.split(",");
    const BaseEntry = {
      description: fields.description, 
      date: fields.date, 
      specialist: fields.date,
      diagnosisCodes: codes, 
      type: "",
    };
    let entry = {};
    switch (fields.type){
      case "healthcheck":   
        let healthRating: HealthCheckRating = HealthCheckRating.CriticalRisk;
        switch (fields.healthCheckRating) {
          case "0": 
            healthRating = HealthCheckRating.Healthy;
            break; 
          case "1": 
            healthRating = HealthCheckRating.LowRisk;
            break; 
          case "2":
            healthRating = HealthCheckRating.HighRisk;
            break;
          case "3": 
            healthRating = HealthCheckRating.CriticalRisk;  
            break;
        }
        entry = {
          ...BaseEntry, 
          type: "HealthCheck",
          healthCheckRating: healthRating,
        };
        break;

      case "hospital": 
        entry = {
          ...BaseEntry, 
          type: "Hospital",
          discharge: {
            date: fields.dischargeDate,
            criteria: fields.dischargeCriteria,
          }
        };
        break;

      case "occupationalhealthcare": 
        entry = {
          ...BaseEntry, 
          type: "OccupationalHealthcare",
          employerName: fields.employerName,
          sickLeaveStartDate: fields.sickLeaveStartDate,
          sickLeaveEndDate: fields.sickLeaveEndDate
        };
        break;
    }

    onSubmit(entry as EntryWithoutId); 

  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault(); 
    setForm(event.target.value);
    setFields({
      ...fields, 
      type: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
      <label htmlFor="date">Date</label>
      <input
        required
        type="date"
        value={fields.date}
        onChange={({ target }) => setFields({ 
            ...fields, 
            date: target.value,
        })}
        />
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
            label="Entry Type"
            fullWidth
            value={form}
            onChange={onTypeChange}
        >
            <MenuItem
              key={"healthcheck"}
              value={"healthcheck"}
            >Health Check</MenuItem>
            <MenuItem
              key={"hospital"}
              value={"hospital"}
            >Hospital</MenuItem>
            <MenuItem
              key={"occupationalhealthcare"}
              value={"occupationalhealthcare"}
            >Occupational Healthcare</MenuItem>
        </Select>
        <TextField
        required
        label="Description"
        fullWidth 
        value={fields.description}
        onChange={({ target }) => setFields({ 
            ...fields, 
            description: target.value,
        })}
        />
        <TextField
        required
        label="Specialist"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={fields.specialist}
        onChange={({ target }) => setFields({ 
            ...fields, 
            specialist: target.value,
        })}
        />
        <TextField
            label="Diagnosis Codes"
            fullWidth
            value={fields.diagnosisCodes}
            onChange={({ target }) => setFields({ 
                ...fields, 
                diagnosisCodes: target.value,
            })}
        />
        { form !== "healthcheck" ? 
            form === "occupationalhealthcare" ? 
              <OccupationalHealthcareForm fields={fields} setFields={setFields} /> : 
              <HopsitalForm fields={fields} setFields={setFields} /> :
          <HealthCheckForm fields={fields} setFields={setFields} />
        }

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;