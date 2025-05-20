import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { recentRecipes, defaultRecipeImage, removeRecipe, addChangeListener } from '../recipesData.js';

// Dữ liệu tĩnh cho profile
const defaultProfile = {
  bio: 'Hello world, I love cooking so much!',
  avatar: require('../assets/images/default_user.png'),
  stats: {
    videos: 12,
    followers: '14',
    following: 120,
  },
};

export default function ProfilepageScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('My profile');
  const [userRecipes, setUserRecipes] = useState([]);

  const updateRecipes = () => {
    const filteredRecipes = recentRecipes.filter(
      (recipe) => recipe.author === `Bởi ${username}`
    );
    console.log('Cập nhật công thức của người dùng:', filteredRecipes);
    setUserRecipes(filteredRecipes);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { username } = JSON.parse(userData);
          if (username) {
            setUsername(username);
            updateRecipes();
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };
    fetchUserData();

    // Đăng ký listener cho thay đổi recentRecipes
    const unsubscribe = addChangeListener(updateRecipes);
    return () => unsubscribe();
  }, [username]);

  const handleDeleteRecipe = (recipeId, recipeTitle) => {
    Alert.alert(
      'Xóa công thức',
      `Bạn có chắc chắn muốn xóa công thức "${recipeTitle}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            try {
              removeRecipe(recipeId);
              updateRecipes();
              console.log('Công thức đã xóa, danh sách mới:', userRecipes);
            } catch (error) {
              console.error('Lỗi khi xóa công thức:', error);
              Alert.alert('Lỗi', 'Không thể xóa công thức. Vui lòng thử lại.');
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{username}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Thông tin cá nhân */}
        <View style={styles.profileSection}>
          <Image source={defaultProfile.avatar} style={styles.avatar} />
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.bio}>{defaultProfile.bio}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userRecipes.length}</Text>
              <Text style={styles.statLabel}>Công thức</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{defaultProfile.stats.videos}</Text>
              <Text style={styles.statLabel}>Ảnh</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{defaultProfile.stats.followers}</Text>
              <Text style={styles.statLabel}>Người theo dõi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{defaultProfile.stats.following}</Text>
              <Text style={styles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <TouchableOpacity style={styles.switchButton}>
              <Text style={styles.switchText}>Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.switchButtonActive}>
              <Text style={styles.switchTextActive}>Công thức</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danh sách công thức */}
        <View style={styles.recipesSection}>
          {userRecipes.length === 0 ? (
            <Text style={styles.noRecipes}>Chưa có công thức nào.</Text>
          ) : (
            userRecipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                <Image source={recipe.image || defaultRecipeImage} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeRating}>⭐ {recipe.rating}</Text>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text style={styles.recipeDetails}>
                    {recipe.ingredients.length} Nguyên liệu | {recipe.time}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => handleDeleteRecipe(recipe.id, recipe.title)}
                >
                  <Icon name="more-horiz" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
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
    marginTop: 50,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoutButton: {
    backgroundColor: '#6b7280',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  bioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    width: '48%',
    alignItems: 'center',
  },
  switchButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ff4444',
    width: '48%',
    alignItems: 'center',
  },
  switchText: {
    color: '#6b7280',
    fontSize: 14,
  },
  switchTextActive: {
    color: '#fff',
    fontSize: 14,
  },
  recipesSection: {
    marginTop: 16,
  },
  noRecipes: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeRating: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  recipeDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreButton: {
    padding: 8,
  },
});