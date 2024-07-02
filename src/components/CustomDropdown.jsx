import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const toggleRect = toggleRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - toggleRect.bottom;
      const spaceAbove = toggleRect.top;

      if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        setOpenAbove(true);
      } else {
        setOpenAbove(false);
      }
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={toggleRef}>
      <div
        className={`flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100 cursor-pointer ${isFocused ? 'border-2 border-black' : ''}`}
        onClick={() => { setIsOpen(!isOpen); setIsFocused(true); }}
      >
        {value ? options.find(option => option.value === value).label : 'Select the option'}
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 w-full text-slate-600 mt-1 rounded-md z-10 ${openAbove ? 'bottom-full mb-1' : 'top-full mt-1'}`}
        >
          {options.map(option => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;