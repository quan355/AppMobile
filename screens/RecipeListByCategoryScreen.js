import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { trendingRecipes } from '../recipesData';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            >
        <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
      <Text style={styles.title}>Món ăn trong danh mục: {category}</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id || `${item.title}_${Math.random()}`}
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
  container: { 
    marginTop: 50,
    flex: 1, 
    padding: 20 },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 40 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  backButton: {
    padding: 8,
    marginRight: 20,
    marginBottom: 20,
  },
  image: {
    width: 80, 
    height: 80 
},
  info: { 
    flex: 1, 
    padding: 10 },
  name: { 
    fontSize: 16, 
    fontWeight: 'bold' },
  author: { 
    fontSize: 14, 
    color: '#666' },
});