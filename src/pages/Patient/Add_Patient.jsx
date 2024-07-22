import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import baseURL from "../../assets/API_URL";
import axios from "axios";
import CustomDropdown from "../../components/DropDown/CustomDropdown";
const steps = [
  "Basic Details",
  "Emgergency Datails",
  "Insurance Details",
  "Deposit Details",
];
const token = JSON.parse(localStorage.getItem("Token"));
export default function Add_Patient() {
  const [activeStep, setActiveStep] = React.useState(0);
  const currentDate = new Date().toISOString().split("T")[0];
  const [gender, setGender] = React.useState("");
  const [bloodGroop, setBloodGroop] = React.useState("");
  const [ paymentMode ,  setPaymentMode] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    Relative_Name: "",
    phone: "",
    email: "",
    RelationShip: "",
    fullname: "",
    Gender: "",
    blood: "",
    city: "",
    phone_no: "",
    DOB: "",
    referred: "",
    allergy: "",
    PinCode: "",
    initial_balance: "",
    facility_code: "",
    membernum: "",
    Insurance_name: "",
    cardnum: "",
    Insurance_Provider: "",
    Register_Date: currentDate,
    PAYMENT_MODE:"",
  });
  const navigate = useNavigate();
  const validateFirstPage = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "This field is required.";
    if (!formData.Gender) newErrors.Gender = "This field is required.";
    if (!formData.DOB) newErrors.DOB = "This field is required.";
    else if (new Date(formData.DOB) > new Date()) {
      newErrors.DOB = " Wrong date.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phone_no) newErrors.phone_no = "This field is required.";
    else if (!/^\d{10}$/.test(formData.phone_no))
      newErrors.phone_no = "Phone number is invalid.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecondPage = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phone) newErrors.phone = "This field is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateThirdPage = () => {
    const newErrors = {};
    // Add your validation logic for the third page here
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = validateFirstPage();
    } else if (activeStep === 1) {
      isValid = validateSecondPage();
    } else if (activeStep === 2) {
      isValid = validateThirdPage();
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = () => {
    if (validateFirstPage() && validateSecondPage()) {
      console.log("Form Data Submitted:", formData);
      const token = JSON.parse(localStorage.getItem("Token"));
      formData.owner_token = token;

      axios
        .post(`${baseURL}/api/patient/api/patients/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data);
          // Add logic to handle the API response, if needed
          navigate("/Patient/Patient_Details");
        })
        .catch((error) => {
          console.error("API Error:", error);
          console.log("Error response data:", error.response?.data);
          // Add logic to handle the API error, if needed
        });
    }
  };

  const options = [
    { value: "", label: "Select the option" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const bloodGroupOptions = [
    { value: "", label: "Select Blood Group" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];
  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card" },
    { value: "online", label: "Online" },
    { value: "insurance", label: "Insurance" },
    { value: "other", label: "Other" },
  ];

  const labeled = "select the blood group";
  const labelGender = "select the gender";
  const handleGenderChange = (selecetedGender) => {
    setGender(selecetedGender);
    setFormData({
      ...formData,
      Gender: selecetedGender,
    });
  };
  const handlePaymentModeChange = (selecetedPaymentMode) => {
    setPaymentMode(selecetedPaymentMode);
    setFormData({
      ...formData,
      PAYMENT_MODE: selecetedPaymentMode,
    });
  }
  const handlebloodGroupChange = (selecetedbloodGroup) => {
    setBloodGroop(selecetedbloodGroup);
    setFormData({
      ...formData,
      blood: selecetedbloodGroup,
    });
  };
  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form>
          {activeStep === 0 && (
            <div>
              <div className=" bg-white flex w-[1110px] flex-col pb-6 px-6 max-md:px-5">
                <div className="w-[1000px] h-full">
                  <div className="gap-5 flex max-md:flex-col h-full max-md:items-stretch max-md:gap-0">
                    <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          Full name <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <input
                            className="text-gray-500 border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 w-[500px] rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder="Enter your name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            fullWidth
                          ></input>{" "}
                          {errors.fullname && (
                            <span style={{ color: "red" }}>
                              {errors.fullname}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          E-mail ID
                        </div>
                        <div>
                          <input
                            className="text-gray-500 border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 w-[500px] rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder=" Enter e-mail id"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                          {errors.email && (
                            <span style={{ color: "red" }}>{errors.email}</span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                          Gender <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <CustomDropdown
                            options={options}
                            onChange={handleGenderChange}
                            labeled={labelGender}
                            value={gender}
                          ></CustomDropdown>
                          {errors.Gender && (
                            <span style={{ color: "red" }}>
                              {errors.Gender}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                          Blood Group
                        </div>
                        <CustomDropdown
                          options={bloodGroupOptions}
                          labeled={labeled}
                          value={bloodGroop}
                          onChange={handlebloodGroupChange}
                        />
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          City
                        </div>
                        <div>
                          <input
                            className="text-gray-500 border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 w-[500px] rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder="   Enter city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          Phone number <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <input
                            className="text-gray-500  w-[480px] border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4  rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="number"
                            placeholder="  Enter phone number"
                            name="phone_no"
                            value={formData.phone_no}
                            onChange={handleChange}
                            fullWidth
                            required
                          ></input>
                          {errors.phone_no && (
                            <span style={{ color: "red" }}>
                              {errors.phone_no}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          Date of birth <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <div className="text-gray-500 text-base font-medium leading-4 grow shrink basis-auto">
                            <input
                              className="items-stretch w-[480px] border-transparent bg-slate-100 flex justify-between gap-5 mt-3 pl-4 pr-7 py-3 rounded-md max-md:max-w-full max-md:flex-wrap max-md:pr-5"
                              type="date"
                              name="DOB"
                              value={formData.DOB}
                              onChange={handleChange}
                              fullWidth
                              required
                            ></input>
                          </div>
                          {errors.DOB && (
                            <span style={{ color: "red" }}>{errors.DOB}</span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          Referred by
                        </div>
                        <div>
                          <input
                            className="text-gray-500 w-[480px] border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder=" Enter doctor name"
                            name="referred"
                            value={formData.referred}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          Allergy (if any)
                        </div>
                        <div>
                          <input
                            className="text-gray-500 w-[480px] border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder="Allergy (if any)"
                            name="allergy"
                            value={formData.allergy}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          Pin code
                        </div>
                        <div>
                          <input
                            className="text-gray-500 text-base w-[480px] border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="number"
                            placeholder="Enter pin code"
                            name="PinCode"
                            value={formData.PinCode}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-stretch justify-between gap-5 mr-5 mt-8 self-end max-md:mr-2.5"></div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <div className="items-stretch w-[1100px] bg-white flex flex-col pb-12 px-6 max-md:px-5">
                <div className="max-md:max-w-full">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                    <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          Emgergency Contact name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <input
                            className="text-gray-500 border-transparent text-base font-medium w-[500px] leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder="Enter full name of relative"
                            name="Relative_Name"
                            value={formData.Relative_Name}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                          {errors.Relative_Name && (
                            <span style={{ color: "red" }}>
                              {errors.Relative_Name}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                          Phone number <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          <input
                            className="text-gray-500 w-[500px] border-transparent  text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            placeholder="Enter phone number"
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                          {errors.phone && (
                            <span style={{ color: "red" }}>{errors.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex grow flex-col mt-6 py-0.5 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          E-mail ID
                        </div>
                        <div>
                          <input
                            className="text-gray-500 text-base w-[500px] border-transparent  font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            placeholder="Enter e-mail id"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                          {errors.email && (
                            <span style={{ color: "red" }}>{errors.email}</span>
                          )}
                        </div>
                        <div className="text-slate-600  text-sm font-medium mt-[44px] max-md:max-w-full">
                          Relationship
                        </div>
                        <div>
                          <input
                            className="text-gray-500 text-base w-[500px] border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                            type="text"
                            placeholder="Enter relationship with patient"
                            name="RelationShip"
                            value={formData.RelationShip}
                            onChange={handleChange}
                            fullWidth
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <div className="items-stretch w-[1100px] bg-white flex flex-col pb-12 px-6 max-md:px-5">
                <div className="max-md:max-w-full">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                    <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          Insurance provider
                        </div>
                        <input
                          className="text-gray-500 text-base  border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                          type="text"
                          placeholder="Enter insurance provider"
                          name="Insurance_Provider"
                          value={formData.Insurance_Provider}
                          onChange={handleChange}
                          fullWidth
                        ></input>
                        <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                          Card number (ID no.)
                        </div>
                        <input
                          className="text-gray-500 text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2.5 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                          type="number"
                          placeholder="Enter card number"
                          name="cardnum"
                          value={formData.cardnum}
                          onChange={handleChange}
                          fullWidth
                        ></input>
                        <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                          Insurance name
                        </div>
                        <input
                          className="text-gray-500 border-transparent  text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                          type="text"
                          placeholder="Enter insurance name"
                          name="Insurance_name"
                          value={formData.Insurance_name}
                          onChange={handleChange}
                          fullWidth
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex flex-col mt-6 py-0.5 max-md:max-w-full max-md:mt-10">
                        <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                          Insurance number (Member no.)
                        </div>
                        <input
                          className="text-gray-500 border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2.5 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                          type="text"
                          placeholder="Enter insurance number"
                          name="membernum"
                          value={formData.membernum}
                          onChange={handleChange}
                          fullWidth
                        ></input>
                        <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                          Facility code
                        </div>
                        <input
                          className="text-gray-500 text-base border-transparent  font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
                          type="text"
                          placeholder=" Enter facility code"
                          name="facility_code"
                          value={formData.facility_code}
                          onChange={handleChange}
                          fullWidth
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
          {activeStep === 3 && (
            <div className="items-stretch w-[1100px] bg-white flex flex-col pb-12 px-6 max-md:px-5">
              <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-1 flex-col flex-1 self-start">
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                Deposit Amount<span style={{ color: "red" }}>*</span>
                </div>
                <input
                  className="flex gap-5 justify-between p-3 mt-4 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                  name="initial_balance"
                  type="text"
                  onChange={handleChange}
                  value={formData.initial_balance}
                  placeholder="enter the medincine category"
                ></input>
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  Payment Mode <span style={{ color: "red" }}>*</span>
                </div>
                <div className=" mt-2">
               <CustomDropdown options={paymentOptions} value={paymentMode} onChange={handlePaymentModeChange}></CustomDropdown></div>
              </div>
            </div>
            

            
          </div>
          </div>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="outlined"
              size="medium"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}
