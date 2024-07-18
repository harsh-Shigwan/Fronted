import React from "react";

const EquipmentTable = ({ groupedEquipments, totalPrice, generateFinalBill }) => {
  return (
    <div className="mt-5 ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="border-y-2 border-black text-black">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Equipment Name
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
              Price
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
          {groupedEquipments.reverse().map((equipment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.unit_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.quantity_used}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.usage_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {equipment.total_price.toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4 border-y-2 border-black" colSpan="4">
            Equipment Total 
            </td>
            <td className="px-6 py-4 border-y-2 border-black">
              {totalPrice.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
  );
};

export default EquipmentTable;
