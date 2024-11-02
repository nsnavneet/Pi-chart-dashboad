import React, { useState } from 'react';

const Table = () => {
  // Initial data for rows (sample data based on your provided image)
  const initialData = [
    { person: 1, box: 100, percentage: 30 },
    { person: 2, box: 90, percentage: null },
    { person: 3, box: 80, percentage: null },
    { person: 4, box: 50, percentage: 30 },
    { person: 5, box: 70, percentage: null },
    { person: 6, box: 20, percentage: null },
    { person: 7, box: 25, percentage: 80 },
    { person: 8, box: 30, percentage: null },
    // Add more rows as needed
  ];

  const [data, setData] = useState(initialData);

  const calculatePercentage = (boxValue) => {
    // Define your conditions here
    if (boxValue === 100) return 30;
    if (boxValue === 50) return 30;
    if (boxValue === 25) return 80;
    if (boxValue === 20) return 60;
    // Add additional conditions if needed
    return null; // Default if no conditions are met
  };

  // Apply the calculation to the percentage column
  const updatePercentages = () => {
    const updatedData = data.map(row => ({
      ...row,
      percentage: calculatePercentage(row.box)
    }));
    setData(updatedData);
  };

  return (
    <div className="p-4">
      <button
        onClick={updatePercentages}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Calculate Percentages
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 border-b">Person</th>
            <th className="py-2 border-b">Box</th>
            <th className="py-2 border-b">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2">{row.person}</td>
              <td className="py-2">{row.box}</td>
              <td className="py-2">{row.percentage || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
