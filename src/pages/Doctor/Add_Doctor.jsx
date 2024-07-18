import react  from 'react';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../assets/API_URL';
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import CustomDropdown from '../../components/CustomDropdown';
const steps = ['Basic Infromation', 'Qualificaiton-experience', 'Documents'];

export default function Add_Doctor() {
  const [activeStep, setActiveStep] = useState(0);
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [ gender , setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    dob: '',
    specialty: '',
    Gender: '',
    Address: '',
    PinCode: '',
    experince: '',
    education_qualification: '',
    working_details: '',
    identity_proof: '' ,
    medical_liscence: '',
  });
  const navigate = useNavigate();

  const options = [
    { value: '', label: 'Select the option' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = () => {
    if(validateFirstPage() && validateSecondPage() && validateThirdPage()){
    console.log('Form Data Submitted:', formData);
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.post(`${baseURL}/doctor/api/doctors/`, formData , { headers: { 'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`,
        
      }},)
      .then((response) => {
        console.log('API Response:', response.data);
        navigate('/Doctor/Details')
      })
      .catch((error) => {
        console.error('API Error:', error);
        console.log("Error response data:", error.response?.data);
      });
    }
  };

  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
    console.log('file:', file)
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: file,
      }));
    }
  };
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setFormData({
      ...formData,
      Gender: selectedGender,
    });
  };

  const validateFirstPage = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "This field is required.";
    if (!formData.Gender) newErrors.Gender = "This field is required.";
    if (!formData.dob) newErrors.dob = "This field is required.";
    else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = " Wrong date.";
    }
    if (!formData.email) newErrors.email = "This field is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "email is invalid.";
    if (!formData.phone_number) newErrors.phone_number = "This field is required.";
    else if (!/^\d{10}$/.test(formData.phone_number))
      newErrors.phone_number = "Phone number is invalid.";
    if (!formData.Address) newErrors.Address = "This field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecondPage = () => {
    const newErrors = {};
    if (!formData.education_qualification)
      newErrors.education_qualification = "Education qualification is required.";
    if (!formData.specialty)
      newErrors.specialty = "Specialty is required.";
    if (!formData.experince)
      newErrors.experince = "Experience is required.";
    if (!formData.working_details)
      newErrors.working_details = "Working details are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateThirdPage =()=>{
    const newErrors = {};

    if (!formData.identity_proof) newErrors.identity_proof = "Identity proof is required.";
    if (!formData.medical_liscence) newErrors.medical_liscence = "Medical license is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  
  return (
    <div>
    <Breadcrumb></Breadcrumb>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form enctype="multipart/form-data">
        {activeStep === 0 && (
          <div> <div className="bg-white w-[1120px]  px-6 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex flex-col pt-7 max-md:max-w-full max-md:mt-10">
                <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                  Full name <span style={{ color: 'red' }}>*</span>
                </div>
                <input className="text-gray-500 border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' name="name" value={formData.name}
                    onChange={handleChange}
                    fullWidth placeholder='Enter full name'>
                
                </input>
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  E-mail ID <span style={{ color: 'red' }}>*</span>
                </div>
                <input className="text-gray-500 text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text'name='email' value={formData.email}
                    onChange={handleChange}
                    fullWidth placeholder='Enter e-mail id' >
                
                </input>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                  Gender <span style={{ color: 'red' }}>*</span>
                </div>
                   <CustomDropdown
              options={options}
              value={gender}
              onChange={handleGenderChange}
            />
            {errors.Gender && <span style={{ color: 'red' }}>{errors.Gender}</span>}

        
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  Address <span style={{ color: 'red' }}>*</span>
                </div>
                <input className="text-gray-500 text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' name='Address' value={formData.Address}
                    onChange={handleChange}
                    fullWidth placeholder='Enter Address'>
                  
                </input>
                {errors.Address && <span style={{ color: 'red' }}>{errors.Address}</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col py-7 max-md:max-w-full max-md:mt-10">
                <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                  Phone number <span style={{ color: 'red' }}>*</span>
                </div>
                <input className="text-gray-500  text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' name='phone_number' value={formData.phone_number}
                    onChange={handleChange}
                    fullWidth placeholder='Enter phone number' >
                 
                </input>

                {errors.phone_number && <span style={{ color: 'red' }}>{errors.phone_number}</span>}
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
               BirthDate <span style={{ color: 'red' }}>*</span>
                </div>
            
                 <input className="text-gray-500 border-transparent text-base font-medium leading-4 bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"  type='date' name="dob" onChange={handleChange} placeholder='dob' value={formData.dob}>
                    
                </input>
                
              
                {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
                {/* <div className="text-slate-600 text-sm font-medium mt-9 max-md:max-w-full">
                  Blood Group
                </div>
                <div className="">
                <select className="justify-between w-[520px] border-transparent h-[50px] items-stretch bg-slate-100 flex gap-5 mt-2 px-3.5 py-4 rounded-md max-md:max-w-full max-md:flex-wrap" type='select' name='blood' value={formData.}
                    onChange={handleChange}
                    fullWidth placeholder='Enter blood group '>
            <option className='text-gray-500 text-base font-medium leading-4' value="A+">A+</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="B+">B+</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="A-">A-</option>
        </select>
                </div> */}
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  Pin code
                </div>
                <input className="text-gray-500 text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' value={formData.PinCode}
                    onChange={handleChange}
                    fullWidth name='PinCode' placeholder='Enter pin code'>
                 
                </input>
                
              </div>
            </div>
          </div>
        </div>
        </div>
        )}
        {activeStep === 1 && (
          <div>  <div className="items-stretch w-[1120px]  bg-white flex flex-col pb-12 px-7 max-md:px-5">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                  <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                    Educational qualification <span style={{ color: 'red' }}>*</span>
                  </div>
                  <input className="text-gray-500  text-base border-transparent font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' name='education_qualification' value={formData.education_qualification}
                    onChange={handleChange}
                    fullWidth placeholder='Educational Details' >
                 
                </input>
                {errors.education_qualification && <span style={{ color: 'red' }}>{errors.education_qualification}</span>}
                  {/* <div>
                  <select className="justify-between border-transparent  w-[500px] items-stretch bg-slate-100 flex gap-5 mt-2 px-3.5 py-4 rounded-md max-md:max-w-full max-md:flex-wrap" type='select' name='EducationQualification'  value={formData.EducationQualification}
                onChange={handleChange}
                fullWidth  placeholder='Educational Details'>
            <option className='text-gray-500 text-base font-medium leading-4' value="MBBS">MBBS</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Ph.d">Ph.d</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Teacher">Teacher</option>
        </select>
        
                     
                  </div> */}
                  <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                    Working details <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div >
                    <input className="justify-between  border-transparent  w-[500px] items-stretch text-slate-600 text-sm font-medium bg-slate-100 flex gap-5 mt-2 px-3.5 py-4 rounded-md max-md:max-w-full max-md:flex-wrap" type='text' name='working_details'  value={formData.working_details}
                onChange={handleChange}
                fullWidth   placeholder='Enter other working places'>
                   
                    </input>
                    {errors.working_details && <span style={{ color: 'red' }}>{errors.working_details}</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch flex grow flex-col mt-6 py-0.5 max-md:max-w-full max-md:mt-10">
                  <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
                    Specialization <span style={{ color: 'red' }}>*</span>
                  </div>
                  <input className="text-gray-500  border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5 " type='text' name='specialty'  value={formData.specialty}
                onChange={handleChange}
                fullWidth  placeholder='Enter Specialization'>
                   
                  </input>
                  {errors.specialty && <span style={{ color: 'red' }}>{errors.specialty}</span>}
                  <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                    Experience <span style={{ color: 'red' }}>*</span>
                  </div>
                  <input className="text-gray-500  border-transparent text-base font-medium leading-4 whitespace-nowrap bg-slate-100 justify-center mt-2 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5" type='text' name='experince'  value={formData.experince}
                onChange={handleChange}
                fullWidth  placeholder=' Enter experience'>
                   
                  </input>
                  {errors.experince && <span style={{ color: 'red' }}>{errors.experince}</span>}
                </div>
              </div>
            </div>
          </div>
         
        </div>
        </div>
        )}
        {activeStep === 2 && (
          <div> <div className="bg-white w-[1120px]   flex flex-col pl-7 pr-20 pt-7 pb-12 items-start max-md:px-5">
          <div className="text-slate-600 text-sm font-medium max-md:max-w-full">
            Identity Proof <span style={{ color: 'red' }}>*</span>
          </div>
          <div >
            <div className="text-gray-500 text-base font-medium leading-4 grow shrink basis-auto">
            
              <select className="justify-between border-transparent items-stretch bg-slate-100 flex w-[613px] max-w-full gap-5 mt-2 pl-5 pr-20 py-4 rounded-md max-md:flex-wrap max-md:pr-5" type='select' name='identity_proof'  value={formData.identity_proof}
                onChange={handleChange}
                fullWidth placeholder='Select required proof'>
            <option className='text-gray-500 text-base font-medium leading-4' value="Aadhar card">Aadhar card</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Voter.ID">Voter.ID</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Driving License">Driving License</option>
        </select>
        
            </div>
           
          </div>
          <div >
            <div className="text-gray-500 text-base font-medium leading-4 grow shrink basis-auto my-auto">
            <div className="justify-between items-stretch bg-slate-100 flex w-[613px] max-w-full gap-5 mt-2 pl-5 pr-20 py-3.5 rounded-md max-md:flex-wrap max-md:pr-5">
              
            <input type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" onChange={(e) => handleFileChange('identity_proof', e)}/>

              {formData.identity_proof && (
                <div>
                  <p> File Uploaded</p>
                
                </div>
              )}
            </div>
            </div> 
           
          </div>
          {errors.identity_proof && <span style={{ color: 'red' }}>{errors.identity_proof}</span>}
          <div className="text-slate-400 text-xs mt-2 max-md:max-w-full">
            Note : Accepted Format PNG,JPG,PDF)
          </div>
          <div className="text-slate-600 text-sm font-medium mt-12 max-md:max-w-full max-md:mt-10">
            Medical Registration Proof <span style={{ color: 'red' }}>*</span>
          </div>
          <div >
            
            <select className="justify-between border-transparent items-stretch bg-slate-100 text-slate-600 font-medium flex w-[613px] max-w-full gap-5 mt-2 pl-5 pr-20 py-4 rounded-md max-md:flex-wrap max-md:pr-5" type='select' name='medical_liscence'  value={formData.medical_liscence}
                onChange={handleChange}
                fullWidth placeholder='Select medical proof'>
            <option className='text-gray-500 text-base font-medium leading-4' value="License">License</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Qualification">Qualification</option>
            <option className='text-gray-500 text-base font-medium leading-4' value="Driving License">Driving License</option>
        </select>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f87d017bc4c70b01df65e73736595cd25785211056a10996739bef7475524b?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="aspect-square object-contain object-center w-[11px] overflow-hidden shrink-0 max-w-full my-auto"
            />
          </div>
          <div >
            <div className="text-gray-500 text-base font-medium leading-4 grow shrink basis-auto my-auto">
            <div className="justify-between items-stretch bg-slate-100 flex w-[613px] max-w-full gap-5 mt-2 pl-5 pr-20 py-3.5 rounded-md max-md:flex-wrap max-md:pr-5">
              
            <input  type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
  onChange={(e) => handleFileChange('medical_liscence', e)}/>
              {formData.medical_liscence && (
                <div>
                  <p>File Uploaded</p>
                
                </div>
              )}
            </div>
            </div>
           
          </div>
          {errors.medical_liscence && <span style={{ color: 'red' }}>{errors.medical_liscence}</span>}
          <div className="text-slate-400 text-xs mt-2 max-md:max-w-full">
            Note : Accepted Format PNG,JPG,PDF
          </div>
         
        </div>
        </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
          variant="outlined" size="medium"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </form>
    </Box>
    </div>
  );
}