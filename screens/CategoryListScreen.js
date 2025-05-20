import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { trendingRecipes } from '../recipesData';

export default function CategoryListScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const storedRecipes = await AsyncStorage.getItem('recipes');
        if (storedRecipes !== null) {
          setRecipes(JSON.parse(storedRecipes)); // Có dữ liệu trong AsyncStorage
        } else {
          setRecipes(trendingRecipes); // Chưa có dữ liệu, dùng món gốc
        }
      } catch (error) {
        console.log('Lỗi load recipes:', error);
        setRecipes(trendingRecipes); // Nếu lỗi thì cũng dùng món gốc
      }
    }
    loadRecipes();
  }, []);

  // Lấy danh sách danh mục duy nhất từ recipes (bao gồm món gốc và món thêm)
  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
        <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
      <Text style={styles.title}>Danh mục món ăn</Text>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => `${item}_${index}`} // Thêm index để đảm bảo key duy nhất
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeListByCategory', { category: item })}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginTop: 50, 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
    },
  title:   { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 40 
    },
  backButton: {
    padding: 8,
    marginRight: 20,
    marginBottom: 20,
  },
  card: {
    padding: 16,
    backgroundColor: '#e3e3e3',
    marginBottom: 12,
    borderRadius: 10,
  },
  text: { 
    fontSize: 18 
    },
});