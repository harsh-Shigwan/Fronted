import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import baseURL from '../assets/API_URL';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AppointmentTimeSlotGrid = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const [staff, setStaff] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isError, setIsError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dateContainerRef = useRef(null);

  const StaffAPI = `${baseURL}/api/staff/staff/`;
  const AttendanceAPI = `${baseURL}/api/staff/attendance/`;

  const getApiData = async () => {
    try {
      const res = await axios.get(StaffAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setStaff(res.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      console.log("Error response data:", error.response?.data);
    }
  };

  const getAttendanceData = async () => {
    try {
      const res = await axios.get(AttendanceAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const attendanceData = res.data.reduce((acc, item) => {
        const date = item.attendance_date.split('-').reverse().join('-');
        if (!acc[item.Staff]) acc[item.Staff] = {};
        acc[item.Staff][date] = item.is_present;
        return acc;
      }, {});
      setAttendance(attendanceData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      console.log("Error response data:", error.response?.data);
    }
  };

  useEffect(() => {
    getApiData();
    getAttendanceData();
  }, []);

  useEffect(() => {
    console.log('Attendance state:', attendance);
  }, [attendance]);

  const handleCheckboxChange = (e, staffId, date) => {
    e.preventDefault(); // Prevent the default checkbox behavior

    const newAttendance = !attendance[staffId]?.[date];
    setAttendance(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        [date]: newAttendance,
      },
    }));
    postAttendance(staffId, date, newAttendance);
  };

  const postAttendance = async (staffId, date, isPresent) => {
    try {
      await axios.post(AttendanceAPI, {
        id: staffId,
        attendance_date: date.split('-').reverse().join('-'), // Convert date format to YYYY-MM-DD
        is_present: isPresent,
        Staff: staffId,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Error posting attendance data:', error);
      console.log("Error response data:", error.response?.data);
    }
  };

  const generateDates = (month, year) => {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
     
        dates.push(`${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      
    }
    return dates;
  };

  const dates = generateDates(currentMonth.getMonth(), currentMonth.getFullYear());

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  useEffect(() => {
    const lastDateElement = document.getElementById(`date-${dates.length}`);
    if (lastDateElement) {
      dateContainerRef.current.scrollLeft = lastDateElement.offsetLeft - dateContainerRef.current.offsetLeft - (dateContainerRef.current.clientWidth / 2) + (lastDateElement.clientWidth / 2);
    }
  }, [currentMonth, dates]);

  const isToday = (dateString) => {
    const today = new Date();
    const [year, month, day] = dateString.split('-');
    return today.getDate() === parseInt(day) && (today.getMonth() + 1) === parseInt(month) && today.getFullYear() === parseInt(year);
  };

  // Dummy data for appointment times
  const appointmentTimeSlots = {
    "2024-07-01": ["09:00 AM - 10:00 AM", "10:30 AM - 11:30 AM"],
    "2024-07-02": ["11:00 AM - 12:00 PM", "01:00 PM - 02:00 PM"],
    // Add more dates and time slots as needed
  };

  return (
    <div className="container w-[1120px] ">
      <h1 className="text-2xl font-bold mb-4">Staff Attendance</h1>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 text-md flex items-center font-semibold text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark justify-center rounded bg-theme-white-default mb-6"
          onClick={handlePreviousMonth}
        >
          <FaChevronLeft className="mr-2" /> Previous Month
        </button>
        <button
          className="px-4 py-2 text-md font-semibold text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark justify-center rounded bg-theme-white-default mb-6 flex items-center"
          onClick={handleNextMonth}
        >
          Next Month <FaChevronRight className="ml-2" />
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar" ref={dateContainerRef}>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white h-[55px] border-indigo-200">
            <tr>
              <th className="sticky left-0 z-10 py-2 px-4 bg-indigo-100 text-text-body-light text-lg font-medium">ID's</th>
              <th className="sticky left-[55px] z-10 py-2 px-4 bg-indigo-100 text-text-body-light text-lg font-medium">Staff Name</th>
              {dates.map((date, index) => (
                <th key={date} id={`date-${index + 1}`} className="py-2 px-4 whitespace-nowrap bg-indigo-100 text-text-body-light text-lg font-medium">{date}</th>
              ))}
            </tr>
          </thead>
          <tbody className='h-auto'>
            {staff.map(st => (
              <tr key={st.id} className="text-center">
                <td className="sticky left-0 px-4 py-2 bg-theme-white-default text-text-body-light">{st.id}</td>
                <td className="sticky left-[55px] px-4 py-2 min-w-[220px] bg-theme-white-default  text-slate-600">{st.name}</td>
                {dates.map(date => (
                  <td key={date} className="px-4 py-2">
                    {appointmentTimeSlots[date]?.map((timeSlot, index) => (
                      <div key={index} className="mb-1 text-slate-600">
                        {timeSlot}
                      </div>
                    )) || <div className='text-slate-600'>No Appointments</div>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTimeSlotGrid;
