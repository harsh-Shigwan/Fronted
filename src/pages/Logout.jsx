import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import baseURL from "../assets/API_URL";
const token = JSON.parse(localStorage.getItem("Token"));

const Logout = () => {
  const navigate = useNavigate();
  //const[(isLoading, setIsLoading)] = useState(false);
  //const [error, setError] = useState(null);
  const handleLogout = () => {
    console.log("token:", token);
    axios
      .post(
        `${baseURL}/api/hos_loginlogout/`,
        {}, // Body yadi zarurat ho tab yaha kuch data bheja ja sakta hai, otherwise empty object
        {
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("Token"))}`, // Token ko Authorization header mein set karna
          },
        }
      )
      .then((response) => {
        console.log("Logout successful:", response.data);

        // Token ko local storage se remove karna
        localStorage.removeItem("Token");

        // User ko login ya home page par redirect karna
        navigate("/login"); // Ya phir jahan aap redirect karna chahte hain
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        console.error("Error response:", error.response?.data);
      });
  };

  return (
    <div>
      {/* {isLoading ? (
        <p>Logging out...</p> // Display while logout is in progress
      ) : ( */}
      <button
        onClick={handleLogout}
        className="bg-btn text-white w-44 h-9 font-medium rounded-xl ml-0 mt-5"
      >
        Logout
      </button>
      {/* )}
      {error && <p>Error: {error.message}</p>} // Display error message if
      there's an error */}
    </div>
  );
};

export default Logout;