import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Teacherupdate = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRowClick = (id) => {
    console.log(id);
    navigate(`/updatedetailstea/${id}`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/searchteacher`, {
        params: { name: query.toLowerCase() },
      });
      setResults(response.data || []);
      console.log(response);
     
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by name"
          className="flex-grow p-2 outline-none text-white bg-transparent"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div>
        {results.length > 0 && (
          <table className="table-auto w-full mt-4 border-collapse border border-black bg-gray-600">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Subject</th>
                <th className="p-2 border border-gray-300">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.teacher_id}
                  onClick={() => handleRowClick(item.teacher_id)}
                  className="hover:bg-gray-600 cursor-pointer"
                >
                  <td className="p-2 border border-gray-300 cursor-pointer">
                    {item.teacher_name}
                  </td>
                  <td className="p-2 border border-gray-300 cursor-pointer">
                    {item.subject_name}
                  </td>
                  <td className="p-2 border border-gray-300 cursor-pointer">
                    {item.contact_no}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {results.length === 0 && query && (
          <p className="text-red mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Teacherupdate;
