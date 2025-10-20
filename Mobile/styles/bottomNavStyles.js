import { StyleSheet } from 'react-native';

export const bottomNavStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    // Additional styling for active item if needed
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: '#8B5CF6',
  },
  icon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  activeIcon: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeLabel: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});