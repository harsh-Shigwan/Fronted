import React from 'react';
import { useState } from 'react'; 
import Breadcrumb from '../../components/Breadcrumb';

const  Staff_Form = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Add your random options here
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };
 
  const [searchValue, setSearchValue] = useState('');
  
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }
return(
 <div><Breadcrumb></Breadcrumb>
  <div className="flex w-[1100px] flex-col pt-3 whitespace-nowrap bg-white">
      <div className="flex gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
        <div className="flex-auto my-auto text-[22px] font-medium leading-6 text-slate-800">
          Attendance
        </div>
        <div className="flex flex-col justify-center px-8 py-2.5 text-xs font-semibold text-white bg-blue-700 rounded-md max-md:px-5">
          <div className="flex gap-2 justify-between">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/21210508ed3d5d252986b3662916e8eed0b74a94b52539b84e91be9a1ade72ed?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="w-5 aspect-square"
            />
            <div className="grow">Add Record</div>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full bg-slate-100 min-h-[1px] max-md:max-w-full" />
    </div>
    <div className="flex gap-5 mt-[30px] justify-between text-sm font-semibold leading-6 text-slate-400 max-md:flex-wrap">
      <div className="flex gap-5 justify-between h-[50px] px-5 py-4 whitespace-nowrap bg-white rounded-md">
        <div className="flex gap-5 justify-between">
          <div className="grow">24/10/2023</div>
          <div className="self-start mt-2">-</div>
          <div className="grow">30/10/2023</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fef422cf01d42481c435cb9d62a7f5b6f0b2c35eb859b89edb731c3161a4672?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
          className="my-auto ml-[60px] aspect-[2.44] fill-slate-400 w-[17px]"
        />
      </div>
      <div className="">
      <select
        className="btn btn-secondary dropdown-toggle flex gap-5 h-[50px] justify-between px-6 py-4 bg-white rounded-md max-md:pl-5"
        onChange={handleDropdownChange}
      >
        <option value="">All Staff</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
     
      {selectedOption && (
        <div className="absolute right-0 bottom-full bg-white p-2 rounded-md shadow-md">
          Selected: {selectedOption}
        </div>
      )}
    </div>
      <div className="flex gap-5 mr-[300px] h-[50px] justify-between px-6 py-4 bg-white rounded-md max-md:pl-5">
        <div className="flex-auto">Average Attendnce</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8bd0eb75197512012774856f2578663da92d982e6a67fa1ae5e96d5062f7d2e?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
          className="my-auto ml-[40px] aspect-[2.56] fill-slate-400 w-[18px]"
        />
      </div>
    </div>
    <div className='flex flex-row '>
    <div className="flex flex-row w-[1100px] h-[60px] mt-[30px] self-stretch text-sm bg-white font-semibold leading-6 whitespace-nowrap text-slate-800">
      <div className="self-start mt-[20px] text-[20px] ml-6 max-md:ml-2.5">All Attendance</div>
      <div className="flex justify-center mt-[10px] ml-[600px] text-xs leading-6 max-w-[270px] text-slate-400">
      {searchValue === '' && (
        <div className="flex gap-3.5 w-[250px] h-[40px] justify-between px-4 py-3 bg-white border border-black border-solid rounded-[30px]">
          <span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/778a94c44413bcf695123bda1362d44de587c53ba649a85424a666a1215f0a0f?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="w-3.5 aspect-square fill-black fill-opacity-80"
              alt="Search Icon"
            />
            <input
              className="flex-auto"
              type='text'
              placeholder='Search for a staff...'
              onChange={handleInputChange}
            />
          </span>
        </div>
      )}
    </div>
    </div>
      </div>
      <div className='flex flex-row'>
      <div className="flex flex-col w-[270px]  text-xs font-semibold leading-5 max-w-[331px] text-zinc-800">
      <div className="justify-center items-start py-6 pr-16 pl-6 w-full font-medium tracking-wider text-black uppercase whitespace-nowrap bg-indigo-100 shadow-sm leading-[133%]">
        Staff name
      </div>
      <div className="flex gap-3 justify-between px-6 py-3.5 bg-white shadow-sm">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d229206ed584164043b929b8f45a554a3154fd05cdcd925ccdd43f90d2b81d05?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
          className="w-6 aspect-square"
        />
        <div className="flex-auto self-start mt-2.5">User Segment 1</div>
      </div>
      
    </div>
    <div className="flex ml-[0px] flex-col pr-7 pb-12 text-sm whitespace-nowrap bg-white max-md:pr-5">
      <div className="flex flex-col self-center w-full leading-[143%] max-w-[801px] text-slate-600 max-md:max-w-full">
        <div className="flex gap-0 justify-between pr-6 text-xs font-medium tracking-wider leading-4 text-black uppercase max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="grow justify-center items-start h-[69px] py-6 pr-16 pl-6 bg-indigo-100 shadow-sm max-md:px-5">
            Department
          </div>
          <div className="grow justify-center px-4 py-6 bg-indigo-100 shadow-sm">
            Total monthly attendace
          </div>
          <div className="grow justify-center px-6 py-6 bg-indigo-100 shadow-sm max-md:pl-5">
            Average Attendace
          </div>
          <div className="grow justify-center items-start px-16 py-6 bg-indigo-100 shadow-sm max-md:pr-5 max-md:pl-6">
            Actions
          </div>
        </div>
        <div className="flex gap-0 justify-between max-md:flex-wrap max-md:max-w-full">
          <div className="grow justify-center items-start px-12 py-5 bg-white shadow-sm max-md:px-5">
            Doctor
          </div>
          <div className="grow justify-center items-start py-5 pr-16 pl-6 bg-white shadow-sm max-md:px-5">
            ABC
          </div>
          <div className="grow justify-center items-start py-5 pr-16 pl-6 bg-white shadow-sm max-md:px-5">
            85 %
          </div>
          <div className="flex gap-5 justify-between px-9 py-3.5 text-xs font-medium tracking-normal leading-3 text-blue-500 bg-white shadow-sm max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2d9108917a041b489bde3ed0ae6e2af6f3225fa8ba55f23a03bf906a994f958?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="self-start w-6 aspect-square"
            />
            <div className="justify-center px-4 py-2 rounded border border-indigo-500 border-solid aspect-[2.15]">
              View
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>

  )
}

export default  Staff_Form;