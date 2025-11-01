import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainTabScreenProps } from '../types/navigation';
import databaseService, { Post } from '../services/database';
import { useTheme } from '../context/ThemeContext';
import PostImage from '../components/PostImage';

const AddPostScreen = () => {
  const navigation = useNavigation<MainTabScreenProps<'AddPost'>['navigation']>();
  const { colors, isDarkMode } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permissions to upload pet pictures!'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera permissions to take pet pictures!'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setUploading(true);

    try {
      // Generate unique ID
      const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date();
      
      // Format hashtags
      const formattedHashtags = hashtags
        .split(' ')
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .join(' ');

      const newPost: Post = {
        id: postId,
        petName: 'My Pet', // Can be made dynamic later
        petImage: image,
        ownerName: '@user', // Can be made dynamic later
        caption: caption.trim(),
        hashtags: formattedHashtags,
        likes: 0,
        comments: 0,
        isLiked: false,
        createdAt: now.toISOString(),
        timestamp: getTimeAgo(now),
      };

      await databaseService.addPost(newPost);
      
      setUploading(false);
      Alert.alert('Success', 'Your pet picture has been posted!', [
        {
          text: 'OK',
          onPress: () => {
            setImage(null);
            setCaption('');
            setHashtags('');
            navigation.navigate('Feed');
          },
        },
      ]);
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'Failed to post. Please try again.');
      console.error('Post error:', error);
    }
  };

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Post</Text>
          <TouchableOpacity onPress={handlePost} disabled={uploading || !image}>
            <Text
              style={[
                styles.postButton,
                (!image || uploading) && styles.postButtonDisabled,
              ]}
            >
              {uploading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          {image ? (
            <View style={styles.imageSection}>
              <View style={styles.imageContainer}>
                <PostImage uri={image} style={styles.image} aspectRatio={1} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setImage(null)}
                >
                  <Ionicons name="close-circle" size={32} color={colors.primary} />
                </TouchableOpacity>
                {uploading && (
                  <View style={styles.uploadingOverlay}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.uploadingText}>Uploading...</Text>
                  </View>
                )}
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Caption</Text>
                <TextInput
                  style={styles.captionInput}
                  placeholder="Write a caption..."
                  placeholderTextColor={colors.textSecondary}
                  value={caption}
                  onChangeText={setCaption}
                  multiline
                  maxLength={500}
                />

                <Text style={styles.label}>Hashtags</Text>
                <TextInput
                  style={styles.hashtagInput}
                  placeholder="#pet #cute #dog (separate with spaces)"
                  placeholderTextColor={colors.textSecondary}
                  value={hashtags}
                  onChangeText={setHashtags}
                  autoCapitalize="none"
                />
                <Text style={styles.hint}>
                  Add hashtags to help others discover your post
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emoji}>📸</Text>
              <Text style={styles.emptyStateText}>Choose a photo of your pet</Text>
              <Text style={styles.emptyStateSubtext}>
                Share your pet's cute moments with the community
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
                  <Ionicons name="image-outline" size={32} color={colors.primary} />
                  <Text style={styles.optionButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                  <Ionicons name="camera-outline" size={32} color={colors.primary} />
                  <Text style={styles.optionButtonText}>Take a Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  postButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  postButtonDisabled: {
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  imageSection: {
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  optionButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionButtonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.inputBackground,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  formSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  captionInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  hashtagInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default AddPostScreen;
