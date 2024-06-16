import React, { useState } from "react";
import { FaHome, FaBars, FaAngleDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";
import { BiSolidDockRight } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBookMedical } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { FaWindowRestore } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoPeople } from "react-icons/io5";
import Logout from "../pages/Logout";
const routes = [
  {
    path: "/",
    name: "Patient",
    icon: < BsFillPersonLinesFill />,
    subRoutes: [
      {
        path: "/Patient/Patient_Details",
        name: "Details",
        icon: <BiSolidDetail />,
      },
      {
        path: "/Patient/IPD",
        name: "IPD",
        icon: <IoMdDocument />,
      },
      {
        path: "/Patient/OPD",
        name: "OPD",
        icon: <BiSolidDockRight />,
      }, 
    ],
 
  },
  
  {
    path: "/Doctor",
    name: "Doctor",
    icon: <FaUserDoctor />,
    subRoutes:[
      {
        path: "/Doctor/Details",
        name:"Details",
        icon:<BiSolidDetail/>,
      }
      
    ]
  },{
    path: "/Appointment",
    name: "Appointment",
    icon: <FaBookMedical />,   
 
  },{
    path:"/Invoice_Generator",
    name:"Billing",
    icon:<AiFillAppstore/>
  },
  {
    path: "/Inventory",
    name: "Inventory",
    icon: <FaWindowRestore />,
  },
  {
    path: "/Pharmacy",
    name: "Pharmacy",
    icon: <FaCalendarPlus />,
  },{
    path: "/Staff_Mangement",
    name: "Staff",
    icon:<IoPeople />,
  },{
    path: "/Accounts",
    name: "Accounts",
    icon: <VscAccount/>,
  }
];
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const navi = ()=>{
    navigate("/");
  }
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="main_container">
      <motion.div
        animate={{
          width: isOpen ? "220px" : "90px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 11,
          },
        }}
        className="sidebar"
      >
        <button className="top_section" onClick={navi}>
          {isOpen && (
            <motion.h1
              animate="show"
              exit="hidden"
              variants={showAnimation}
              className="logo"
              
            >
              CareChainAI
            </motion.h1>
          )}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </button>

        <section className="routes">
          {routes.map((route , index) => {
            if (route.subRoutes) {
              return <SidebarMenu   setIsOpen={setIsOpen}
              route={route}
              showAnimation={showAnimation}
              isOpen={isOpen}/> 
            }
            return (
              <NavLink
                activeClassName="active"
                to={route.path}
                key={index}
                className="link"
              >
                <div className="icons">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={showAnimation}
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        <Logout></Logout>
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
