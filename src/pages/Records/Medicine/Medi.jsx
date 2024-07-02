import React, { useState } from 'react';
import MediDetails from './MediDetails';
import List from './List';
import TotalAmount from './TotalAmount';
import { Link, useParams } from 'react-router-dom';

const Medi = () => {
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

  return (
    <div className="   container p-4  w-[1000px] ml-16 rounded-lg shadow-md mt-10 ">
      <h1 className="text-2xl font-bold mb-4">Medi Invoice</h1>
      <MediDetails addItem={addItem} patientId={patientId} />
      <List items={items} deleteItem={deleteItem} />
      <TotalAmount items={items} />
      <Link to={`/Invoice_Generator/BedCharge/${patientId}`} className="top-[280px] ml-30 items-center justify-start  px-4 border-[1px] border-solid border-royalblue h-12  rounded-xl w-36 mt-1  gap-[6px] leading-[10px] left-[1000px]  absolute font-medium bg-btn text-white pt-4 pr-4">
        Proceed Futher
      </Link>
    </div>
  );
};

export default Medi;
