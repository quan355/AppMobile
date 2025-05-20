import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { trendingRecipes, recentRecipes, categoryNames, popularCategories } from '../recipesData';

// Get screen width for dynamic sizing
const { width } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('Ảnh');
  const [savedRecipes, setSavedRecipes] = useState([...trendingRecipes, ...recentRecipes]);
  const navigation = useNavigation();

  const refreshData = () => {
    console.log('Làm mới DiscoverScreen khi nhấn tab');
    const updatedSavedRecipes = [...trendingRecipes, ...recentRecipes];
    setSavedRecipes(updatedSavedRecipes);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (navigation.isFocused()) {
        e.preventDefault();
        refreshData();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Làm mới DiscoverScreen khi focus');
      const updatedSavedRecipes = [...trendingRecipes, ...recentRecipes];
      setSavedRecipes(updatedSavedRecipes);
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Công thức đã lưu</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, { width: width / 2 }, activeTab === 'Ảnh' && styles.activeTab]}
            onPress={() => setActiveTab('Ảnh')}
          >
            <Text style={[styles.tabText, activeTab === 'Ảnh' && styles.activeTabText]}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, { width: width / 2 }, activeTab === 'Recipe' && styles.activeTab]}
            onPress={() => setActiveTab('Recipe')}
          >
            <Text style={[styles.tabText, activeTab === 'Recipe' && styles.activeTabText]}>Công thức</Text>
          </TouchableOpacity>
        </View>
        {savedRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() => {
              if (activeTab === 'Recipe') {
                navigation.navigate('RecipeDetail', { recipe });
              }
            }}
          >
            <Image source={recipe.image} style={styles.recipeImage} />
            {activeTab === 'Ảnh' && (
              <View style={styles.playButton}>
                <Icon name="play-circle-outline" size={40} color="#fff" />
              </View>
            )}
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle} numberOfLines={1}>{recipe.title}</Text>
              <View style={styles.authorContainer}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/24' }}
                  style={styles.authorImage}
                />
                <Text style={styles.authorText}>{recipe.author}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.rating}>⭐ {recipe.rating}</Text>
                <Text style={styles.timeText}>{recipe.time}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Icon name="bookmark" size={20} color="#ff4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginTop: 40,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#e5e7eb',
  },
  activeTab: {
    backgroundColor: '#ff4444',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  recipeInfo: {
    flex: 1,
    paddingLeft: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 4,
  },
  authorText: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
    color: '#4b5563',
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
});