import React, { useState } from 'react';
import { CPopover, CButton } from '@coreui/react';
import { SlCalender } from "react-icons/sl";
import { addMonths } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const MonthSelection = ({ selectedMonth }) => {
  const today = new Date();
  const nextmonths = addMonths(today, 0);
  const [month, setMonth] = useState(nextmonths);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setMonth(date);
    selectedMonth(date);
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div className='bg-slate-100 h-28 w-60'>
      <CPopover
        content={
          <div className='flex flex-1 justify-center'>
            <Calendar
              onChange={handleDateChange}
              value={month}
              view="month"
              maxDetail="month"
            />
          </div>
        }
        placement="bottom"
        trigger="click"
        visible={open}
        onClickOutside={handlePopoverClose}
      >
        <CButton
          className="flex gap-2 items-center text-slate-500 h-6 w-40"
          color="secondary"
          onClick={handlePopoverOpen}
        >
          <SlCalender />
          {moment(month).format('MMM yyyy')}
        </CButton>
      </CPopover>
    </div>
  );
}

export default MonthSelection;
