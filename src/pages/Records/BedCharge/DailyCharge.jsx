import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../../assets/API_URL';

const DailyCharge = ({ addItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [wardData, setWardData] = useState([]);
  const [wardInput, setWardInput] = useState('');
  const [showWardDropdown, setShowWardDropdown] = useState(false);
  const WardAPI = `${baseURL}/ipd/wards/`;
  const token = JSON.parse(localStorage.getItem("Token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wardRes = await axios.get(WardAPI, {
          headers: {
            Authorization: `Token ${token}`
          }
        });

        setWardData(wardRes.data);
      } catch (error) {
        console.error("Error fetching ward data:", error);
      }
    };

    fetchData();
  }, [WardAPI, token]);

  const handleItemChange = (itemName) => {
    setItemName(itemName);
    setWardInput(itemName);
    setShowWardDropdown(true);

    const selectedWard = wardData.find(ward => ward.name === itemName);
    if (selectedWard) {
      setPrice(selectedWard.daily_charge); // Set price to daily_charge of selected item
    } else {
      setPrice(0); // Reset price if no matching ward is found
    }
  };

  const handleWardSelect = (ward) => {
    setItemName(ward.name);
    setPrice(ward.daily_charge);
    setWardInput('');
    setShowWardDropdown(false);
  };

  const handleAddItem = () => {
    addItem({ itemName, quantity, price });
    setItemName('');
    setQuantity(1);
    setPrice(0);
  };

  return (
    <div className="p-4 mt-8">
      <div className="flex gap-5 justify-between max-md:flex-wrap">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
            Select the ward
          </div>
          <input
            type="text"
            className="w-[450px] p-4 mt-2 text-base text-gray-500 border-transparent font-medium leading-4 bg-slate-100 rounded-md max-md:pr-5 "
            onChange={(e) => handleItemChange(e.target.value)}
            onFocus={() => setShowWardDropdown(true)}
            onBlur={() => setTimeout(() => setShowWardDropdown(false), 100)}
            value={itemName}
            placeholder="Type or select the ward"
          />
          {showWardDropdown && (
            <div className="flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 absolute text-slate-600 font-medium mt-[90px] rounded-md w-[450px]">
              {wardData
                .filter((ward) =>
                  ward.name.toLowerCase().includes(wardInput.toLowerCase())
                )
                .map((ward) => (
                  <div
                    key={ward.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => handleWardSelect(ward)}
                  >
                    {ward.name}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
            Enter the number of days
          </div>
          <input
            type="number"
            className="w-[450px] p-4 mt-2 text-base text-gray-500 border-transparent font-medium leading-4 bg-slate-100 rounded-md max-md:pr-5"
            placeholder="Enter days"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full mt-8">
            Bed Price Per day
          </div>
          <div className="p-4 mt-5 text-base text-gray-500 bg-slate-100 rounded-md max-md:pr-5 w-[450px]">
            {price > 0 ? `Ward Charge Per Bed : ${price} Rupees` : "Select a ward to see the price"}
          </div>
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full mt-9">
          <button
            onClick={handleAddItem}
            className="h-12 px-4 mt-8 bg-btn text-white rounded-xl items-center justify-start py-2 border-[1px] border-solid border-royalblue w-28 gap-[6px] leading-[10px] ml-5 font-medium"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyCharge;
