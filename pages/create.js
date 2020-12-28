import Container from '@material-ui/core/Container';
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export default function Create() {
    const [form, setForm] = React.useState({})
    const [days, setDays] = React.useState([])
    const curDate = new Date()

    const handleChange = e => {
        e.persist();
        console.log(e.target.name, e.target.checked)
        if (e.target.name == 'days') {

        } else {
            setForm(currentValues => ({
                ...currentValues,
                [e.target.name]: e.target.value
            }))
        }
    }

    const createTrack = async e => {
        e.preventDefault()
        const response = await fetch('api/createtrack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form) // body data type must match "Content-Type" header
        });
        console.log("sv response:", response.json())
    }

    console.log(form)

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
                                    <FormControlLabel onChange={handleChange} name="typeAnswer" value="bool" control={<Radio />} label="Yes/No" />
                                    <FormControlLabel onChange={handleChange} name="typeAnswer" value="number" control={<Radio />} label="Number" />
                                    <FormControlLabel onChange={handleChange} name="typeAnswer" value="string" control={<Radio />} label="Text" />
                                </span>
                            </RadioGroup>
                        </span>

                        <span>
                            <p>What do you want to track</p>
                            <TextField id="outlined-basic" label="Track name" variant="outlined" onChange={handleChange} name="trackName" />
                        </span>

                        <span>
                            <p>In which days</p>
                            {["M", "T", "W", "T", "F", "S", "S"].map(
                                (day, index) => <FormControlLabel
                                    control={<Checkbox name={'days'} />}
                                    label={day}
                                    onChange={handleChange}
                                    value={index}
                                />
                            )}
                        </span>

                        <span>
                            <p>How many times per day</p>
                            <RadioGroup aria-label="gender" name="gender1">
                                <span>
                                    <FormControlLabel value="female" control={<Radio />} label="1" />
                                    <FormControlLabel value="male" control={<Radio />} label="2" />
                                    <FormControlLabel value="other" control={<Radio />} label="3" />
                                    <FormControlLabel value="other" control={<Radio />} label="Custom" />
                                </span>
                            </RadioGroup>
                        </span>

                        <span>
                            <p>Select the hour</p>
                            <TextField
                                id="time"
                                label=""
                                type="time"
                                defaultValue="07:30"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </span>

                        <span>
                            <p>Set finish date</p>
                            <TextField
                                id="date"
                                label=""
                                type="date"
                                defaultValue={new Date(curDate.getFullYear() + 1, curDate.getMonth() + 1, 0).toISOString().slice(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </span>

                        <button type="submit">create track</button>
                    </FormGroup>
                </form>
            </Container>
        </>
    )
}