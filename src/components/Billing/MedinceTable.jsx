import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../assets/API_URL";

const MedicineTable = ({ mediTotal, mediData }) => {
  const [medicineNames, setMedicineNames] = useState({});

  // Fetch medicine names from API
  useEffect(() => {
    const fetchMedicineNames = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const response = await axios.get(`${baseURL}/inventory/api/medicines/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Create a mapping of medicine IDs to names
        const namesMap = {};
        response.data.forEach((medicine) => {
          namesMap[medicine.id] = medicine.name;
        });

        setMedicineNames(namesMap);
      } catch (error) {
        console.error("Error fetching medicine names:", error);
      }
    };

    fetchMedicineNames();
  }, []);

  // Function to group medicine data and replace IDs with names
  const groupMediData = (data) => {
    const groupedData = data.reduce((acc, curr) => {
      const medicineName = medicineNames[curr.medicine] || `Medicine ID: ${curr.medicine}`;
      const existing = acc.find((item) => item.medicine === medicineName);
      if (existing) {
        existing.quantity_used += curr.quantity_used;
        existing.total_price += curr.unit_price * curr.quantity_used;
      } else {
        acc.push({
          medicine: medicineName,
          quantity_used: curr.quantity_used,
          unit_price: curr.unit_price,
          usage_date: curr.usage_date,
          total_price: curr.unit_price * curr.quantity_used,
        });
      }
      return acc;
    }, []);
    return groupedData;
  };

  const groupedMediData = groupMediData(mediData);

  return (
    <div className="mt-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="border-y-2 border-black text-black">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Medicine Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Quantity Used
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Usage Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Unit Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Total Price
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y border-black divide-gray-200">
          {groupedMediData.map((equipment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.medicine}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.quantity_used}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.usage_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.unit_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.total_price.toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4 border-y-2 border-black" colSpan="4">
              Medicines Total
            </td>
            <td className="px-6 py-4 border-y-2 border-black">
              {mediTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
