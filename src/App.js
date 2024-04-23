import React, { useState } from 'react'
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Patient from './pages/Patient';
import Appointment from './pages/Appointment/Appointment';
import Doctor from './pages/Doctor/Doctor';
import Inventory from './pages/Inventory/Inventory';
import Pharmacy from './pages/Pharmacy/Pharmacy';
import Sidebar from './components/Sidebar';
import Report from './pages/Report';
import OPD from './pages/Patient/OPD';
import IPD from './pages/Patient/IPD';
import OPD_New from './pages/Patient/OPD_New';
import Patient_Detail from './pages/Patient/Patient_Detail';
import Add_Patient from './pages/Patient/Add_Patient';
import Patient_Profile from './pages/Patient/Patient_Profile';
import Detail from './pages/Doctor/Details';
import Details from './pages/Doctor/Details';
import Add_Doctor from './pages/Doctor/Add_Doctor';
import Records from './pages/Records/Records';
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import IPD_Form from './pages/Patient/IPD_Form';
import Home from './pages/Patient/Home';
import Add_Records from './pages/Pharmacy/Add_Records';
import Medicines from './pages/Pharmacy/Medicines';
import Add_Medicines from './pages/Pharmacy/Add_Medicines';
import Add_Medicine_Inventory from './pages/Inventory/Add_Medicine_Inventory';
import Equipment from './pages/Inventory/Equipment';
import Add_Equipment from './pages/Inventory/Add_Equipment';
import Accounts from './pages/Accounts/Accounts';
import Account_Profile from './pages/Accounts/Account_Profile';
import Recipt_Form from './pages/Accounts/Tabs/Recipt_Form';
import Payment_Form from './pages/Accounts/Tabs/Payment_Form';
import CashBook_Form from './pages/Accounts/Tabs/CashBook_Form';
import Account_Ledger_Form from './pages/Accounts/Tabs/Account_Ledger_Form';
import PatientGraph from './pages/PatientGraph';
import Staff_Mangement from './pages/Staff/Staff_Mangement';
import Staff_Form from './pages/Staff/Staff_Form';
import Add_Staf from './pages/Staff/Add_Staff';
import Add_Staff from './pages/Staff/Add_Staff';
import Appointment_form from './pages/Appointment/Appointment_form';
import Inventory_List from './pages/Billing/Service/Inventory_List';
import Payment from './pages/Billing/Payment/Payment';
import Invoice from './pages/Billing/Invoice/Invoice';
import Service from './pages/Billing/Service/Service';
import Doctor_Profile from './pages/Doctor/Doctor_Profile';
import IPD_View from './pages/Patient/IPD_View';
import OPD_View from './pages/Patient/OPD_View';
import EditIPD from './pages/Patient/EditIpd';
import EditPatient from './pages/Patient/EditPatient';
import EditDoctor from './pages/Doctor/EditDoctor';
import OPD_edit from './pages/Patient/OPD_edit';
import TotalWard from './pages/Patient/ward/TotalWard';
import All_Wards from './pages/Patient/ward/All_Wards';
import Generate_Bill from './pages/Records/Generate_Bill';
import Discharged from './pages/Patient/Discharged';
import DischargedList from './pages/Patient/DischargedList';
import SideBarLayout from './components/SideBarLayout';

//import Medicine from './pages/Pharmacy/Medicine';
const App = () => {
  const loggedIn = !! localStorage.getItem("Token");
  
 //localStorage.removeItem("token");
  return (
   
      <Router>
      {
               loggedIn && (
        <Sidebar>
          <Routes >
            <Route path="/home" element={<Home />}></Route>
            <Route path="/Appointment" element={<Appointment />}></Route>
            {/*Inventory */}
            <Route path="/Inventory" element={<Inventory />}></Route>
            <Route path="/All_Inventory" element={< Inventory_List />}></Route>
            <Route path="/Inventory/Equipment" element={<Equipment />}></Route>
            <Route path="/Inventory/Equipment/Add_Equipment" element={<Add_Equipment/>}></Route>
            <Route path='/Inventory/Add_Medicine_Inventory' element={<Add_Medicine_Inventory/>}></Route>
            {/*Patient*/}
            <Route path="/Patient/OPD" element={<OPD />}></Route>
            {/*IPD*/}
            <Route path="/Patient/IPD" element={<IPD />}></Route>
            <Route path="/Patient/IPD/Add_Patient" element={<IPD_Form />}></Route>
            <Route path="/Patient/IPD/Add_Patient/IPD_View/:admission_id" element={<IPD_View />}></Route>
            <Route path="/Patient/IPD/EditIPD/:pk" element={<EditIPD/>} />{" "}
            <Route path='/IPD/IPD_Dishcharged/:admission_id' element={<Discharged/>}></Route>
            <Route path = '/patient/IPD/Discharged_List/' element={<DischargedList/>}></Route>
            <Route
              path="/Patient/Patient_Details/EditPatient/:pk"
              element={<EditPatient />}
            />{" "}
            <Route path="/Patient/OPD/Add_Patient/OPD_View/:visit_id" element={<OPD_View />}></Route>
            <Route path="/Patient/OPD/AddPatient" element={<OPD_New />}></Route>
            <Route path="/Patient/OPD/OPD_edit/:pk" element={<OPD_edit />} />{" "}
            
            <Route path='/Patient/Patient_Details' element={<Patient_Detail/>}></Route>
            <Route path='/Patient/Patient_Details/Add_Patient' element={<Add_Patient/>}></Route>
            <Route path='/Patient/Patient_Details/:PatientID' element={<Patient_Profile/>}></Route>

            {/* Doctor*/}
            <Route path="/Doctor" element={<Doctor />}></Route>
            <Route path='/Doctor/Details' element={<Details/>}/>
            <Route path='/Doctor/Details/Add_Doctor' element={<Add_Doctor/>}/>
            <Route path='/Doctor/Details/Doctor_Profile/:DoctorID' element={<Doctor_Profile/>}/>
            {/*chenge */}
<Route path='/Doctor/Details/EditDoctor/:pk' element={<EditDoctor/>}/>

          {/*Invoice */}
          <Route path="/Invoice_Generator/generate-bill/:patientId" element={<Generate_Bill/>}/>
            <Route path='/Invoice_Generator' element={<Records/>}></Route>
          <Route path='/Pharmacy' element={<Pharmacy/>}/>
            <Route path='/Pharmacy/Add_Records' element={<Add_Records/>}></Route>
            <Route path='/Pharmacy/Medicines' element={<Medicines/>}></Route>
            <Route path='/Pharmacy/Medicines/Add_Medicines' element={<Add_Medicines/>}></Route>
            <Route path='/Accounts' element={<Accounts/>}></Route>
            <Route path='/Accounts/Account_Profile' element={<Account_Profile/>}></Route>
            <Route path='/Accounts/Account_Profile/Recipt_Voucher' element={<Recipt_Form/>}></Route>
            <Route path='/Accounts/Account_Profile/Payment_Form' element={<Payment_Form/>}></Route>
            <Route path='/Accounts/Account_Profile/CashBook' element={<CashBook_Form/>}></Route>
            <Route path='/Accounts/Account_Profile/Account_Ledger' element={<Account_Ledger_Form/>}></Route>
            <Route path='/PatientGraph' element={<PatientGraph></PatientGraph>}></Route>
            <Route path='/Staff' element={<Staff_Mangement/>}></Route>
            <Route path='/Staff/Add_Staff_Member' element={<Staff_Form/>}></Route>
            <Route path='/Staff/Add_Staff_Member/Add_Staff' element={<Add_Staff/>}></Route>
            <Route path='/Appointment' element={<Appointment></Appointment>}></Route>
            <Route path='Appointment/Appointment_form' element={<Appointment_form/>}></Route>
            {/*Billing*/}
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/invoice' element={<Invoice/>}></Route>
            <Route path='/All_Inventory/Inventory_Listing' element={<Service/>}></Route>
            {/* ward num*/}
            <Route path='/Patient/Ward/Add_Ward' element= {<TotalWard/>}></Route>
            <Route path='/Patient/Ward' element= {<All_Wards/>}></Route>
          </Routes>
        </Sidebar>
               )}{
                !loggedIn && (
                  <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />{" "}
                  <Route path="/Login" element={<Login />} />{" "}
                  <Route path="/Signin" element={<Signin />} />{" "}
                </Routes>
        
                )
              }
      </Router>
  
  );
}

export default App


// import React, { useState } from 'react'
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Signin from "./pages/Signin";
// import Login from "./pages/Login";
// import Appointment from './pages/Appointment/Appointment';
// import Doctor from './pages/Doctor/Doctor';
// import Inventory from './pages/Inventory/Inventory';
// import Pharmacy from './pages/Pharmacy/Pharmacy';
// import Sidebar from './components/Sidebar';
// import Report from './pages/Report';
// import OPD from './pages/Patient/OPD';
// import IPD from './pages/Patient/IPD';
// import OPD_New from './pages/Patient/OPD_New';
// import Patient_Detail from './pages/Patient/Patient_Detail';
// import Add_Patient from './pages/Patient/Add_Patient';
// import Patient_Profile from './pages/Patient/Patient_Profile';
// import Detail from './pages/Doctor/Details';
// import Details from './pages/Doctor/Details';
// import Add_Doctor from './pages/Doctor/Add_Doctor';
// import Records from './pages/Records/Records';
// //import RecordsPage2 from './pages/Records/RecordsPage2';
// import IPD_Form from './pages/Patient/IPD_Form';
// import Home from './pages/Patient/Home';
// import Add_Records from './pages/Pharmacy/Add_Records';
// import Medicines from './pages/Pharmacy/Medicines';
// import Add_Medicines from './pages/Pharmacy/Add_Medicines';
// import Add_Medicine_Inventory from './pages/Inventory/Add_Medicine_Inventory';
// import Equipment from './pages/Inventory/Equipment';
// import Add_Equipment from './pages/Inventory/Add_Equipment';
// import Accounts from './pages/Accounts/Accounts';
// import Account_Profile from './pages/Accounts/Account_Profile';
// import Recipt_Form from './pages/Accounts/Tabs/Recipt_Form';
// import Payment_Form from './pages/Accounts/Tabs/Payment_Form';
// import CashBook_Form from './pages/Accounts/Tabs/CashBook_Form';
// import Account_Ledger_Form from './pages/Accounts/Tabs/Account_Ledger_Form';
// import PatientGraph from './pages/PatientGraph';
// import Staff_Mangement from './pages/Staff/Staff_Mangement';
// import Staff_Form from './pages/Staff/Staff_Form';
// import Add_Staf from './pages/Staff/Add_Staff';
// import Add_Staff from './pages/Staff/Add_Staff';
// import Appointment_form from './pages/Appointment/Appointment_form';
// import Inventory_List from './pages/Billing/Service/Inventory_List';
// import Payment from './pages/Billing/Payment/Payment';
// import Invoice from './pages/Billing/Invoice/Invoice';
// import Service from './pages/Billing/Service/Service';
// import Doctor_Profile from './pages/Doctor/Doctor_Profile';
// import IPD_View from './pages/Patient/IPD_View';
// import OPD_View from './pages/Patient/OPD_View';
// import EditIPD from './pages/Patient/EditIpd';
// import EditPatient from './pages/Patient/EditPatient';
// //import Medicine from './pages/Pharmacy/Medicine';
// const App = () => {
//   const loggedIn = !!localStorage.getItem("token"); // Check if user is logged in

//   return (
   
//       <Router>
//       {
//         loggedIn && (
//           <Sidebar>
//           <Routes>
//             <Route path="/" element={<Home />}></Route>
//             <Route path="/Appointment" element={<Appointment />}></Route>
//             {/*Inventory */}
//             <Route path="/Inventory" element={<Inventory />}></Route>
//             <Route path="/All_Inventory" element={< Inventory_List />}></Route>
//             <Route path="/Inventory/Equipment" element={<Equipment />}></Route>
//             <Route path="/Inventory/Equipment/Add_Equipment" element={<Add_Equipment/>}></Route>
//             <Route path='/Inventory/Add_Medicine_Inventory' element={<Add_Medicine_Inventory/>}></Route>
//             {/*Patient*/}
//             <Route path="/Patient/OPD" element={<OPD />}></Route>
            
//             {/*IPD*/}
//             <Route path="/Patient/IPD" element={<IPD />}></Route>
//             <Route path="/Patient/IPD/EditIPD/:pk" element={<EditIPD></EditIPD>}></Route>
//             <Route path="/Patient/Patient_Details/EditPatient/:pk" element={<EditPatient></EditPatient>}></Route>
//             <Route path="/Patient/IPD/Add_Patient" element={<IPD_Form />}></Route>
//             <Route path="/Patient/IPD/Add_Patient/IPD_View/:admission_id" element={<IPD_View />}></Route>
//             <Route path="/Patient/OPD/Add_Patient/OPD_View/:visit_id" element={<OPD_View />}></Route>
//             <Route path="/Patient/OPD/AddPatient" element={<OPD_New />}></Route>
//             <Route path='/Patient/Patient_Details' element={<Patient_Detail/>}></Route>

//             <Route path='/Patient/Patient_Details/Add_Patient' element={<Add_Patient/>}></Route>
//             <Route path='/Patient/Patient_Details/:PatientID' element={<Patient_Profile/>}></Route>
//             {/* Doctor*/}
//             <Route path="/Doctor" element={<Doctor />}></Route>
//             <Route path='/Doctor/Details' element={<Details/>}/>
//             <Route path='/Doctor/Details/Add_Doctor' element={<Add_Doctor/>}/>
//             <Route path='/Doctor/Details/Doctor_Profile/:DoctorID' element={<Doctor_Profile/>}/>
//           {/*Invoice */}
//             <Route path='/Invoice_Generator' element={<Records/>}></Route>
          
//             <Route path='/Pharmacy/Add_Records' element={<Add_Records/>}></Route>
//             <Route path='/Pharmacy/Medicines' element={<Medicines/>}></Route>
//             <Route path='/Pharmacy/Medicines/Add_Medicines' element={<Add_Medicines/>}></Route>
//             <Route path='/Accounts' element={<Accounts/>}></Route>
//             <Route path='/Accounts/Account_Profile' element={<Account_Profile/>}></Route>
//             <Route path='/Accounts/Account_Profile/Recipt_Voucher' element={<Recipt_Form/>}></Route>
//             <Route path='/Accounts/Account_Profile/Payment_Form' element={<Payment_Form/>}></Route>
//             <Route path='/Accounts/Account_Profile/CashBook' element={<CashBook_Form/>}></Route>
//             <Route path='/Accounts/Account_Profile/Account_Ledger' element={<Account_Ledger_Form/>}></Route>
//             <Route path='/PatientGraph' element={<PatientGraph></PatientGraph>}></Route>
//             <Route path='/Staff' element={<Staff_Mangement/>}></Route>
//             <Route path='/Staff/Add_Staff_Member' element={<Staff_Form/>}></Route>
//             <Route path='/Staff/Add_Staff_Member/Add_Staff' element={<Add_Staff/>}></Route>
//             <Route path='/Appointment' element={<Appointment></Appointment>}></Route>
//             <Route path='Appointment/Appointment_form' element={<Appointment_form/>}></Route>
//             {/*Billing*/}
//             <Route path='/payment' element={<Payment/>}></Route>
//             <Route path='/invoice' element={<Invoice/>}></Route>
//             <Route path='/All_Inventory/Inventory_Listing' element={<Service/>}></Route>
//           </Routes>
//         </Sidebar>
//         )
      // }{
      //   !loggedIn && (
      //     <Routes>
      //     <Route path="/" element={<Navigate to="/Login" />} />{" "}
      //     <Route path="/Login" element={<Login />} />{" "}
      //     <Route path="/Signin" element={<Signin />} />{" "}
      //   </Routes>

      //   )
      // }
        
//       </Router>
  
//   );
// }

// export default App