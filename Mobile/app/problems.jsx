import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { problemsStyles } from '../styles/problemsStyles';

export default function Problems() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Problems');

  const goToProblemDetails = (problemId) => {
    router.push(`/problem-details?problemId=${problemId}`);
  };

  const problems = [
    {
      id: 1,
      problemId: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      platform: 'LeetCode',
      topics: ['Arrays', 'Hash Table'],
      completion: 85.2,
      isCompleted: true,
      difficultyColor: '#10B981'
    },
    {
      id: 2,
      problemId: 'longest-palindrome',
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      platform: 'LeetCode',
      topics: ['String', 'Dynamic Programming'],
      completion: 32.8,
      isCompleted: false,
      difficultyColor: '#F59E0B'
    },
    {
      id: 3,
      problemId: 'two-sum', // Using two-sum as fallback for demo
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      platform: 'LeetCode',
      topics: ['Arrays', 'Binary Search'],
      completion: 35.1,
      isCompleted: true,
      difficultyColor: '#EF4444'
    },
    {
      id: 4,
      problemId: 'two-sum', // Using two-sum as fallback for demo
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      platform: 'HackerRank',
      topics: ['Stack', 'String'],
      completion: 91.4,
      isCompleted: false,
      difficultyColor: '#10B981'
    },
    {
      id: 5,
      problemId: 'two-sum', // Using two-sum as fallback for demo
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      platform: 'CodeForces',
      topics: ['Tree', 'DFS'],
      completion: 74.2,
      isCompleted: true,
      difficultyColor: '#F59E0B'
    }
  ];

  return (
    <SafeAreaView style={problemsStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={problemsStyles.header}>
        <Text style={problemsStyles.headerTitle}>PROBLEM BROWSER</Text>
        
        {/* Filter Dropdown */}
        <View style={problemsStyles.filterContainer}>
          <TouchableOpacity style={problemsStyles.filterDropdown}>
            <Text style={problemsStyles.filterIcon}>⚙️</Text>
            <Text style={problemsStyles.filterText}>{selectedFilter}</Text>
            <Text style={problemsStyles.dropdownIcon}>⚙️</Text>
            <Text style={problemsStyles.sortIcon}>📊</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={problemsStyles.searchContainer}>
          <Text style={problemsStyles.searchIcon}>🔍</Text>
          <TextInput
            style={problemsStyles.searchInput}
            placeholder="Search problems..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Problems List */}
      <ScrollView 
        style={problemsStyles.problemsList} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        {problems.map((problem) => (
          <TouchableOpacity
            key={problem.id}
            style={problemsStyles.problemCard}
            onPress={() => goToProblemDetails(problem.problemId)}
          >
            <View style={problemsStyles.problemHeader}>
              <Text style={problemsStyles.problemTitle}>{problem.title}</Text>
              <View style={problemsStyles.completionContainer}>
                <Text style={problemsStyles.completionText}>{problem.completion}%</Text>
                <View style={problemsStyles.completionIcon}>
                  {problem.isCompleted ? (
                    <Text style={problemsStyles.completedIcon}>✅</Text>
                  ) : (
                    <View style={problemsStyles.incompleteCircle} />
                  )}
                </View>
              </View>
            </View>

            <View style={problemsStyles.problemMeta}>
              <View style={[
                problemsStyles.difficultyBadge,
                { backgroundColor: problem.difficultyColor }
              ]}>
                <Text style={problemsStyles.difficultyText}>{problem.difficulty}</Text>
              </View>
              <Text style={problemsStyles.platformText}>{problem.platform}</Text>
            </View>

            <View style={problemsStyles.topicsContainer}>
              {problem.topics.map((topic, index) => (
                <View key={index} style={problemsStyles.topicTag}>
                  <Text style={problemsStyles.topicText}>{topic}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}