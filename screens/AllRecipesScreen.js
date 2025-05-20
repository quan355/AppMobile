import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function AllRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipes, title } = route.params; // Nhận danh sách công thức và tiêu đề từ params

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    color: '#1f2937',
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