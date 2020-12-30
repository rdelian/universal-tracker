import Container from '@material-ui/core/Container';
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export default function Create() {
    const curDate = new Date()
    const [form, setForm] = React.useState({
        "days": 0,
        "time": "12:00",
        "date": new Date(curDate.getFullYear() + 1, curDate.getMonth() + 1, 0).toISOString().slice(0, 10)
    })
    // const days = { 1: "Monday", 2: "Tuesday", 4: "Wednesday", 8: "Thursday", 16: "Friday", 32: "Saturday", 64: "Sunday" }

    const handleChange = e => {
        let temp = null
        e.persist()
        if (e.target.name == 'days') {
            // bitmask
            // reverse the bitmask with: bitmask_value & (1 << for_index);
            temp = Number(e.target.value)
            if (e.target.checked) {
                temp = form['days'] + temp
            } else {
                temp = form['days'] - temp
            }
        }
        setForm(currentValues => ({
            ...currentValues,
            [e.target.name]: temp != null ? temp : e.target.value
        }))
    }

    const createTrack = async e => {
        e.preventDefault()
        // TODO: Check if all data exists
        const response = await fetch('api/createtrack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        console.log(response.json())
    }

    console.log('form:', form)

    return (
        <>
            <Container maxWidth="sm">
                <form onSubmit={createTrack}>
                    <FormGroup>
                        <h1> Add a track </h1>

                        <span>
                            <p>Type of answer</p>
                            <RadioGroup aria-label="typeAnswerRadio" name="typeAnswerRadio">
                                <span>
                                    <FormControlLabel onChange={handleChange} name="answerType" value="bool" control={<Radio />} label="Yes/No" />
                                    <FormControlLabel onChange={handleChange} name="answerType" value="int" control={<Radio />} label="Number" />
                                    <FormControlLabel onChange={handleChange} name="answerType" value="str" control={<Radio />} label="Text" />
                                </span>
                            </RadioGroup>
                        </span>

                        <p>What do you want to track</p>
                        <TextField id="outlined-basic" label="Track name" variant="outlined" onChange={handleChange} name="trackName" />

                        <span>
                            <p>In which days</p>
                            {["M", "T", "W", "T", "F", "S", "S"].map(
                                (day, index) => <FormControlLabel
                                    control={<Checkbox name={'days'} />}
                                    label={day}
                                    value={Math.pow(2, index)}
                                    key={day + index}
                                    onChange={handleChange}
                                />
                            )}
                        </span>

                        <p>Select the hour</p>
                        <TextField
                            id={"time"}
                            type="time"
                            defaultValue="12:30"
                            onChange={handleChange}
                            name="hour"
                        />
                        <p>Set finish date</p>
                        <TextField
                            id="date"
                            name="finishDate"
                            type="date"
                            onChange={handleChange}
                            defaultValue={new Date(curDate.getFullYear() + 1, curDate.getMonth() + 1, 0).toISOString().slice(0, 10)}
                        />
                        <br></br>
                        <Button variant="contained" color="primary" type="submit">Create Track</Button>
                    </FormGroup>
                </form>
            </Container>
        </>
    )
}