import React from 'react';

const Total = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="font-bold text-[19px] mt-20 w-[350px] ml-[650px] top-32 right-[0px] flex gap-5 justify-between h-12 p-4 text-base leading-4 text-gray-700 rounded-md bg-slate-100 ">
          Total Amount: Rupees {total.toFixed(2)}
        </div>
  );
};

export default Total;
