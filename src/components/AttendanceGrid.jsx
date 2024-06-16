import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from 'moment';

const AttendanceGrid = ({ attadanceList, selectedMonth }) => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'id' },
        { field: 'name' },
    ]);

    const dayInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    // Ensure selectedMonth is a valid date
    const year = moment(selectedMonth).year();
    const month = moment(selectedMonth).month(); // Note: month is 0-indexed in moment.js
    const numberOfDays = dayInMonth(year, month);

    const dayArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    console.log('Number of days in selected month:', numberOfDays);

    useEffect(() => {
        setRowData(attadanceList);

        // Add dynamic columns for each day in the month
        const dynamicCols = dayArray.map(day => ({
            field: `day_${day}`,
            headerName: day.toString(),
            width: 50,
            editable: true,
            cellRenderer: params => (
                <input
                    type="checkbox"
                    checked={params.value}
                    onChange={e => {
                        const newValue = e.target.checked;
                        const updatedData = rowData.map(row => {
                            if (row.id === params.data.id) {
                                return { ...row, [`day_${day}`]: newValue };
                            }
                            return row;
                        });
                        
                        setRowData(updatedData);
                    }}
                />
            )
        }));

        // Combine static and dynamic columns
        setColDefs([
            { field: 'id' },
            { field: 'name' },
            ...dynamicCols
        ]);
    }, [attadanceList, selectedMonth]);

    return (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    );
};

export default AttendanceGrid;




// import React, { useEffect, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
// import moment from 'moment';

// const AttendanceGrid = ({ attadanceList, selectedMonth }) => {
//     const [rowData, setRowData] = useState([]);
//     const [colDefs, setColDefs] = useState([
//         { field: 'id' },
//         { field: 'name' },
//     ]);

//     const dayInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//     // Ensure selectedMonth is a valid date
//     const year = moment(selectedMonth).year();
//     const month = moment(selectedMonth).month(); // Note: month is 0-indexed in moment.js
//     const numberOfDays = dayInMonth(year, month);

//     const dayArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
//     console.log('Number of days in selected month:', numberOfDays);

//     useEffect(() => {
//         setRowData(attadanceList);

//         // Add dynamic columns for each day in the month
//         const dynamicCols = dayArray.map(day => ({
//             field: `day_${day}`,
//             headerName: day.toString(),
//             width: 50,
//             editable: true,
//             cellRenderer: params => (
//                 <input
//                     type="checkbox"
//                     checked={params.value}
//                     onChange={e => {
//                         const newValue = e.target.checked;
//                         const updatedData = rowData.map(row => {
//                             if (row.id === params.data.id) {
//                                 return { ...row, [`day_${day}`]: newValue };
//                             }
//                             return row;
//                         });
                        
//                         setRowData(updatedData);
//                     }}
//                 />
//             )
//         }));

//         // Combine static and dynamic columns
//         setColDefs([
//             { field: 'id' },
//             { field: 'name' },
//             ...dynamicCols
//         ]);
//     }, [attadanceList, selectedMonth]);

//     return (
//         <div className="ag-theme-quartz" style={{ height: 500 }}>
//             <AgGridReact
//                 rowData={rowData}
//                 columnDefs={colDefs}
//             />
//         </div>
//     );
// };

// export default AttendanceGrid;