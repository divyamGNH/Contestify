import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function ContestFilter() {
  const [contests, setContests] = useState([]); // All contests from API
  const [platformOptions, setPlatformOptions] = useState([]); // React Select options
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Platforms for filtering

  // Fetch data from backend API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getPlatformData")
      .then((res) => {
        const data = res.data;
        console.log("API Data:", data);

        setContests(data);

        // Build options from "name"
        const options = data.map((item) => ({
          label: item.name,
          value: item.name,
        }));

        // Remove duplicates
        const uniqueOptions = Array.from(
          new Map(options.map((opt) => [opt.value, opt])).values()
        );

        setPlatformOptions(uniqueOptions);

        // ✅ Select all platforms internally for filtering
        // setSelectedPlatforms(uniqueOptions);
      })
      .catch((err) => {
        console.error("Error fetching contests:", err);
      });
  }, []);

  // Handle when user selects from dropdown
  const handlePlatformChange = (selectedOptions) => {
    // If nothing selected, set to [] so no contests are shown
    setSelectedPlatforms(selectedOptions || []);
  };

  // Filtering logic
  const filteredContests =
    selectedPlatforms.length === 0
      ? []
      : contests.filter((contest) =>
          selectedPlatforms.some((p) => p.value === contest.name)
        );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Platforms</h1>

      {/* Platform Selector */}
      <Select
        isMulti
        options={platformOptions}
        // Show empty search bar if all are internally selected
        value={
          selectedPlatforms.length === platformOptions.length
            ? []
            : selectedPlatforms
        }
        onChange={handlePlatformChange}
        className="mb-6"
        placeholder="Filter by platform..."
      />

      {/* Contest List */}
      <ul className="space-y-4">
        {filteredContests.length === 0 ? (
          <li className="text-gray-500">No platforms found.</li>
        ) : (
          filteredContests.map((contest) => (
            <li
              key={contest.id}
              className="p-4 border rounded shadow hover:shadow-lg transition flex items-center gap-4"
            >
              <img
                src={contest.icon}
                alt={contest.name}
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-semibold">{contest.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
