import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../assets/API_URL';

const HospitalHeader = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("Token"));

  const fetchData = async () => {
    try {
      console.log("Token:", token);
      const response = await axios.get(`${baseURL}/api/hospital/hospitals/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log("Response Data:", response.data);
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data!</div>;

  return (
    <div className=' mt-0'>
    <div className="flex gap-5 text-sm font-medium tracking-tight text-black max-md:flex-wrap">
    <img
      loading="lazy"
      srcSet={ hospitals[0].logo}
      className="shrink-0 aspect-[0.67] w-[90px] p-2 bg-cover "
    />
    <div className="flex flex-col grow shrink-0 self-end px-5 mt-5 basis-0 w-fit">
      <div className="text-base font-bold tracking-wider">
      {hospitals[0].name}
      </div>
      <div className="mt-2">Reg. No. {hospitals[0].registration_number}</div>
      <div className="mt-2">{hospitals[0].address}</div>
      <div className="mt-2">
        Ph : {hospitals[0].phone}, Timings : AVAILABE 24 HOURS & 7 DAYS{" "}
      </div>
    </div>
  </div>
  <img
    loading="lazy"
    className="w-full  bg-slate-700 border mt-[22px] border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
  />
    </div>
  );
};

export default HospitalHeader;
