import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      <Text style={styles.title}>Danh mục món ăn</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeListByCategoryScreen', { category: item })}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 16,
    backgroundColor: '#e3e3e3',
    marginBottom: 12,
    borderRadius: 10,
  },
  text: { fontSize: 18 },
});
