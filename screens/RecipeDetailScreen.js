import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
<View style={styles.header}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Icon name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>

  <View style={{ flex: 1 }}>
    <Text style={styles.title}>{recipe.title}</Text>

    {recipe.category && (
      <Text style={styles.category}>{recipe.category}</Text>
    )}
  </View>
</View>


        {/* Image */}
        <Image source={recipe.image} style={styles.recipeImage} />

        {/* Recipe Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.author}>{recipe.author}</Text>
          <View style={styles.footer}>
            <Text style={styles.rating}>⭐ {recipe.rating}</Text>
            <Text style={styles.time}>{recipe.time}</Text>
          </View>
        </View>

        {/* Ingredients */}
        
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Nguyên liệu</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.detailText}>
              • {ingredient}
            </Text>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Hướng dẫn</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.detailText}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
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
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  category: {
  fontSize: 16,
  color: '#6b7280',  // màu xám nhẹ
  fontStyle: 'italic',
  marginTop: 4,
},

  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 16,
    color: '#4b5563',
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
});