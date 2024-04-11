import React, { useState } from 'react';

const Add_Staff = () => {
  const [formData, setFormData] = useState({
    department: '',
    shiftStartTime: '',
    staffMember: '',
    shiftEndTime: '',
    shiftDate: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (
      formData.department.trim() === '' ||
      formData.shiftStartTime.trim() === '' ||
      formData.staffMember.trim() === '' ||
      formData.shiftEndTime.trim() === '' ||
      formData.shiftDate.trim() === ''
    ) {
      setErrorMessage('All input fields are required');
    } else {
      // Your form submission logic here
      // For now, just logging the form data
      console.log(formData);
      // Clearing form data and error message after successful submission
      setFormData({
        department: '',
        shiftStartTime: '',
        staffMember: '',
        shiftEndTime: '',
        shiftDate: ''
      });
      setErrorMessage('');
    }
  };

  return (
    <div className="flex flex-col w-[1100px] pt-6 pb-12 font-medium bg-white">
      <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
        Schedule Staff
      </div>
      <div className="mt-6 w-full bg-slate-100 min-h-[1px] max-md:max-w-full" />
      <div className="flex flex-col px-7 mt-7 w-full text-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-[200px] justify-between max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Select Department*</div>
          <div className="flex-auto">Shift Start Time*</div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <div>
            <select
              className="flex gap-5 border-transparent justify-between w-[500px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
              type="select"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Select staff Department"
            >
              <option className="text-gray-500 text-base font-medium leading-4" value="">
                Select Department
              </option>
              <option className="text-gray-500 text-base font-medium leading-4" value="ICU">ICU</option>
              <option className="text-gray-500 text-base font-medium leading-4" value="IPD">IPD</option>
              <option className="text-gray-500 text-base font-medium leading-4" value="OPD">OPD</option>
            </select>
          </div>
          <input
    type="time"
    className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
    name="shiftStartTime"
    value={formData.shiftStartTime}
    onChange={handleChange}
    placeholder="Select time"
  />
            
          </div>
      
        <div className="flex gap-[500px] justify-between mt-8 max-w-full text-slate-600 w-[954px] max-md:flex-wrap">
          <div>Staff Member*</div>
          <div className="flex-auto">Shift End Time*</div>
        </div>
        <div className="flex gap-5 justify-between mt-3 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <div>
            <select
              className="flex gap-5 border-transparent justify-between w-[500px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
              type="select"
              name="staffMember"
              value={formData.staffMember}
              onChange={handleChange}
              placeholder="Select staff member"
            >
              <option className="text-gray-500 text-base font-medium leading-4" value="">
                Select Staff Member
              </option>
              <option className="text-gray-500 text-base font-medium leading-4" value="ICU">ICU</option>
              <option className="text-gray-500 text-base font-medium leading-4" value="IPD">IPD</option>
              <option className="text-gray-500 text-base font-medium leading-4" value="OPD">OPD</option>
            </select>
          </div>
          <input
    type="time"
    className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
    name="shiftStartTime"
    value={formData.shiftStartTime}
    onChange={handleChange}
    placeholder="Select time"
  /> 
         
        </div>
        <div className="mt-8 text-slate-600 max-md:max-w-full">Shift Date*</div>
        <div className="">
          <div className="">
            <input
              className="items-stretch h-[53px] w-[500px] border-transparent bg-slate-100 flex justify-between gap-5 mt-3 px-5 py-3 rounded-md max-md:max-w-full max-md:flex-wrap max-md:pr-5"
              type="date"
              name="shiftDate"
              value={formData.shiftDate}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
            />
          </div>
        </div>
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
      <div className="flex gap-5 justify-between self-end mt-40 mr-8 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5">
        <div
          className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5"
          onClick={() => setFormData({
            department: '',
            shiftStartTime: '',
            staffMember: '',
            shiftEndTime: '',
            shiftDate: ''
          })}
        >
          Cancel
        </div>
        <div
          className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5"
          onClick={handleSubmit}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default Add_Staff;