import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseURL from "../../assets/API_URL";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
const Add_Medicine_Inventory = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const navigate = useNavigate();
  const { pk} = useParams();


  const [formData, setFormData] = useState({}); //1st
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value }); //3rd
  };
  useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const response = await axios.get(`${baseURL}/inventory/api/medicines/${pk}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setFormData(response.data);
        } catch(error){
            console.error("Error fetching medicine data:", error);
            console.log("Error response data:", error.response?.data);
        }
    }
    fetchData();
  } , [baseURL, pk, token]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    axios
      .put(`${baseURL}/inventory/api/medicines/${pk}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        navigate("/Inventory");
      })
      .catch((error) => {
        console.error("API Error:", error);
        console.log("Error response data:", error.response?.data);
      });
  };
  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <form
        className="flex flex-col w-[1120px] px-6 pb-12 font-medium bg-slate-50 max-md:px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col pt-6 pb-12 bg-white max-md:max-w-full">
          <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
            Medicine Inventory
          </div>
          <div className="shrink-0 mt-5 h-px bg-slate-100 max-md:max-w-full" />

          <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-1 flex-col flex-1 self-start">
                <div className="text-sm text-slate-600">
                  Medicine manufacturer *
                </div>
                <input
                  className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                  name="manufacturer"
                  type="text"
                  onChange={handleChange}
                  value={formData.manufacturer}
                  placeholder="enter the medincine category"
                ></input>
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">
                  Medicine Name*
                </div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="enter the medincine name"
                ></input>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col flex-1 py-0.5 whitespace-nowrap max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">
                  Amount*
                </div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  name="unit_price"
                  type="number"
                  onChange={handleChange}
                  value={formData.unit_price}
                  placeholder="enter the amount"
                ></input>
              </div>
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">
                  {" "}
                  Quantity*
                </div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  value={formData.quantity}
                  placeholder="enter the quantity"
                ></input>
              </div>
            </div>

            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col flex-1 self-start max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">
                  Expiry Date
                </div>
                <input
                  className="flex gap-5 justify-between px-3.5 py-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:flex-wrap w-[500px]"
                  name="expiration_date"
                  type="date"
                  onChange={handleChange}
                  value={formData.expiration_date}
                  placeholder=" enter the expiry date"
                ></input>
              </div>
            </div>
          </div>

          <div className="flex gap-5 justify-between self-end mt-14 mr-8 mb-9 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5">
            <Link to={"/Inventory"} className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5">
              Cancel
            </Link>
            <button
              className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add_Medicine_Inventory;
