import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import baseURL from '../../assests/API_URL';
const IPD_View = () => {
    const [ myData , setMyData]=useState([]);
    const token =  JSON.parse(localStorage.getItem("Token"))
    let { admission_id} = useParams();
    useEffect(()=>{
        getIPD()
    })

    const getIPD = ()=>{
        fetch(`${baseURL}/api/ipd/ipd-registrations/` , {
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then(
            res=>{
                if(res.ok){
                    return res.json();
                }else{
                    console.log("Error")
                }
            }
        ).then((data)=>{
            const ipd = data.find((item)=> item.admission_id === parseInt(admission_id))
            setMyData(ipd)
        }).catch((err)=> console.log(err))
    }
  return (
    <div>
    <div className=' bg-neutral-700 h-9 w-full '>{myData.admission_date}
    <div>{myData.admission_id}</div>
    <div>{myData.ward}</div></div>
    hellov
    </div>
  )
}

export default IPD_View