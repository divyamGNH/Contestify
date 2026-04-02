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
  Image,
  Linking,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

class Category {
  constructor(title) {
    this.title = title;
  }

  getFormattedTitle() {
    return this.title;
  }
}

class TechCategory extends Category {
  getFormattedTitle() {
    return this.title;
  }
}

class StartupCategory extends Category {
  getFormattedTitle() {
    return this.title;
  }
}

class BusinessCategory extends Category {
  getFormattedTitle() {
    return this.title;
  }
}

class NewsArticle {
  constructor({ id, title, date, readTime, tag, image, url }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.readTime = readTime;
    this.tag = tag;
    this.image = image;
    this.url = url;
  }

  getReadTime() {
    return `⏱ ${this.readTime}`;
  }

  getDate() {
    return `📅 ${this.date}`;
  }
}

class NewsSection {
  constructor(category, rawArticles) {
    this.category = category;
    this.articles = rawArticles.map(a => new NewsArticle(a));
  }
}

const NEWS_DATA = {
  techNews: [
    {
      id: '1',
      title: 'Neuralink Successfully Implants First Brain Chip in Human',
      date: 'Jan 2024',
      readTime: '5 mins',
      tag: '#neurotechnology',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      url: 'https://techstartups.com/2024/12/30/top-tech-news-stories-of-2024/',
    },
    {
      id: '2',
      title: 'AI Dominates 2024: From ChatGPT to AI Agents Taking Over',
      date: 'Dec 2024',
      readTime: '7 mins',
      tag: '#artificial-intelligence',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      url: 'https://techstartups.com/2024/12/30/top-tech-news-stories-of-2024/',
    },
    {
      id: '3',
      title: 'Apple Nears Historic $4 Trillion Valuation Milestone',
      date: 'Dec 2024',
      readTime: '4 mins',
      tag: '#tech-giants',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      url: 'https://techstartups.com/2024/12/30/top-tech-news-stories-of-2024/',
    },
  ],
  startupStories: [
    {
      id: '4',
      title: 'Reddit Stock Soars 332% After IPO - Biggest Tech Winner 2024',
      date: 'Dec 2024',
      readTime: '6 mins',
      tag: '#ipo-success',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      url: 'https://news.crunchbase.com/public/ipo/2024-winners-losers-tech-ai-robotics-reddit-astera/',
    },
    {
      id: '5',
      title: 'Zepto Scales to $1B in Sales in Just 29 Months',
      date: 'Dec 2024',
      readTime: '5 mins',
      tag: '#hyper-growth',
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80',
      url: 'https://techcrunch.com/2024/12/13/the-51-most-disruptive-startups-of-2024/',
    },
    {
      id: '6',
      title: 'Saronic Raises $175M Series B for Autonomous Defense Ships',
      date: 'Nov 2024',
      readTime: '4 mins',
      tag: '#defense-tech',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      url: 'https://techcrunch.com/2024/12/13/the-51-most-disruptive-startups-of-2024/',
    },
  ],
  business: [
    {
      id: '7',
      title: 'Marketing Strategies That Actually Work in 2024',
      date: 'Nov 2024',
      readTime: '8 mins',
      tag: '#marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      url: 'https://www.inc.com/marli-guzzetta/miss-these-marketing-tips-at-your-peril.html',
    },
    {
      id: '8',
      title: 'AI and Personalization Revolutionize Digital Marketing',
      date: 'Dec 2024',
      readTime: '7 mins',
      tag: '#ai-marketing',
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
      url: 'https://asana.com/resources/marketing-trends',
    },
    {
      id: '9',
      title: 'Social Commerce Takes Center Stage in 2024',
      date: 'Oct 2024',
      readTime: '5 mins',
      tag: '#social-commerce',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      url: 'https://www.emarketer.com/content/2024-trend-watch-social-media-bigger-seat-marketing-strategy-table',
    },
  ],
};

const SECTIONS = [
  new NewsSection(new TechCategory(), NEWS_DATA.techNews),
  new NewsSection(new StartupCategory(), NEWS_DATA.startupStories),
  new NewsSection(new BusinessCategory(), NEWS_DATA.business),
];

const NewsCard = ({ item }) => {
  const handlePress = () => {
    Linking.openURL(item.url).catch(err =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {item.title}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>{item.getReadTime()}</Text>
            <Text style={styles.metaText}>{item.getDate()}</Text>
          </View>
          <Text style={styles.tag}>{item.tag}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Section = ({ section }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{section.category.getFormattedTitle()}</Text>

    <FlatList
      data={section.articles}
      renderItem={({ item }) => <NewsCard item={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Find something</Text>
        <Text style={styles.title}>FASCINATING TODAY</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section, idx) => (
          <Section key={idx} section={section} />
        ))}
      </ScrollView>

      <BottomNav/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe3',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    color: '#7b6a53',
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: '#17324d',
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
    color: '#17324d',
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
    backgroundColor: '#fffdf8',
    borderWidth: 1,
    borderColor: '#eadfca',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    backgroundColor: '#f6efe1',
  },
  cardContent: {
    padding: 20,
    height: '30%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#17324d',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
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
    color: '#7b6a53',
    fontSize: 12,
  },
  tag: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '600',
  },
});
