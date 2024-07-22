import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DailyCharge from './DailyCharge';
import WardPrice from './WardPrice';
import Total from './Total';
import { Link } from 'react-router-dom';
import Breadcrumb from "../../../components/Breadcrumb";

const BedPerCharge = () => {
  const [items, setItems] = useState([]);
  const { patientId } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculate total price
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotalPrice(total);
  }, [items]);
  const handle =()=>{
    navigate(`/Invoice_Generator/medi/visit/${patientId}`)
  }
  return (
    <div className="container mx-auto p-4  w-[1000px] ml-16 rounded-lg shadow-lg mt-3  ">
     <Breadcrumb></Breadcrumb>
     
    <button className=" absolute left-[1200px] top-[58px] flex gap-3 justify-end py-3 pr-2.5 text-2xl font-semibold leading-5 text-blue-600 whitespace-nowrap rounded-lg border-2 border-blue-600 border-solid w-[45px]" onClick={handle}>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d74983c39c46366e6436cd5074d5b98860f61ea77dce3c5f5725985468ffce69?apiKey=8d6992485656477797592f8415f51272&"
      className="shrink-0 w-6 aspect-square"
    />
    
  </button>
      <DailyCharge addItem={addItem} />
      <WardPrice items={items} deleteItem={deleteItem} patientId={patientId}  />
      <Total items={items} />

    
      <Link to={`/Invoice_Generator/generate-bill/${patientId}/${totalPrice}`} className="top-[350px] ml-20 items-center justify-start  px-4 border-[1px] border-solid border-royalblue h-12  rounded-xl w-36 mt-1  gap-[6px] leading-[10px] left-[880px]  absolute font-medium bg-btn text-white pt-4 pr-4">
        Confirm bed
      </Link>
    </div>
  );
};

export default BedPerCharge;
