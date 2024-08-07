import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import baseURL from '../../assets/API_URL';
const OPD_View = () => {
    const [ myData , setMyData]=useState([]);
    const [ patientsList , setPatientsList]= useState([]);
    let { visit_id} = useParams();
    let { patient_id} = useParams();
    const token =  JSON.parse(localStorage.getItem("Token"))
    useEffect(()=>{
        getIPD()
     
    })
  
    useEffect(() => {
        axios.get(`${baseURL}/patient/api/patients/${visit_id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        } )
          .then(response => {
            setPatientsList(response.data);
            console.log("patientsListccc", response.data);
      
          })
          .catch(error => {
            console.error('Error fetching amit patients:', error );
          }); 
      }, []);


    const getIPD = ()=>{
        fetch(`${baseURL}/api/opd/api/opd-register/` , {
          headers: {
            Authorization: `Token ${token}`,
          },
        } ).then(
            res=>{
                if(res.ok){
                    return res.json();
                }else{
                    console.log("Error")
                }
            }
        ).then((data)=>{
            const opd = data.find((item)=> item.visit_id === parseInt(visit_id))
            setMyData(opd)
        }).catch((err)=> console.log(err))
    }
   
  return (
    <div>
    <div className=' bg-neutral-700 h-9 w-full '>{myData.visit_date}
    <div>{myData.visit_id}</div>
    <div>{myData.department}</div></div>
    hellov
    </div>
  )
}

export default OPD_View