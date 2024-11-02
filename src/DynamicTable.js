import React, { useState, useEffect, useCallback } from 'react';
import PieChart from './PieChart';
import { debounce } from 'lodash';

const DynamicTable = () => {
  const initialTable = Array.from({ length: 5 }, (_, index) => ({
    columns: [{ value: index + 1 }, { value: "" }, { value: "" }]
  }));

  const [tables, setTables] = useState([{ table: initialTable, header2Values: [] }]);
  const [header1, setHeader1] = useState("Header 1");
  const [header2, setHeader2] = useState("Header 2");

  const addRows = (tableIndex) => {
    const nextSerialNumber = tables[tableIndex].table.length + 1;
    const newRows = Array.from({ length: 5 }, (_, index) => ({
      columns: [{ value: nextSerialNumber + index }, { value: "" }, { value: "" }]
    }));
    const updatedTables = [...tables];
    updatedTables[tableIndex].table = [...updatedTables[tableIndex].table, ...newRows];
    setTables(updatedTables);
  };

  const handleInputChange = (tableIndex, rowIndex, colIndex, event) => {
    const updatedTables = [...tables];
    const newTable = updatedTables[tableIndex].table;
    newTable[rowIndex].columns[colIndex].value = event.target.value;
    updatedTables[tableIndex].table = newTable;
    setTables(updatedTables);
    debouncedCalculateHeader2Values(tableIndex); // Debounced calculation for specific table
  };

  const calculateHeader2Values = (tableIndex) => {
    const tableData = tables[tableIndex].table;
    const startValue = parseFloat(tableData[0]?.columns[1].value) || 0;
    const newHeader2Values = [];

    const updatedTable = tableData.map((row, index) => {
      if (index % 5 === 0 && tableData[index + 4]) {
        const targetValue = parseFloat(tableData[index + 4].columns[1].value) || 0;
        const difference = startValue - targetValue;
        newHeader2Values.push(difference);
        return {
          ...row,
          columns: [
            ...row.columns.slice(0, 2),
            { value: difference }
          ]
        };
      }
      return row;
    });

    const updatedTables = [...tables];
    updatedTables[tableIndex].table = updatedTable;
    updatedTables[tableIndex].header2Values = newHeader2Values;
    setTables(updatedTables);
  };

  const debouncedCalculateHeader2Values = useCallback(
    debounce((tableIndex) => calculateHeader2Values(tableIndex), 300),
    [tables]
  );

  const addTable = () => {
    const newTable = Array.from({ length: 5 }, (_, index) => ({
      columns: [{ value: index + 1 }, { value: "" }, { value: "" }]
    }));
    setTables([...tables, { table: newTable, header2Values: [] }]);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={addTable}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Add New Table
        </button>
      </div>

      {tables.map((tableData, tableIndex) => (
        <div key={tableIndex} className="mb-8">
          {tableIndex > 0 && <hr className="my-6 border-gray-400" />}

          <div className="mb-4">
            <button
              onClick={() => addRows(tableIndex)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Add Rows to Table {tableIndex + 1}
            </button>
          </div>

          {/* Flex container for table and pie chart side by side */}
          <div className="flex overflow-y-auto max-h-96 border rounded-lg p-4 space-x-4">
            {/* Table container with fixed width columns */}
            <div className="flex-1">
              <table className="min-w-full bg-white border border-gray-300 mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-2 border-b text-left w-1/6">Serial No.</th>
                    <th className="py-2 px-2 border-b text-left w-1/3">
                      <input
                        type="text"
                        value={header1}
                        onChange={(e) => setHeader1(e.target.value)}
                        className="border rounded w-full px-2 py-1"
                        placeholder="Header 1"
                      />
                    </th>
                    <th className="py-2 px-2 border-b text-left w-1/3">
                      <input
                        type="text"
                        value={header2}
                        onChange={(e) => setHeader2(e.target.value)}
                        className="border rounded w-full px-2 py-1"
                        placeholder="Header 2"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.table.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="py-2 px-2 border-t w-1/6">{row.columns[0].value}</td>
                      
                      <td className="py-2 px-2 border-t w-1/3">
                        <input
                          type="number"
                          value={row.columns[1].value}
                          onChange={(e) => handleInputChange(tableIndex, rowIndex, 1, e)}
                          className="border rounded w-full px-2 py-1"
                        />
                      </td>

                      {rowIndex % 5 === 0 ? (
                        <td
                          rowSpan="5"
                          className="py-2 px-2 border-t border-r bg-gray-100 align-top w-1/3"
                        >
                          <input
                            type="number"
                            value={row.columns[2].value}
                            readOnly
                            className="border rounded w-full px-2 py-1 h-full bg-gray-200"
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pie Chart container */}
            <div className="w-1/3 flex justify-center items-center">
              <PieChart data={tableData.header2Values} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
