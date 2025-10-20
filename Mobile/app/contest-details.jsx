import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { contestDetailsStyles } from '../styles/contestDetailsStyles';

export default function ContestDetails() {
  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={contestDetailsStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Header */}
      <View style={contestDetailsStyles.header}>
        <TouchableOpacity onPress={goBack} style={contestDetailsStyles.backButton}>
          <Text style={contestDetailsStyles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={contestDetailsStyles.headerTitle}>CONTEST DETAILS</Text>
        <View style={contestDetailsStyles.headerActions}>
          <TouchableOpacity style={contestDetailsStyles.iconButton}>
            <Text style={contestDetailsStyles.iconText}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={contestDetailsStyles.iconButton}>
            <Text style={contestDetailsStyles.iconText}>⭐</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        {/* Contest Card */}
        <View style={contestDetailsStyles.contestCard}>
          <View style={contestDetailsStyles.contestHeader}>
            <View style={contestDetailsStyles.contestIcon}>
              <Text style={contestDetailsStyles.contestIconText}>{'</>'}</Text>
            </View>
            <View style={contestDetailsStyles.liveTag}>
              <Text style={contestDetailsStyles.liveText}>LIVE</Text>
            </View>
          </View>
          
          <Text style={contestDetailsStyles.contestTitle}>Weekly Programming Challenge #47</Text>
          <Text style={contestDetailsStyles.contestSubtitle}>Competitive Programming Contest</Text>
          
          {/* Timer */}
          <View style={contestDetailsStyles.timerSection}>
            <Text style={contestDetailsStyles.timerLabel}>Time left</Text>
            <View style={contestDetailsStyles.timerContainer}>
              <View style={contestDetailsStyles.timeBox}>
                <Text style={contestDetailsStyles.timeNumber}>02</Text>
              </View>
              <Text style={contestDetailsStyles.timeSeparator}>:</Text>
              <View style={contestDetailsStyles.timeBox}>
                <Text style={contestDetailsStyles.timeNumber}>34</Text>
              </View>
              <Text style={contestDetailsStyles.timeSeparator}>:</Text>
              <View style={contestDetailsStyles.timeBox}>
                <Text style={contestDetailsStyles.timeNumber}>56</Text>
              </View>
            </View>
          </View>
          
          {/* Stats */}
          <View style={contestDetailsStyles.statsRow}>
            <View style={contestDetailsStyles.statItem}>
              <Text style={contestDetailsStyles.statNumber}>1,247</Text>
              <Text style={contestDetailsStyles.statLabel}>Registered</Text>
            </View>
            <View style={contestDetailsStyles.statDivider} />
            <View style={contestDetailsStyles.statItem}>
              <View style={contestDetailsStyles.difficultyBadge}>
                <Text style={contestDetailsStyles.difficultyIcon}>⭐</Text>
                <Text style={contestDetailsStyles.difficultyText}>Hard</Text>
              </View>
            </View>
            <View style={contestDetailsStyles.statDivider} />
            <View style={contestDetailsStyles.statItem}>
              <Text style={contestDetailsStyles.statNumber}>3h</Text>
              <Text style={contestDetailsStyles.statLabel}>Duration</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={contestDetailsStyles.actionButtons}>
          <TouchableOpacity style={contestDetailsStyles.primaryButton}>
            <Text style={contestDetailsStyles.primaryButtonIcon}>{'</>'}</Text>
            <Text style={contestDetailsStyles.primaryButtonText}>View Problems</Text>
          </TouchableOpacity>
          
          <View style={contestDetailsStyles.secondaryButtons}>
            <TouchableOpacity style={contestDetailsStyles.secondaryButton}>
              <Text style={contestDetailsStyles.secondaryButtonIcon}>🔔</Text>
              <Text style={contestDetailsStyles.secondaryButtonText}>Set Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={contestDetailsStyles.secondaryButton}>
              <Text style={contestDetailsStyles.secondaryButtonIcon}>📅</Text>
              <Text style={contestDetailsStyles.secondaryButtonText}>Add to Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={contestDetailsStyles.tabContainer}>
          <TouchableOpacity style={[contestDetailsStyles.tab, contestDetailsStyles.activeTab]}>
            <Text style={[contestDetailsStyles.tabText, contestDetailsStyles.activeTabText]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={contestDetailsStyles.tab}>
            <Text style={contestDetailsStyles.tabText}>Rules</Text>
          </TouchableOpacity>
          <TouchableOpacity style={contestDetailsStyles.tab}>
            <Text style={contestDetailsStyles.tabText}>Rankings</Text>
          </TouchableOpacity>
        </View>

        {/* Contest Details */}
        <View style={contestDetailsStyles.detailsSection}>
          <Text style={contestDetailsStyles.sectionTitle}>Contest Details</Text>
          
          <View style={contestDetailsStyles.detailItem}>
            <Text style={contestDetailsStyles.detailLabel}>Start Time</Text>
            <Text style={contestDetailsStyles.detailValue}>Dec 15, 2024 - 10:00 AM</Text>
          </View>
          
          <View style={contestDetailsStyles.detailItem}>
            <Text style={contestDetailsStyles.detailLabel}>End Time</Text>
            <Text style={contestDetailsStyles.detailValue}>Dec 15, 2024 - 1:00 PM</Text>
          </View>
          
          <View style={contestDetailsStyles.detailItem}>
            <Text style={contestDetailsStyles.detailLabel}>Problems</Text>
            <Text style={contestDetailsStyles.detailValue}>4 Problems</Text>
          </View>
          
          <View style={contestDetailsStyles.detailItem}>
            <Text style={contestDetailsStyles.detailLabel}>Registration</Text>
            <Text style={[contestDetailsStyles.detailValue, contestDetailsStyles.openStatus]}>Open</Text>
          </View>
        </View>

        {/* Description */}
        <View style={contestDetailsStyles.descriptionSection}>
          <Text style={contestDetailsStyles.sectionTitle}>Description</Text>
          <Text style={contestDetailsStyles.descriptionText}>
            Join our weekly programming challenge featuring algorithmic problems ranging from data structures to 
            dynamic programming. Test your skills against participants worldwide and climb the leaderboard.
          </Text>
        </View>

        {/* Prizes & Recognition */}
        <View style={contestDetailsStyles.prizesSection}>
          <Text style={contestDetailsStyles.sectionTitle}>Prizes & Recognition</Text>
          <View style={contestDetailsStyles.prizeItem}>
            <Text style={contestDetailsStyles.prizeIcon}>🏆</Text>
            <Text style={contestDetailsStyles.prizeText}>Top 3 winners get featured on platform</Text>
          </View>
          <View style={contestDetailsStyles.prizeItem}>
            <Text style={contestDetailsStyles.prizeIcon}>🏅</Text>
            <Text style={contestDetailsStyles.prizeText}>Achievement badges for all participants</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}