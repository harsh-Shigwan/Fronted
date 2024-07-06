import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { parseISO, getMonth, getYear } from "date-fns";
import { defaults } from "chart.js/auto";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DateChart = ({ dates, dates1, dates2 }) => {
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "center";
  defaults.plugins.title.font.size = 15;
  defaults.plugins.title.color = "black";

  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: ' Patients',
        data: Array(12).fill(0),
        backgroundColor: "rgba(120, 149, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(120, 149, 255, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        borderRadius: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
      {
        label: "IPD Patients",
        data: Array(12).fill(0),
        backgroundColor: "rgba(243, 221, 24, 1)",
        borderColor: "rgba(243, 221, 24, 1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(243, 221, 24, 0.6)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        borderRadius: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
      {
        label: "OPD Patients",
        data: Array(12).fill(0),
        backgroundColor: "rgba(253, 129, 156, 1)",
        borderColor: "rgba(253, 129, 156, 1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(253, 129, 156, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        borderRadius: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
    ],
  });

  useEffect(() => {
    const filteredDates = dates.filter(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      return getYear(parseISO(date)) === year;
    });

    const filteredDates1 = dates1.filter(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      return getYear(parseISO(date)) === year;
    });

    const filteredDates2 = dates2.filter(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      return getYear(parseISO(date)) === year;
    });

    const monthCounts = Array(12).fill(0);
    const monthCounts1 = Array(12).fill(0);
    const monthCounts2 = Array(12).fill(0);

    filteredDates.forEach(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      monthCounts[getMonth(parseISO(date))]++;
    });

    filteredDates1.forEach(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      monthCounts1[getMonth(parseISO(date))]++;
    });

    filteredDates2.forEach(item => {
      const date = item.Register_Date || item.admission_date || item.visit_date;
      monthCounts2[getMonth(parseISO(date))]++;
    });

    setChartData(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: monthCounts,
        },
        {
          ...prevState.datasets[1],
          data: monthCounts1,
        },
        {
          ...prevState.datasets[2],
          data: monthCounts2,
        },
      ],
    }));
  }, [year, dates, dates1, dates2]);

  const handlePreviousYear = () => {
    setYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setYear(prevYear => prevYear + 1);
  };


  return (
    <div>
   
      <div className="">
        <div className="dataCard w-[800px] customerCard rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)]">
        <div className="  pt-1  flex flex-row">
        <button
        className="px-4 py-2 ml-5  mt-2  text-sm flex items-center font- text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark justify-center rounded bg-theme-white-default mb-0 "
        onClick={handlePreviousYear}
      >
        <FaChevronLeft className="mr-2" />Previous Year
      </button><button
      className="px-4 py-2 ml-[488px] mt-2   text-md font- text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark justify-center rounded bg-theme-white-default mb-0  flex items-center"
      onClick={handleNextYear}
    >
      Next Month <FaChevronRight className="ml-2" />
    </button> </div>
    <div className=" text-slate-500 ml-5 mt-2 font-semibold">Year : {year}</div>
      <div className=" ">
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Patients Counts ',
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: true,
                  },
                },
              },
            }}
          /></div>
        </div>
      </div>
     
    </div>
  );
};

export default DateChart;
