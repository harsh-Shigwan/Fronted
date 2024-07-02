import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DailyCharge from './DailyCharge';
import WardPrice from './WardPrice';
import Total from './Total';
import { Link } from 'react-router-dom';

const BedPerCharge = () => {
  const [items, setItems] = useState([]);
  const { patientId } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);

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

  return (
    <div className="container mx-auto p-4  w-[1000px] ml-16 rounded-lg shadow-md mt-10 ">
      <h1 className="text-3xl font-bold text-center">Bill Management System</h1>
      <DailyCharge addItem={addItem} />
      <WardPrice items={items} deleteItem={deleteItem} patientId={patientId}  />
      <Total items={items} />

    
      <Link to={`/Invoice_Generator/generate-bill/${patientId}/${totalPrice}`} className="top-[280px] ml-20 items-center justify-start  px-4 border-[1px] border-solid border-royalblue h-12  rounded-xl w-36 mt-1  gap-[6px] leading-[10px] left-[880px]  absolute font-medium bg-btn text-white pt-4 pr-4">
        Confirm bed
      </Link>
    </div>
  );
};

export default BedPerCharge;
