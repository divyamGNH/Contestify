import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { contestDiscoveryStyles } from '../styles/contestDiscoveryStyles';

const API_BASE_URL = 'http://172.28.220.254:3000/api';

class Contest {
  constructor(data) {
    this.id = data.id;
    this.title = data.event;
    this.platform = data.platform;
    this.host = data.host;
    this.start = data.start;
    this.href = data.href;
  }

  isLive() {
    const now = new Date();
    const start = new Date(this.start);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return now >= start && now <= end;
  }

  getFormattedDate() {
    const date = new Date(this.start);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    return `${formattedDate} • ${time} UTC`;
  }

  matchesSearch(searchText) {
    if (!searchText) return true;
    const search = searchText.toLowerCase();
    return this.title.toLowerCase().includes(search) || 
           this.platform.toLowerCase().includes(search);
  }

  matchesPlatform(filter) {
    if (filter === 'All') return true;
    return this.platform.toLowerCase().includes(filter.toLowerCase());
  }

  matchesTimeFilter(timeFilter) {
    if (timeFilter === 'Live') return this.isLive();
    if (timeFilter === 'Upcoming') return !this.isLive();
    return false;
  }
}

const ContestCard = ({ contest, platformsData, onPress, onOpenContest }) => {
  const getPlatformIcon = () => {
    if (!contest.platform || !platformsData.length) return null;
    
    let platform = platformsData.find(p => 
      p.name.toLowerCase() === contest.platform.toLowerCase()
    );
    
    if (!platform) {
      platform = platformsData.find(p => 
        p.name.toLowerCase().includes(contest.platform.toLowerCase()) ||
        contest.platform.toLowerCase().includes(p.name.toLowerCase())
      );
    }
    
    return platform?.icon || null;
  };

  const iconUrl = getPlatformIcon();

  return (
    <TouchableOpacity
      style={contestDiscoveryStyles.contestCard}
      onPress={onPress}
    >
      <View style={contestDiscoveryStyles.contestHeader}>
        {iconUrl ? (
          <Image 
            source={{ uri: iconUrl }}
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 8, 
              marginRight: 12, 
              backgroundColor: '#F3F4F6' 
            }}
            resizeMode="contain"
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          />
        ) : (
          <View style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 8, 
            marginRight: 12, 
            backgroundColor: '#E5E7EB', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6B7280' }}>
              {contest.platform.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        )}
        
        <View style={contestDiscoveryStyles.contestInfo}>
          <Text style={contestDiscoveryStyles.contestTitle} numberOfLines={2}>
            {contest.title}
          </Text>
          <Text style={contestDiscoveryStyles.platformName}>
            {contest.platform}
          </Text>
        </View>

        {contest.isLive() && (
          <View style={contestDiscoveryStyles.liveTag}>
            <Text style={contestDiscoveryStyles.liveText}>LIVE</Text>
          </View>
        )}
      </View>

      <View style={contestDiscoveryStyles.contestDetails}>
        <View style={contestDiscoveryStyles.detailRow}>
          <Text style={contestDiscoveryStyles.detailIcon}>📅</Text>
          <Text style={contestDiscoveryStyles.detailText}>
            {contest.getFormattedDate()}
          </Text>
        </View>
        <View style={contestDiscoveryStyles.detailRow}>
          <Text style={contestDiscoveryStyles.detailIcon}>🌐</Text>
          <Text style={contestDiscoveryStyles.detailText}>{contest.host}</Text>
        </View>
      </View>

      <View style={contestDiscoveryStyles.contestActions}>
        {contest.isLive() ? (
          <TouchableOpacity 
            style={contestDiscoveryStyles.joinButton}
            onPress={() => onOpenContest(contest.href)}
          >
            <Text style={contestDiscoveryStyles.joinButtonText}>
              Join Contest
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={contestDiscoveryStyles.reminderButton}>
            <Text style={contestDiscoveryStyles.reminderIcon}>🔔</Text>
            <Text style={contestDiscoveryStyles.reminderButtonText}>
              Set Reminder
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function ContestDiscovery() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const [contests, setContests] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [platformsData, setPlatformsData] = useState([]);

  useEffect(() => {
    const now = Date.now();
    const CACHE_DURATION = 5 * 60 * 1000;
    
    if (!lastFetch || (now - lastFetch) > CACHE_DURATION) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [lastFetch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [contestsResponse, platformsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/getContestData/`),
        axios.get(`${API_BASE_URL}/getPlatformData/`)
      ]);

      const contestObjects = contestsResponse.data.map(data => new Contest(data));

      setPlatformsData(platformsResponse.data);
      const platformNames = ['All', ...new Set(platformsResponse.data.map(p => p.name))];

      setContests(contestObjects);
      setPlatforms(platformNames);
      setLastFetch(Date.now());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load contests. Please try again.');
      setLoading(false);
    }
  };

  const filteredContests = contests.filter(contest => 
    contest.matchesPlatform(selectedFilter) &&
    contest.matchesSearch(searchText) &&
    contest.matchesTimeFilter(selectedTimeFilter)
  );

  const goToContestDetails = (contest) => {
    router.push({
      pathname: '/contest-details',
      params: { contestId: contest.id }
    });
  };

  const handleOpenContest = (href) => {
    if (href) {
      
    }
  };

  const timeFilters = ['Upcoming', 'Live', 'Past'];

  if (loading) {
    return (
      <SafeAreaView style={contestDiscoveryStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ marginTop: 10, color: '#6B7280' }}>
            Loading contests...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={contestDiscoveryStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#EF4444', fontSize: 16, textAlign: 'center' }}>
            {error}
          </Text>
          <TouchableOpacity 
            onPress={fetchData}
            style={{ marginTop: 20, backgroundColor: '#3B82F6', padding: 12, borderRadius: 8 }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={contestDiscoveryStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={contestDiscoveryStyles.header}>
        <View style={contestDiscoveryStyles.headerTop}>
          <Text style={contestDiscoveryStyles.headerTitle}>Contest Discovery</Text>
          <TouchableOpacity style={contestDiscoveryStyles.filterButton} onPress={fetchData}>
            <Text style={contestDiscoveryStyles.filterIcon}>🔄</Text>
          </TouchableOpacity>
        </View>

        <View style={contestDiscoveryStyles.searchContainer}>
          <Text style={contestDiscoveryStyles.searchIcon}>🔍</Text>
          <TextInput
            style={contestDiscoveryStyles.searchInput}
            placeholder="Search contests..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={contestDiscoveryStyles.filtersContainer}
          contentContainerStyle={contestDiscoveryStyles.filtersContent}
        >
          {platforms.slice(0, 10).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                contestDiscoveryStyles.filterChip,
                selectedFilter === filter && contestDiscoveryStyles.activeFilterChip
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  contestDiscoveryStyles.filterText,
                  selectedFilter === filter && contestDiscoveryStyles.activeFilterText
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={contestDiscoveryStyles.timeFiltersContainer}>
          {timeFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                contestDiscoveryStyles.timeFilterChip,
                selectedTimeFilter === filter && contestDiscoveryStyles.activeTimeFilterChip
              ]}
              onPress={() => setSelectedTimeFilter(filter)}
            >
              <Text
                style={[
                  contestDiscoveryStyles.timeFilterText,
                  selectedTimeFilter === filter && contestDiscoveryStyles.activeTimeFilterText
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView 
        style={contestDiscoveryStyles.contestList} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{paddingBottom: 100}}
      >
        <Text style={contestDiscoveryStyles.sectionTitle}>
          {filteredContests.length} Contest{filteredContests.length !== 1 ? 's' : ''}
        </Text>
        
        {filteredContests.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#6B7280', fontSize: 16 }}>No contests found</Text>
          </View>
        ) : (
          filteredContests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              platformsData={platformsData}
              onPress={() => goToContestDetails(contest)}
              onOpenContest={handleOpenContest}
            />
          ))
        )}
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}