import { router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { bottomNavStyles } from '../styles/bottomNavStyles';

export default function BottomNavBar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      id: 'home',
      iconName: 'home-outline',
      label: 'Home',
      route: '/dashboard',
      isActive: pathname === '/dashboard'
    },
    {
      id: 'problems',
      iconName: 'code-slash-outline',
      label: 'Problems',
      route: '/problems',
      isActive: pathname === '/problems'
    },
    {
      id: 'contests',
      iconName: 'trophy-outline',
      label: 'Contests',
      route: '/contest-discovery',
      isActive: pathname === '/contest-discovery'
    },
    {
      id: 'chat',
      iconName: 'chatbubble-ellipses-outline',
      label: 'Chat',
      route: '/chat',
      isActive: pathname === '/chat'
    },
    {
      id: 'profile',
      iconName: 'person-outline',
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
              <Ionicons
                name={item.iconName}
                size={20}
                color={item.isActive ? '#FFFFFF' : '#8b7355'}
              />
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