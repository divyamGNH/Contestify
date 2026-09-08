import axios from "axios";

/**
 * Fetch Codeforces rating & user info
 */
export const fetchCodeforcesData = async (handle) => {
  if (!handle) return null;
  try {
    const userInfoUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
    const ratingUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;

    const [userRes, ratingRes] = await Promise.all([
      axios.get(userInfoUrl).catch(() => null),
      axios.get(ratingUrl).catch(() => null),
    ]);

    if (!userRes || userRes.data.status !== "OK") return null;

    const userInfo = userRes.data.result[0];
    let lastRatingChange = 0;
    let lastContestName = null;

    if (ratingRes?.data?.status === "OK" && ratingRes.data.result.length > 0) {
      const last = ratingRes.data.result.at(-1);
      lastRatingChange = last.newRating - last.oldRating;
      lastContestName = last.contestName;
    }

    return {
      platform: "codeforces",
      handle: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || "Unrated",
      maxRank: userInfo.maxRank || "Unrated",
      avatar: userInfo.avatar || null,
      lastRatingChange,
      lastContestName,
    };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error.message);
    return null;
  }
};

/**
 * Fetch LeetCode rating & user statistics
 */
export const fetchLeetCodeData = async (handle) => {
  if (!handle) return null;
  try {
    const response = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${handle}`
    );

    if (response.data.status === "error") return null;

    const data = response.data;
    return {
      platform: "leetcode",
      handle,
      rating: data.ranking || 0,
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      acceptanceRate: data.acceptanceRate || 0,
      contributionPoints: data.contributionPoints || 0,
    };
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    return null;
  }
};

/**
 * Fetch CodeChef rating & user info
 */
export const fetchCodeChefData = async (handle) => {
  if (!handle) return null;
  try {
    const response = await axios.get(
      `https://codechef-api.vercel.app/handle/${handle}`
    );

    if (response.data.status !== 200 && !response.data.currentRating) {
      return null;
    }

    const data = response.data;
    return {
      platform: "codechef",
      handle,
      rating: data.currentRating || 0,
      maxRating: data.highestRating || 0,
      stars: data.stars || "1★",
      globalRank: data.globalRank || null,
      countryRank: data.countryRank || null,
    };
  } catch (error) {
    console.error("Error fetching CodeChef data:", error.message);
    return null;
  }
};

/**
 * Fetch AtCoder user rating & rank
 */
export const fetchAtCoderData = async (handle) => {
  if (!handle) return null;
  try {
    const response = await axios.get(
      `https://kenkoooo.com/atcoder/atcoder-api/v3/user/info?user=${handle}`
    );

    if (!response.data) return null;

    const data = response.data;
    return {
      platform: "atcoder",
      handle,
      rating: data.rating || 0,
      maxRating: data.highest_rating || 0,
      acceptedCount: data.accepted_count || 0,
      ratedPointSum: data.rated_point_sum || 0,
    };
  } catch (error) {
    console.error("Error fetching AtCoder data:", error.message);
    return null;
  }
};

/**
 * Consolidates user rating & stats across all supported competitive programming platforms
 */
export const fetchAllUserRatings = async (handles = {}) => {
  const { codeforces, leetcode, codechef, atcoder } = handles;

  const [cfData, lcData, ccData, acData] = await Promise.all([
    fetchCodeforcesData(codeforces),
    fetchLeetCodeData(leetcode),
    fetchCodeChefData(codechef),
    fetchAtCoderData(atcoder),
  ]);

  return {
    codeforces: cfData,
    leetcode: lcData,
    codechef: ccData,
    atcoder: acData,
  };
};
