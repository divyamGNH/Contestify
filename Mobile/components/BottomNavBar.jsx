import { router, usePathname } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { bottomNavStyles } from '../styles/bottomNavStyles';

export default function BottomNavBar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      id: 'home',
      icon: '🏠',
      label: 'Home',
      route: '/dashboard',
      isActive: pathname === '/dashboard'
    },
    {
      id: 'problems',
      icon: '💻',
      label: 'Problems',
      route: '/problems',
      isActive: pathname === '/problems'
    },
    {
      id: 'contests',
      icon: '🏆',
      label: 'Contests',
      route: '/contest-discovery',
      isActive: pathname === '/contest-discovery'
    },
    {
      id: 'profile',
      icon: '👤',
      label: 'Profile',
      route: '/profile',
      isActive: pathname === '/profile'
    }
  ];

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <View style={bottomNavStyles.container}>
      <View style={bottomNavStyles.navBar}>
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              bottomNavStyles.navItem,
              item.isActive && bottomNavStyles.activeNavItem
            ]}
            onPress={() => handleNavigation(item.route)}
          >
            <View style={[
              bottomNavStyles.iconContainer,
              item.isActive && bottomNavStyles.activeIconContainer
            ]}>
              <Text style={[
                bottomNavStyles.icon,
                item.isActive && bottomNavStyles.activeIcon
              ]}>
                {item.icon}
              </Text>
            </View>
            <Text style={[
              bottomNavStyles.label,
              item.isActive && bottomNavStyles.activeLabel
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}