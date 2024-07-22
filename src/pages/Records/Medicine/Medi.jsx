import React, { useState } from 'react';
import MediDetails from './MediDetails';
import List from './List';
import TotalAmount from './TotalAmount';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from "../../../components/Breadcrumb"
const Medi = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { patientId } = useParams();
  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const handle =()=>{
    navigate('/Invoice_Generator/')
  }

  return (
    <div className="   container p-4  w-[1000px] ml-16 rounded-lg  mt-3 shadow-lg border-white">
    <Breadcrumb></Breadcrumb>
    <button className=" absolute left-[1200px] top-[54px] flex gap-3 justify-end py-3 pr-2.5 text-2xl font-semibold leading-5 text-blue-600 whitespace-nowrap rounded-lg border-2 border-blue-600 border-solid w-[45px]" onClick={handle}>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d74983c39c46366e6436cd5074d5b98860f61ea77dce3c5f5725985468ffce69?apiKey=8d6992485656477797592f8415f51272&"
      className="shrink-0 w-6 aspect-square"
    />
    
  </button>
      <MediDetails addItem={addItem} patientId={patientId} />
      <List items={items} deleteItem={deleteItem} />
      <TotalAmount items={items} />
      <Link to={`/Invoice_Generator/medi/visit/${patientId}`} className="top-[336px] ml-0 items-center justify-start  px-4 border-[1px] border-solid border-royalblue h-12  rounded-xl w-36 mt-1  gap-[6px] leading-[10px] left-[950px]  absolute font-medium bg-btn text-white pt-4 pr-4">
        Proceed Futher
      </Link>
    </div>
  );
};

export default Medi;
