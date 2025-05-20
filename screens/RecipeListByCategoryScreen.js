// screens/RecipeListByCategoryScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { trendingRecipes } from '../recipesData';
import { useNavigation } from '@react-navigation/native';

export default function RecipeListByCategoryScreen({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();

  const filtered = trendingRecipes.filter(
    (r) =>
      r.category &&
      r.category.trim().toLowerCase() === category.trim().toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Món ăn trong danh mục: {category}</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, color: '#666' },
});
