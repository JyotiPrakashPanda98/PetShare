import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ProfileImageProps {
  uri?: string;
  name?: string;
  size?: number;
  style?: any;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  uri, 
  name = 'U', 
  size = 120, 
  style 
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(!!uri);
  const [error, setError] = useState(false);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const styles = getStyles(colors, size);
  const initial = name[0]?.toUpperCase() || 'U';

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      {uri && !error ? (
        <>
          <Image
            source={{ uri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            placeholderContentFit="cover"
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )}
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{initial}</Text>
        </View>
      )}
    </View>
  );
};

const getStyles = (colors: any, size: number) => StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.primary,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: size * 0.4,
    fontWeight: 'bold',
  },
});

export default ProfileImage;

