import React, { useState } from 'react'
import { useFormik } from 'formik'

import CreateSuccess from './CreateSuccess'
import {Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Slider, TextField, Typography} from '@mui/material'

import LichessUser from './LichessUser';

const CreateChallenge = ({setOpen}) => {
  const [timeLimit, setTimeLimit] = useState(5)
  const [opponentTimeLimit, setOpponentTimeLimit] = useState(5)
  const [increment, setIncrement] = useState(0)
  const [lichessUserComponent, setLichessUserComponent] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [sats, setSats] = useState(0)

  const validate = values => {
    const errors = {};
    if (values.sats < 100) {
      errors.sats = "Must be at least 100 sats"
    }
  
    return errors;
  };

  const fetchLichessUser = (e) => {
    formik.handleBlur(e)
    let username = e.target.value
    fetch(`/api/lichess/user/${username}`, { mode: 'no-cors' })
      .then(res => {
        if (res.status === 404) {
          return 404
        } else if (res.ok) {
          return res.json()
        } else {
          return {}
        }
      })
      .then(user => {
        if (Object.keys(user).length === 0 && user.constructor === Object) {
          console.log(`some server error`)
          setLichessUserComponent(null)
        } else if (user === 404) {
          setLichessUserComponent(<LichessUser/>)
        } else {
          setLichessUserComponent(<LichessUser user={user}/>)
        }
      })
  }

  const submitChallenge = async (values) => {
    let newValues = structuredClone(values)
    newValues.time_limit = values.time_limit * 60
    newValues.opponent_time_limit = values.opponent_time_limit * 60
    newValues.sats = Number(values.sats)

    let constValuesJson = JSON.stringify(newValues, null, " ")
    console.log(`values: ${constValuesJson}`)
    
    fetch('/api/challenge', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: constValuesJson,
      mode: 'no-cors', 
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong')
    })
    .then((responseJson) => {
      console.log(`data: ${JSON.stringify(responseJson, null, ' ')}`)
      setSats(responseJson.sats)
      setSuccess(true)
    })
    .catch((error) => {
      console.log(error)
      setError(true)
    })
  }

  const formik = useFormik({
    initialValues: { opp_username: '', time_limit: 5, opponent_time_limit: 5, increment: 0, color: 'white', sats: '100'},
    onSubmit: submitChallenge,
    validate,
  })

  const sliderChangeLimit = (e, v) => {
    console.log(`******time limit: ${v}`)
    formik.setFieldValue('time_limit', v);
    setTimeLimit(v)
  }

  const sliderChangeOpponentLimit = (e, v) => {
    console.log(`******opponent time limit: ${v}`)
    formik.setFieldValue('opponent_time_limit', v);
    setOpponentTimeLimit(v)
  }

  const sliderChangeIncrement = (e, v) => {
    formik.setFieldValue('increment', v);
    setIncrement(v)
  }

  const onChangeColor = (e) => {
    formik.setFieldValue('color', e.target.value);
  }

  if (success) {
    return (
      <CreateSuccess sats={sats}/>
    )
  }

  let errorComponent = null
  if (error) {
    errorComponent = <Alert sx={{height: '88%', fontSize: '0.86rem'}} severity="error">Error creating challenge</Alert>
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper variant="outlined" sx={{ px: 4, pt: 4, pb: 4 }}>
        <Typography variant="h4">Challenge</Typography>
        <form onSubmit={formik.handleSubmit}>
            { errorComponent }
            <Box sx={{display: 'inline-flex'}}>
              <TextField id="opp_username" value={formik.values.opp_username} onChange={formik.handleChange} onBlur={fetchLichessUser} label="Lichess username" variant="outlined" margin="normal" />
              {lichessUserComponent}
            </Box>
            <Typography id="limit-slider" gutterBottom>Your time: {timeLimit} minutes</Typography>
            <Slider id="time_limit" value={formik.values.time_limit} aria-labelledby="limit-slider" onChange={ sliderChangeLimit } step={1} marks min={1} max={10} valueLabelDisplay="auto" /><br/>
            <Typography id="limit-slider" gutterBottom>Opponent's time: {opponentTimeLimit} minutes</Typography>
            <Slider id="time_limit" value={formik.values.opponent_time_limit} aria-labelledby="limit-slider" onChange={ sliderChangeOpponentLimit } step={1} marks min={1} max={10} valueLabelDisplay="auto" /><br/>
            <Typography id="increment-slider" gutterBottom>Increment: {increment} seconds</Typography>
            <Slider id="increment" value={formik.values.increment} aria-labelledby="increment-slider" onChange={ sliderChangeIncrement } step={1} marks min={0} max={10} valueLabelDisplay="auto" /><br/>
            <FormControl>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                value={formik.values.color}
                label="Color"
                onChange={onChangeColor}
              >
                <MenuItem value={"white"}>White</MenuItem>
                <MenuItem value={"black"}>Black</MenuItem>
              </Select>
            </FormControl><br/>
            <TextField 
              id="sats" 
              value={formik.values.sats} 
              onChange={formik.handleChange} 
              label="Sats" 
              variant="outlined" 
              margin="normal"
              error={formik.errors.sats}
              helperText={formik.errors.sats ? formik.errors.sats : null}
              /><br/>
            <Button variant="contained" sx={{ mt: 1 }} type="submit" size="large">Create</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default CreateChallenge