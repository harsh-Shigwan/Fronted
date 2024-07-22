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
        <div className='  w-[1000px] ml-16 rounded-lg shadow-lg mt-10 '>
        <Breadcrumb></Breadcrumb>
     
       
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items} 
                onDeleteItem={handleDeleteItem}  total={calculateTotalAmount()} />
 
        </div>
    );
}
 
export default Records

