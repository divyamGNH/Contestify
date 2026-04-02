import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe3',
  },
  
  header: {
    backgroundColor: '#17324d',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  settingsButton: {
    padding: 8,
  },
  
  settingsIcon: {
    fontSize: 20,
  },
  
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  userCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    shadowColor: '#7c5f3b',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  userTopSection: {
    backgroundColor: '#fffdf8',
    padding: 24,
    alignItems: 'center',
  },
  
  darkStatsSection: {
    backgroundColor: '#17324d',
    padding: 24,
  },
  
  avatarContainer: {
    marginBottom: 16,
  },
  
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0f766e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#17324d',
    marginBottom: 4,
  },
  
  userHandle: {
    fontSize: 16,
    color: '#7b6a53',
    marginBottom: 24,
  },
  
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  
  statValueDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  statLabelDark: {
    fontSize: 14,
    color: '#d3dfeb',
    marginTop: 4,
  },
  
  statDividerDark: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginHorizontal: 16,
  },
  
  sectionCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#7c5f3b',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17324d',
    marginBottom: 12,
  },
  
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    columnGap: 12,
  },
  
  settingItem: {
    width: '47%',
    backgroundColor: '#17324d',
    borderRadius: 16,
    padding: 20,
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  settingHighlight: {
    backgroundColor: '#0f766e',
  },
  
  settingDanger: {
    backgroundColor: '#ff7849',
  },
  
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  settingSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  
  settingTitleDanger: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  settingSubtitleDanger: {
    fontSize: 14,
    color: '#FEE2E2',
    textAlign: 'center',
  },
  
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  achievementItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  
  achievementEmoji: {
    fontSize: 24,
  },
  
  achievementLabel: {
    fontSize: 12,
    color: '#7b6a53',
    textAlign: 'center',
  },
  
  chartContainer: {
    height: 120,
    marginBottom: 16,
  },
  
  chartArea: {
    height: 80,
    position: 'relative',
    backgroundColor: '#f6efe1',
    borderRadius: 8,
    padding: 16,
  },
  
  chartLine: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#0f766e',
  },
  
  chartPoint: {
    position: 'absolute',
    top: 34,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0f766e',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  
  chartLabel: {
    fontSize: 12,
    color: '#7b6a53',
  },
  
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  performanceStat: {
    alignItems: 'center',
  },
  
  performanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#17324d',
  },
  
  performanceLabel: {
    fontSize: 12,
    color: '#7b6a53',
    marginTop: 4,
  },
  
  progressGrid: {
    gap: 16,
  },
  
  progressItem: {
    marginBottom: 16,
  },
  
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17324d',
    marginBottom: 4,
  },
  
  progressCount: {
    fontSize: 14,
    color: '#7b6a53',
    marginBottom: 8,
  },
  
  progressBar: {
    height: 6,
    backgroundColor: '#eadfca',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  
  platformsList: {
    gap: 12,
  },
  
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f6efe1',
    borderRadius: 12,
    marginBottom: 8,
  },
  
  platformIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  platformIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  platformInfo: {
    flex: 1,
  },
  
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17324d',
    marginBottom: 4,
  },
  
  platformProgress: {
    fontSize: 14,
    color: '#7b6a53',
  },
  
  platformArrow: {
    fontSize: 18,
    color: '#7b6a53',
  },
  
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  topicTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  
  topicText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  
  streakContainer: {
    alignItems: 'center',
  },
  
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
  },
  
  streakLabel: {
    fontSize: 16,
    color: '#7b6a53',
    marginBottom: 16,
  },
  
  streakDots: {
    flexDirection: 'row',
    gap: 8,
  },
  
  streakDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#eadfca',
  },
  
  streakDotActive: {
    backgroundColor: '#10B981',
  },
});