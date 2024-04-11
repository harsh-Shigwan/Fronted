import React, { useState, useRef, useEffect } from "react";
import BillDetails from './BillDetails';
import ItemList from './ItemList';

import { jsPDF } from 'jspdf';

import Breadcrumb from '../../components/Breadcrumb';
import download from "../../Data/download.png";
import MyModal from "./MyModal";
 
function Records() {
    const [items, setItems] = React.useState([]);
 
    const handleAddItem = (item) => {

        setItems([...items, item]);
        
    };
 
    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };
 
    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) =>
                total +
                item.quantity *
                item.price, 0);
    };
    

    return (
        <div className='  w-[1000px] ml-16 rounded-lg shadow-md mt-10 '>
        <Breadcrumb></Breadcrumb>
     
       
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items} 
                onDeleteItem={handleDeleteItem}  total={calculateTotalAmount()} />
 
        </div>
    );
}
 
export default Records



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BillDetails = ({ onAddItem, onDeleteItem }) => {
//     const [item, setItem] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [price, setPrice] = useState(0);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [itemsList, setItemsList] = useState([]);
//     const [ PatientList , setPatientList]=useState([]);
//     const [selectedItem, setSelectedItem] = useState('');
//     const [selectedPrice, setSelectedPrice] = useState(0);
    // const [ formData , setFormData]= useState({
    //     name:"",
    //     PatientID:"",
    //     equipment:"",
    //     date:"",
    //     time_slot:"",
    //     doctor:"",quantity_used:"",
    //     usage_date:"",
    //     unit_price:""
     
    //   }
//       ); //1st
//     useEffect(() => {
//         // Fetch items from API
//         axios.get('http://127.0.0.1:8000/inventory/api/equipment/')
//             .then(response => {
//                 setItemsList(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching items:', error);
//                 console.error("Error response data:", error.response?.data);
//             });
//     }, []);
//     useEffect(() => {
//         // Fetch items from API
//         axios.get('http://127.0.0.1:8000/patient/api/patients/')
//             .then(response => {
//                 setPatientList(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching items:', error);
//                 console.error("Error response data:", error.response?.data);
//             });
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form Data Submitted:', formData);
//         axios.post('http://127.0.0.1:8000/inventory/api/patient-equipment-usage/', formData)
//           .then((response) => {
//             console.log('API Response:', response.data);
//             navigate('/Inventory');
//           })
//           .catch((error) => {
//             console.error('API Error:', error);
//             console.log("Error response data:", error.response?.data);
        
//           });
//       };

//     const handleAddItem = () => {
     
//         const newItem = { item: selectedItem, quantity, price: selectedPrice };
//         onAddItem(newItem);
//         setItem('');
//         setQuantity(1);
//         setPrice(0);
//         setErrorMessage('');
//     };

//     const handleItemChange = (event) => {
//         const selectedItem = event.target.value;
//         setSelectedItem(selectedItem);
//         // Find price of selected item
//         const selectedPrice = itemsList.find(item => item.name === selectedItem)?.unit_price || 0;
//         setSelectedPrice(selectedPrice);
//         setFormData({ ...formData, [event.target.name]: event.target.value }); //3rd
//     };
//   const handleChange=(event) =>{
//     setFormData({ ...formData, [event.target.name]: event.target.value }); //3rd
//   }
     
//     return (
//         <div>
//         <div className=' w-[1000px] bg-orange-200 ml-10' onSubmit={handleSubmit}>
//             <label>Item:</label>
//             <select value={selectedItem} onChange={handleItemChange} name='name'>
//                 <option value="">Select Item</option>
//                 {itemsList.map(item => (
//                     <option key={item.id} >{item.name}</option>
//                 ))}
//             </select>


//             <select value={PatientList} onChange={handleChange}  name='PatientID'>
//             <option value="">Select Patient Id</option>
//             {PatientList.map(item => (
//                 <option key={item.PatientID} value={item.PatientID}>{item.PatientID}</option>
//             ))}
//         </select>


//             <label>Quantity:</label>
//             <input type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)} />
//             <label>Price:</label>
//             <input type="number"
//                 value={selectedPrice}
//                 readOnly />
//             <button className=' bg-blue-600 h-10 w-20 ' onClick={handleAddItem}>Add Item</button>
//             <p style={{ color: 'red' }}>{errorMessage}</p>
//         </div></div>
//     );
// };

// export default BillDetails;
