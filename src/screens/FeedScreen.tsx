import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import databaseService, { Post } from '../services/database';
import CommentSection from '../components/CommentSection';
import PostImage from '../components/PostImage';
import ProfileImage from '../components/ProfileImage';

const FeedScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const loadPosts = async () => {
    try {
      const fetchedPosts = await databaseService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleLike = async (id: string, currentLiked: boolean) => {
    try {
      const newLikes = await databaseService.toggleLike(id, !currentLiked);
      setPosts(
        posts.map((post) =>
          post.id === id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: newLikes,
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  const renderPost = ({ item }: { item: Post }) => {
    const styles = getStyles(colors);
    
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <ProfileImage 
              uri={item.petImage} 
              name={item.petName} 
              size={40}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.petName}>{item.petName}</Text>
              <Text style={styles.ownerName}>{item.ownerName}</Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <PostImage uri={item.petImage} style={styles.postImage} aspectRatio={1} />

        <View style={styles.postActions}>
          <TouchableOpacity
            onPress={() => handleLike(item.id, item.isLiked)}
            style={styles.actionButton}
          >
            <Ionicons
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={28}
              color={item.isLiked ? colors.primary : colors.text}
            />
            <Text
              style={[
                styles.actionText,
                item.isLiked && { color: colors.primary },
              ]}
            >
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleComment(item.id)}
          >
            <Ionicons name="chatbubble-outline" size={26} color={colors.text} />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={26} color={colors.text} />
          </TouchableOpacity>
        </View>

        {item.caption && (
          <View style={styles.captionSection}>
            <Text style={styles.captionText}>
              <Text style={styles.captionUser}>{item.ownerName} </Text>
              {item.caption}
            </Text>
          </View>
        )}

        {item.hashtags && (
          <View style={styles.hashtagSection}>
            <Text style={styles.hashtagText}>{item.hashtags}</Text>
          </View>
        )}
      </View>
    );
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PetShare</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🐾</Text>
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>
              Start sharing your pet's moments!
            </Text>
          </View>
        }
      />

      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <CommentSection
            postId={selectedPostId || ''}
            visible={commentModalVisible}
            onClose={() => {
              setCommentModalVisible(false);
              setSelectedPostId(null);
              loadPosts(); // Refresh to update comment counts
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: colors.surface,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postImage: {
    width: '100%',
    minHeight: 300,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  captionSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  captionText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  captionUser: {
    fontWeight: 'bold',
    color: colors.text,
  },
  hashtagSection: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  hashtagText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
});

export default FeedScreen;
