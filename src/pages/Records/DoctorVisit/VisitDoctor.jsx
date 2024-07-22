import React, { useState } from 'react';
import List from './List';
import TotalAmount from './TotalAmount';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from "../../../components/Breadcrumb"
import VisitDetail from './VisitDetail';
const VisitDoctor = () => {
  const [items, setItems] = useState([]);
  const { patientId } = useParams();
  console.log( patientId)
  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="   container  w-[1000px] ml-16 rounded-lg shadow-lg mt-3 ">
    <Breadcrumb></Breadcrumb>
      <VisitDetail addItem={addItem} patientId={patientId} />
      <List items={items} deleteItem={deleteItem} />
      <TotalAmount items={items} />
      <Link to={`/Invoice_Generator/BedCharge/${patientId}`} className="top-[310px] ml-30 items-center justify-start  px-4 border-[1px] border-solid border-royalblue h-12  rounded-xl w-36 mt-1  gap-[6px] leading-[10px] left-[950px]  absolute font-medium bg-btn text-white pt-4 pr-4">
        Proceed Futher
      </Link>
    </div>
  );
};

export default VisitDoctor;