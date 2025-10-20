import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { profileStyles } from '../styles/profileStyles';

export default function Profile() {
  const userStats = {
    name: 'Suraj Sencha',
    username: '@surajsencha',
    problemsSolved: 156,
    contestRating: 1847,
    streak: 7
  };

  const achievements = [
    { id: 1, icon: '🏆', color: '#F59E0B', label: 'Contest Winner' },
    { id: 2, icon: '⭐', color: '#3B82F6', label: 'Problem Solver' },
    { id: 3, icon: '🔥', color: '#10B981', label: 'Streak Master' },
    { id: 4, icon: '💎', color: '#8B5CF6', label: 'Elite Coder' }
  ];

  const platforms = [
    { id: 1, name: 'LeetCode', solved: 89, total: 200, color: '#F59E0B' },
    { id: 2, name: 'CodeForces', solved: 45, total: 100, color: '#EF4444' },
    { id: 3, name: 'HackerRank', solved: 22, total: 50, color: '#10B981' }
  ];

  const favoriteTopics = [
    { id: 1, name: 'Dynamic Programming', color: '#3B82F6' },
    { id: 2, name: 'Graph Theory', color: '#F59E0B' },
    { id: 3, name: 'Trees', color: '#10B981' },
    { id: 4, name: 'Arrays', color: '#EF4444' }
  ];

  const performanceData = [
    { month: 'Jan', rating: 1650 },
    { month: 'Feb', rating: 1720 },
    { month: 'Mar', rating: 1680 },
    { month: 'Apr', rating: 1780 },
    { month: 'May', rating: 1847 }
  ];

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header */}
      <View style={profileStyles.header}>
        <Text style={profileStyles.headerTitle}>Profile</Text>
        <TouchableOpacity style={profileStyles.settingsButton}>
          <Text style={profileStyles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={profileStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* User Info Card - Dark Section */}
        <View style={profileStyles.userCard}>
          {/* Top white section with avatar and name */}
          <View style={profileStyles.userTopSection}>
            <View style={profileStyles.avatarContainer}>
              <View style={profileStyles.avatar}>
                <Text style={profileStyles.avatarText}>OD</Text>
              </View>
            </View>
            <Text style={profileStyles.userName}>{userStats.name}</Text>
            <Text style={profileStyles.userHandle}>{userStats.username}</Text>
          </View>
          
          {/* Dark/Black section with stats */}
          <View style={profileStyles.darkStatsSection}>
            <View style={profileStyles.statsContainer}>
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValueDark}>{userStats.problemsSolved}</Text>
                <Text style={profileStyles.statLabelDark}>Problems</Text>
              </View>
              <View style={profileStyles.statDividerDark} />
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValueDark}>{userStats.contestRating}</Text>
                <Text style={profileStyles.statLabelDark}>Rating</Text>
              </View>
              <View style={profileStyles.statDividerDark} />
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValueDark}>{userStats.streak}</Text>
                <Text style={profileStyles.statLabelDark}>Day Streak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Settings</Text>
          <View style={profileStyles.settingsGrid}>
            <TouchableOpacity style={[profileStyles.settingItem, profileStyles.settingHighlight]}>
              <Text style={profileStyles.settingTitle}>Change</Text>
              <Text style={profileStyles.settingSubtitle}>Usernames.</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={profileStyles.settingItem}>
              <Text style={profileStyles.settingTitle}>Filter</Text>
              <Text style={profileStyles.settingSubtitle}>Websites.</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={profileStyles.settingItem}>
              <Text style={profileStyles.settingTitle}>Change</Text>
              <Text style={profileStyles.settingSubtitle}>Display name.</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={profileStyles.settingItem}>
              <Text style={profileStyles.settingTitle}>Contact</Text>
              <Text style={profileStyles.settingSubtitle}>Us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={profileStyles.settingItem}>
              <Text style={profileStyles.settingTitle}>Sign</Text>
              <Text style={profileStyles.settingSubtitle}>Out.</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[profileStyles.settingItem, profileStyles.settingDanger]}>
              <Text style={profileStyles.settingTitleDanger}>Request</Text>
              <Text style={profileStyles.settingSubtitleDanger}>Account deletion.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Achievements</Text>
          <View style={profileStyles.achievementsGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity key={achievement.id} style={profileStyles.achievementItem}>
                <View style={[profileStyles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <Text style={profileStyles.achievementEmoji}>{achievement.icon}</Text>
                </View>
                <Text style={profileStyles.achievementLabel}>{achievement.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contest Performance Chart */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Contest Performance</Text>
          <View style={profileStyles.chartContainer}>
            <View style={profileStyles.chartArea}>
              <View style={profileStyles.chartLine} />
              {performanceData.map((point, index) => (
                <View key={index} style={[profileStyles.chartPoint, { left: `${(index / (performanceData.length - 1)) * 90}%` }]} />
              ))}
            </View>
            <View style={profileStyles.chartLabels}>
              {performanceData.map((point, index) => (
                <Text key={index} style={profileStyles.chartLabel}>{point.month}</Text>
              ))}
            </View>
          </View>
          <View style={profileStyles.performanceStats}>
            <View style={profileStyles.performanceStat}>
              <Text style={profileStyles.performanceValue}>1847</Text>
              <Text style={profileStyles.performanceLabel}>Current Rating</Text>
            </View>
            <View style={profileStyles.performanceStat}>
              <Text style={profileStyles.performanceValue}>+67</Text>
              <Text style={profileStyles.performanceLabel}>Last Contest</Text>
            </View>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Progress Overview</Text>
          <View style={profileStyles.progressGrid}>
            <View style={profileStyles.progressItem}>
              <Text style={profileStyles.progressValue}>Easy</Text>
              <Text style={profileStyles.progressCount}>45/120</Text>
              <View style={profileStyles.progressBar}>
                <View style={[profileStyles.progressFill, { width: '37%', backgroundColor: '#10B981' }]} />
              </View>
            </View>
            <View style={profileStyles.progressItem}>
              <Text style={profileStyles.progressValue}>Medium</Text>
              <Text style={profileStyles.progressCount}>89/200</Text>
              <View style={profileStyles.progressBar}>
                <View style={[profileStyles.progressFill, { width: '44%', backgroundColor: '#F59E0B' }]} />
              </View>
            </View>
            <View style={profileStyles.progressItem}>
              <Text style={profileStyles.progressValue}>Hard</Text>
              <Text style={profileStyles.progressCount}>22/80</Text>
              <View style={profileStyles.progressBar}>
                <View style={[profileStyles.progressFill, { width: '27%', backgroundColor: '#EF4444' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Competitive Platforms */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Competitive Platforms</Text>
          <View style={profileStyles.platformsList}>
            {platforms.map((platform) => (
              <TouchableOpacity key={platform.id} style={profileStyles.platformItem}>
                <View style={[profileStyles.platformIcon, { backgroundColor: platform.color }]}>
                  <Text style={profileStyles.platformIconText}>{platform.name.charAt(0)}</Text>
                </View>
                <View style={profileStyles.platformInfo}>
                  <Text style={profileStyles.platformName}>{platform.name}</Text>
                  <Text style={profileStyles.platformProgress}>{platform.solved}/{platform.total} solved</Text>
                </View>
                <Text style={profileStyles.platformArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Favorite Topics */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Favorite Topics</Text>
          <View style={profileStyles.topicsGrid}>
            {favoriteTopics.map((topic) => (
              <TouchableOpacity key={topic.id} style={[profileStyles.topicTag, { backgroundColor: topic.color }]}>
                <Text style={profileStyles.topicText}>{topic.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Streak */}
        <View style={profileStyles.sectionCard}>
          <Text style={profileStyles.sectionTitle}>Current Streak</Text>
          <View style={profileStyles.streakContainer}>
            <Text style={profileStyles.streakNumber}>{userStats.streak}</Text>
            <Text style={profileStyles.streakLabel}>Days</Text>
            <View style={profileStyles.streakDots}>
              {[...Array(7)].map((_, index) => (
                <View 
                  key={index}
                  style={[
                    profileStyles.streakDot,
                    index < userStats.streak ? profileStyles.streakDotActive : {}
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}