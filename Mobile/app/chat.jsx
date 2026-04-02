import axios from "axios";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";
import { chatStyles } from "../styles/chatStyles";

const { IP } = Constants.expoConfig.extra;
const NAVBAR_HEIGHT = 78;
const COMPOSER_HEIGHT = 78;

export default function Chat() {
  const listRef = useRef(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const introVisible = useMemo(() => messages.length === 0, [messages.length]);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates?.height || 0);
    });

    const onHide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);

  const isKeyboardOpen = keyboardHeight > 0;
  const composerBottom = isKeyboardOpen ? keyboardHeight : NAVBAR_HEIGHT;
  const listBottomPadding = isKeyboardOpen
    ? COMPOSER_HEIGHT + keyboardHeight + 24
    : COMPOSER_HEIGHT + NAVBAR_HEIGHT + 24;

  const scrollToEnd = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 60);
  };

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || isLoading) return;

    const userMessage = {
      id: `${Date.now()}-u`,
      role: "user",
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    scrollToEnd();

    try {
      const token = await SecureStore.getItemAsync("authToken");

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await axios.post(
        `http://${IP}:3000/api/chat/leetcode-suggest`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const payload = response?.data?.data;
      const assistantMessage = {
        id: `${Date.now()}-a`,
        role: "assistant",
        text:
          payload?.assistantMessage ||
          "Here are questions you can practice next.",
        recommendations: Array.isArray(payload?.recommendations)
          ? payload.recommendations
          : [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      scrollToEnd();
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message || "Could not fetch recommendations.";

      const assistantMessage = {
        id: `${Date.now()}-e`,
        role: "assistant",
        text: backendMessage,
        recommendations: [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      scrollToEnd();
    } finally {
      setIsLoading(false);
    }
  };

  const openQuestionLink = async (url) => {
    if (!url) return;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  const renderRecommendation = (rec, index, messageId) => {
    return (
      <View key={`${messageId}-rec-${index}`} style={chatStyles.recCard}>
        <View style={chatStyles.recHeader}>
          <Text style={chatStyles.recTitle}>{rec.title}</Text>
          <Text style={chatStyles.recDiff}>{rec.difficulty}</Text>
        </View>

        <Text style={chatStyles.recReason}>{rec.reason}</Text>

        {Array.isArray(rec.topics) && rec.topics.length > 0 ? (
          <View style={chatStyles.topicsRow}>
            {rec.topics.map((topic, topicIndex) => (
              <View key={`${messageId}-${index}-${topicIndex}`} style={chatStyles.topicPill}>
                <Text style={chatStyles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          style={chatStyles.recAction}
          onPress={() => openQuestionLink(rec.url)}
        >
          <Text style={chatStyles.recActionText}>Open Problem</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          chatStyles.messageRow,
          isUser ? chatStyles.userRow : chatStyles.assistantRow,
        ]}
      >
        <View
          style={[
            chatStyles.bubble,
            isUser ? chatStyles.userBubble : chatStyles.assistantBubble,
          ]}
        >
          <Text
            style={[
              chatStyles.messageText,
              isUser ? chatStyles.userText : chatStyles.assistantText,
            ]}
          >
            {item.text}
          </Text>
        </View>

        {!isUser && Array.isArray(item.recommendations)
          ? item.recommendations.map((rec, index) =>
              renderRecommendation(rec, index, item.id)
            )
          : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={chatStyles.container}>
        <View style={chatStyles.header}>
          <Text style={chatStyles.screenTitle}>Practice Assistant</Text>
          <View style={chatStyles.headerBlock}>
            <Text style={chatStyles.headerTitle}>LeetCode Chat</Text>
            <Text style={chatStyles.headerSubtitle}>
              Describe your target and get focused problem recommendations.
            </Text>
          </View>
        </View>

        {introVisible ? (
          <View style={chatStyles.emptyState}>
            <Text style={chatStyles.emptyTitle}>Try prompts like</Text>
            <Text style={chatStyles.emptyText}>
              I am strong in arrays but weak in dynamic programming and have 45 minutes daily.
            </Text>
          </View>
        ) : null}

        <FlatList
          ref={listRef}
          style={chatStyles.chatList}
          contentContainerStyle={[chatStyles.chatContent, { paddingBottom: listBottomPadding }]}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={scrollToEnd}
        />

        {isLoading ? (
          <View style={chatStyles.loadingRow}>
            <View style={chatStyles.loadingBubble}>
              <Text style={chatStyles.loadingText}>Generating recommendations...</Text>
            </View>
          </View>
        ) : null}

        <View style={[chatStyles.composerWrap, { bottom: composerBottom }]}> 
          <View style={chatStyles.composerInner}>
            <TextInput
              style={chatStyles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Describe level, topics, and target"
              placeholderTextColor="#8b7355"
              multiline
            />
            <TouchableOpacity
              style={[chatStyles.sendButton, (!input.trim() || isLoading) && chatStyles.sendDisabled]}
              onPress={handleSend}
              disabled={!input.trim() || isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={chatStyles.sendText}>Send</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {!isKeyboardOpen ? <BottomNav /> : null}
    </SafeAreaView>
  );
}
