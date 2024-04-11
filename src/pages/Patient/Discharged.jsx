import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/ipd';

const Discharged = () => {
  let { admission_id } = useParams();
  const [discharge, setDischarge] = useState({
    discharged_date: '',
    summary: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Define the data to be sent in the POST request
    const postData = {
      admission_id: parseInt(admission_id), // Convert admission_id to integer if necessary
      discharged_date: discharge.discharged_date, // Set discharged_date from state
      summary: discharge.summary // Set summary from state
    };

    // Send the POST request
    axios
      .post(`${baseURL}/ipd-discharges/`, postData)
      .then((res) => {
        // Handle successful response
        console.log('Discharge data sent:', res.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error sending discharge data:', error);
      });
  };

  const handleChange = (event) => {
    // Update the discharge state when inputs change
    const { name, value } = event.target;
    setDischarge((prevDischarge) => ({
      ...prevDischarge,
      [name]: value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='discharged_date'>Discharged Date:</label>
          <input
            type='date'
            id='discharged_date'
            name='discharged_date'
            value={discharge.discharged_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='summary'>Summary:</label>
          <textarea
            id='summary'
            name='summary'
            value={discharge.summary}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Discharged;
