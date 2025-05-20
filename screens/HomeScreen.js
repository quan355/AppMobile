import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { trendingRecipes, recentRecipes, categoryNames, popularCategories } from '../recipesData';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const allRecipes = [...trendingRecipes, ...recentRecipes];
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecipes);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Tìm công thức nấu ăn ngon nhất</Text>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm công thức"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {searchResults.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentCard}
                  onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                >
                  <Image source={item.image} style={styles.recentImage} />
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentTitle}>{item.title}</Text>
                    <Text style={styles.recentCategory}>{item.category}</Text>
                    <Text style={styles.recentAuthor}>{item.author}</Text>
                    <View style={styles.recentFooter}>
                      <Text style={styles.recentRating}>⭐ {item.rating}</Text>
                      <Text style={styles.recentTime}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <>
            {/* Trending Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Đang thịnh hành 🔥</Text>
                <View style={styles.sectionHeaderActions}>
                  <TouchableOpacity onPress={() => navigation.navigate('DiscoverMain')}>
                    <Text style={styles.seeAll}>Xem tất cả →</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                data={trendingRecipes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.trendingCard}
                    onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                  >
                    <Image source={item.image} style={styles.trendingImage} />
                    <View style={styles.trendingInfo}>
                      <Text style={styles.trendingTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.trendingAuthor}>{item.author}</Text>
                      <View style={styles.trendingFooter}>
                        <Text style={styles.trendingRating}>⭐ {item.rating}</Text>
                        <Text style={styles.trendingTime}>{item.time}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* Popular Category Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Danh mục món ăn </Text>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryListScreen')}>
                  <Text style={styles.seeAll}>Xem tất cả →</Text>
              </TouchableOpacity>
              </View>
              {/* Part 1: Text Categories */}

              <FlatList
                data={categoryNames}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.textCategoryCard}>
                    <Text style={styles.textCategory}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={styles.textCategoryList}
              />
              {/* Part 2: Categories with Image, Name, Time */}
              <FlatList
                data={popularCategories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.categoryCard}>
                    <Image source={item.image} style={styles.categoryImage} />
                    <Text style={styles.categoryName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.categoryTime}>{item.time}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* Recent Recipes Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Công thức gần đây</Text>
                <View style={styles.sectionHeaderActions}>
                  <TouchableOpacity onPress={() => navigation.navigate('DiscoverMain')}>
                    <Text style={styles.seeAll}>Xem tất cả →</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                data={recentRecipes}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.recentCard}
                    onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                  >
                    <Image source={item.image} style={styles.recentImage} />
                    <View style={styles.recentInfo}>
                      <Text style={styles.recentTitle}>{item.title}</Text>
                      <Text style={styles.recentAuthor}>{item.author}</Text>
                      <View style={styles.recentFooter}>
                        <Text style={styles.recentRating}>⭐ {item.rating}</Text>
                        <Text style={styles.recentTime}>{item.time}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
    marginTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center ',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#ff4444',
    fontSize: 16,
    marginRight: 10,
  },
  trendingCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  trendingInfo: {
    padding: 8,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendingAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  trendingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingRating: {
    fontSize: 14,
    color: '#4b5563',
  },
  trendingTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  textCategoryList: {
    marginBottom: 12,
  },
  textCategoryCard: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 8,
  },
  textCategory: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '500',
  },
  categoryCard: {
    width: 120,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 4,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryTime: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 8,
  },
  recentInfo: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recentAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  recentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentRating: {
    fontSize: 14,
    color: '#4b5563',
  },
  recentTime: {
    fontSize: 12,
    color: '#6b7280',
  },
});