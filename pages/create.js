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
    const [frequency, setFrequency] = React.useState(1)
    const [times, setTimes] = React.useState([])
    const curDate = new Date()

    React.useEffect(() => {
        // Because useState[1] is async
        setForm(currentValues => ({
            ...currentValues,
            ["days"]: days
        }))
    }, [days]);

    React.useEffect(() => {
        // Because useState[1] is async
        setForm(currentValues => ({
            ...currentValues,
            ["times"]: times
        }))
    }, [times]);

    const handleChange = e => {
        e.persist();
        if (e.target.name == 'days') {
            if (e.target.checked) {
                setDays(currentValues => ([
                    ...currentValues,
                    Number(e.target.value)
                ]))
            } else {
                // is there a better way?
                let oldDays = [...days]
                const index = oldDays.findIndex(day => day == e.target.value)
                oldDays.splice(index, 1)
                setDays([...oldDays])
            }
        } else {
            setForm(currentValues => ({
                ...currentValues,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleFrequency = e => {
        e.persist();
        setFrequency(e.target.value)
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

    console.log('form:', form) // DEBUG
    console.log('times:', frequency) // DEBUG

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
                                    <FormControlLabel onChange={handleChange} name="typeAnswer" value="bool"   control={<Radio />} label="Yes/No" />
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
                                    value={index}
                                    key={day + index}
                                    onChange={handleChange}
                                />
                            )}
                        </span>

                        <span>
                            <p>How many times per day</p>
                            <RadioGroup aria-label="gender" name="gender1">
                                <span>
                                    <FormControlLabel onChange={handleFrequency} name="times" value="1" control={<Radio />} label="1" />
                                    <FormControlLabel onChange={handleFrequency} name="times" value="2" control={<Radio />} label="2" />
                                    <FormControlLabel onChange={handleFrequency} name="times" value="3" control={<Radio />} label="3" />
                                    <FormControlLabel onChange={handleFrequency} name="times" value="0" control={<Radio />} label="Custom" disabled />
                                </span>
                            </RadioGroup>
                        </span>

                        <span>
                            <p>Select the hour</p>
                            {[...Array(Number(frequency))].map((_, index) => <TextField
                                id={"time" + index}
                                type="time"
                                defaultValue="12:30"
                                onChange={console.log}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />)}
                            
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

                        <button type="submit">Create Track</button>
                    </FormGroup>
                </form>
            </Container>
        </>
    )
}