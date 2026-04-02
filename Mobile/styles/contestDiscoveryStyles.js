import { StyleSheet } from 'react-native';

export const contestDiscoveryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe3',
  },
  header: {
    backgroundColor: '#fffdf8',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eadfca',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#17324d',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f6efe1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6efe1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#17324d',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingRight: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f6efe1',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#17324d',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7b6a53',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  timeFiltersContainer: {
    flexDirection: 'row',
    backgroundColor: '#f6efe1',
    borderRadius: 8,
    padding: 4,
  },
  timeFilterChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTimeFilterChip: {
    backgroundColor: '#fffdf8',
    shadowColor: '#7c5f3b',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeFilterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7b6a53',
  },
  activeTimeFilterText: {
    color: '#17324d',
  },
  contestList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17324d',
    marginBottom: 16,
  },
  contestCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#7c5f3b',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  contestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#17324d',
    marginBottom: 2,
  },
  platformName: {
    fontSize: 14,
    color: '#7b6a53',
  },
  liveTag: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contestDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#7b6a53',
  },
  contestActions: {
    alignItems: 'flex-start',
  },
  joinButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f766e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  reminderIcon: {
    fontSize: 12,
  },
  reminderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  viewMoreButton: {
    backgroundColor: '#fffdf8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7b6a53',
  },
});