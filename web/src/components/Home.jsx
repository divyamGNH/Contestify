import React, { useEffect } from "react";
import useContestStore from "../Store/storeContests";

const Home = () => {
  const {
    personalPlatforms = [],          // default empty array
    livePersonalContestData = [],    // default empty array
    getPersonalPlatforms,
    getLiveContestData,
    getLivePersonalContestData,
  } = useContestStore();

  useEffect(() => {
    const fetchData = async () => {
      await getPersonalPlatforms();        // fetch API1
      await getLiveContestData();          // fetch API2
      await getLivePersonalContestData();  // filter live contests
    };
    fetchData();
  }, [getPersonalPlatforms, getLiveContestData, getLivePersonalContestData]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Your Selected Platforms
      </h2>

      {personalPlatforms.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {personalPlatforms.map((platform, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-colors"
            >
              {typeof platform === "string"
                ? platform
                : platform.label || JSON.stringify(platform)}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No platforms selected.</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">
        Live Contests
      </h2>

      {livePersonalContestData.length > 0 ? (
        <ul className="space-y-2">
          {livePersonalContestData.map((contest, index) => (
            <li key={index} className="p-3 bg-green-100 rounded-lg shadow">
              {contest.event} - {contest.platform}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No live contests.</p>
      )}
    </div>
  );
};

export default Home;
