// App.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

// Mock Data
const NEWS_DATA = {
  techNews: [
    {
      id: '1',
      title: 'How a solo dev quickly built and sold his SaaS app for $20k',
      date: 'Nov 14',
      readTime: '5 mins',
      tag: '#software',
    },
    {
      id: '2',
      title: 'Building a profitable startup in 90 days with AI',
      date: 'Nov 13',
      readTime: '7 mins',
      tag: '#startup',
    },
    {
      id: '3',
      title: 'The future of remote work and digital nomads',
      date: 'Nov 12',
      readTime: '6 mins',
      tag: '#remote',
    },
  ],
  startupStories: [
    {
      id: '4',
      title: 'From zero to $1M ARR: A founder story',
      date: 'Nov 11',
      readTime: '8 mins',
      tag: '#growth',
    },
    {
      id: '5',
      title: 'How I validated my idea in 2 weeks',
      date: 'Nov 10',
      readTime: '4 mins',
      tag: '#validation',
    },
  ],
  business: [
    {
      id: '6',
      title: 'Marketing strategies that actually work in 2024',
      date: 'Nov 9',
      readTime: '6 mins',
      tag: '#marketing',
    },
  ],
};

const SECTIONS = [
  { id: 'tech', title: 'Tech News', data: NEWS_DATA.techNews },
  { id: 'startup', title: 'Startup Stories', data: NEWS_DATA.startupStories },
  { id: 'business', title: 'Business', data: NEWS_DATA.business },
];

// News Card Component
const NewsCard = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <View style={styles.imagePlaceholder}>
      <Text style={styles.placeholderText}>📷</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={3}>
        {item.title}
      </Text>
      <View style={styles.cardFooter}>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText}>⏱ {item.readTime}</Text>
          <Text style={styles.metaText}>📅 {item.date}</Text>
        </View>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Section Component
const Section = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={data}
      renderItem={({ item }) => <NewsCard item={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  </View>
);

// Main App
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Find something</Text>
        <Text style={styles.title}>FASCINATING TODAY</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section) => (
          <Section key={section.id} title={section.title} data={section.data} />
        ))}
      </ScrollView>

      <BottomNav/>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    color: '#8A8A8A',
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: '#F4C542',
    fontSize: 26,
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.8,
    height: 420,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  imagePlaceholder: {
    width: '100%',
    height: '70%',
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
  },
  cardContent: {
    padding: 20,
    height: '30%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 15,
  },
  metaText: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  tag: {
    color: '#F4C542',
    fontSize: 12,
    fontWeight: '600',
  },
});
