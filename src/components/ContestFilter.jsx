import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function ContestFilter() {
  const [contests, setContests] = useState([]); // All contests from API
  const [platforms, setPlatforms] = useState([]); // All unique platforms extracted
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Selected platform options
  const [searchTerm, setSearchTerm] = useState(""); // Search input by user

  // Fetch contests data from backend API on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/getContestData") // your backend API endpoint
      .then((res) => {

        // console.log(res.data);
        // console.log("res.data type is ", typeof res.data);

        const data = res.data;
        console.log(data);

        setContests(data);

        // Extract unique platforms from contest data.
        const uniquePlatforms = [...new Set(data.map((c) => c.platform))];

        // Format for react-select options [{label, value}]
        setPlatforms(uniquePlatforms.map((p) => ({ label: p, value: p })));

        // Optional: select all platforms by default
        console.log("Available Platforms:", uniquePlatforms);

        // setSelectedPlatforms(
        //   uniquePlatforms.map((p) => ({ label: p, value: p }))
        // );
      })
      .catch((err) => {
        console.error("Error fetching contests:", err);
      });
  }, []);

  // Handle platform toggle (react-select onChange)
  const handlePlatformChange = (selectedOptions) => {
    setSelectedPlatforms(selectedOptions || []);
  };

  // Filter contests by selected platforms and search term
  const filteredContests = contests.filter((contest) => {
    const matchesPlatform =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some((p) => p.value === contest.platform);
    const matchesSearch = contest.event
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Contests</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search contests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Platform Selector */}
      <Select
        isMulti
        options={platforms}
        value={selectedPlatforms}
        onChange={handlePlatformChange}
        className="mb-6"
        placeholder="Filter by platforms..."
      />

      {/* Contest List */}
      <ul className="space-y-4">
        {filteredContests.length === 0 ? (
          <li className="text-gray-500">No contests found.</li>
        ) : (
          filteredContests.map((contest) => (
            <li
              key={contest.id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{contest.event}</h2>
              <p className="text-sm text-gray-600">
                Platform:{" "}
                <span className="font-medium">{contest.platform}</span> | Start:{" "}
                {new Date(contest.start).toLocaleString()}
              </p>
              <a
                href={contest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Contest
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
