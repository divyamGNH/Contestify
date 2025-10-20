import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { problemDetailsStyles } from '../styles/problemDetailsStyles';

// Problem data structure - you can move this to a separate file later
const PROBLEM_DATA = {
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    platform: 'LeetCode',
    difficultyColor: '#10B981',
    topics: ['Array', 'Hash Table', 'Two Pointers'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.'
    ],
    hints: [
      'Try using a hash table to store the complement of each number',
      'For each number, check if its complement exists in the hash table'
    ]
  },
  'longest-palindrome': {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    platform: 'LeetCode',
    difficultyColor: '#F59E0B',
    topics: ['String', 'Dynamic Programming'],
    description: `Given a string s, return the longest palindromic substring in s.

A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: 'Note: "aba" is also a valid answer.'
      }
    ],
    constraints: [
      '1 ≤ s.length ≤ 1000',
      's consist of only digits and English letters.'
    ],
    hints: [
      'Consider the center expansion approach',
      'Think about odd and even length palindromes'
    ]
  }
  // Add more problems here as needed
};

export default function ProblemDetails() {
  const params = useLocalSearchParams();
  const [currentProblem, setCurrentProblem] = useState(null);
  const [solveTime, setSolveTime] = useState('00:00:00');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [seconds, setSeconds] = useState(0);

  // Get problem ID from route params, default to 'two-sum'
  const problemId = params.problemId || 'two-sum';

  useEffect(() => {
    // Load problem data based on ID
    const problem = PROBLEM_DATA[problemId];
    if (problem) {
      setCurrentProblem(problem);
    } else {
      // Fallback to Two Sum if problem not found
      setCurrentProblem(PROBLEM_DATA['two-sum']);
    }
  }, [problemId]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds]);

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    setSolveTime(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    );
  }, [seconds]);

  const goBack = () => {
    router.back();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };

  const startSolving = () => {
    // Navigate to coding interface or start solving mode
    console.log('Start solving:', currentProblem?.title);
  };

  const toggleLike = () => {
    console.log('Toggle like for:', currentProblem?.title);
  };

  const tabs = ['Description', 'Examples', 'Constraints', 'Hints'];

  if (!currentProblem) {
    return (
      <SafeAreaView style={problemDetailsStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={problemDetailsStyles.loadingContainer}>
          <Text style={problemDetailsStyles.loadingText}>Loading problem...</Text>
        </View>
        <BottomNavBar />
      </SafeAreaView>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <Text style={problemDetailsStyles.descriptionText}>
            {currentProblem.description}
          </Text>
        );
      case 'Examples':
        return (
          <View>
            {currentProblem.examples?.map((example, index) => (
              <View key={index} style={problemDetailsStyles.exampleContainer}>
                <Text style={problemDetailsStyles.exampleTitle}>Example {index + 1}:</Text>
                <Text style={problemDetailsStyles.exampleText}>Input: {example.input}</Text>
                <Text style={problemDetailsStyles.exampleText}>Output: {example.output}</Text>
                {example.explanation && (
                  <Text style={problemDetailsStyles.exampleText}>Explanation: {example.explanation}</Text>
                )}
              </View>
            ))}
          </View>
        );
      case 'Constraints':
        return (
          <View>
            {currentProblem.constraints?.map((constraint, index) => (
              <Text key={index} style={problemDetailsStyles.constraintText}>
                • {constraint}
              </Text>
            ))}
          </View>
        );
      case 'Hints':
        return (
          <View>
            {currentProblem.hints?.map((hint, index) => (
              <Text key={index} style={problemDetailsStyles.hintText}>
                {index + 1}. {hint}
              </Text>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={problemDetailsStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={problemDetailsStyles.header}>
        <TouchableOpacity onPress={goBack} style={problemDetailsStyles.backButton}>
          <Text style={problemDetailsStyles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={problemDetailsStyles.headerTitle}>Problem Details</Text>
        <TouchableOpacity style={problemDetailsStyles.menuButton}>
          <Text style={problemDetailsStyles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={problemDetailsStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 180}}
      >
        {/* Problem Title and Difficulty */}
        <View style={problemDetailsStyles.titleSection}>
          <View style={problemDetailsStyles.titleRow}>
            <Text style={problemDetailsStyles.problemTitle}>{currentProblem.title}</Text>
            <TouchableOpacity onPress={toggleLike} style={problemDetailsStyles.likeButton}>
              <Text style={problemDetailsStyles.likeIcon}>♡</Text>
            </TouchableOpacity>
          </View>
          
          <View style={problemDetailsStyles.metaRow}>
            <View style={[
              problemDetailsStyles.difficultyBadge,
              { backgroundColor: currentProblem.difficultyColor }
            ]}>
              <Text style={problemDetailsStyles.difficultyText}>{currentProblem.difficulty}</Text>
            </View>
            <Text style={problemDetailsStyles.platformText}>{currentProblem.platform}</Text>
          </View>
        </View>

        {/* Timer Section */}
        <View style={problemDetailsStyles.timerSection}>
          <View style={problemDetailsStyles.timerHeader}>
            <Text style={problemDetailsStyles.timerIcon}>⏱️</Text>
            <Text style={problemDetailsStyles.timerLabel}>Solve Time</Text>
          </View>
          <Text style={problemDetailsStyles.timerDisplay}>{solveTime}</Text>
          
          <View style={problemDetailsStyles.timerControls}>
            <TouchableOpacity 
              style={[problemDetailsStyles.timerButton, problemDetailsStyles.startButton]}
              onPress={startTimer}
            >
              <Text style={problemDetailsStyles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[problemDetailsStyles.timerButton, problemDetailsStyles.pauseButton]}
              onPress={pauseTimer}
            >
              <Text style={problemDetailsStyles.pauseButtonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[problemDetailsStyles.timerButton, problemDetailsStyles.resetButton]}
              onPress={resetTimer}
            >
              <Text style={problemDetailsStyles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Topics */}
        <View style={problemDetailsStyles.topicsSection}>
          {currentProblem.topics.map((topic, index) => (
            <View key={index} style={problemDetailsStyles.topicTag}>
              <Text style={problemDetailsStyles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>

        {/* Tab Navigation */}
        <View style={problemDetailsStyles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                problemDetailsStyles.tab,
                activeTab === tab && problemDetailsStyles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                problemDetailsStyles.tabText,
                activeTab === tab && problemDetailsStyles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={problemDetailsStyles.tabContent}>
          {renderTabContent()}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={problemDetailsStyles.bottomActions}>
        <TouchableOpacity 
          style={problemDetailsStyles.startSolvingButton}
          onPress={startSolving}
        >
          <Text style={problemDetailsStyles.startSolvingIcon}>▶</Text>
          <Text style={problemDetailsStyles.startSolvingText}>Start Solving</Text>
        </TouchableOpacity>
        
        <View style={problemDetailsStyles.actionButtons}>
          <TouchableOpacity style={problemDetailsStyles.actionButton}>
            <Text style={problemDetailsStyles.actionButtonIcon}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={problemDetailsStyles.actionButton}>
            <Text style={problemDetailsStyles.actionButtonIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
}