import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { addRecipe, defaultRecipeImage } from '../recipesData.js';
import { launchImageLibrary } from 'react-native-image-picker';
import { addNotification } from './NotificationsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateRecipeScreen() {
  const navigation = useNavigation();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [serves, setServes] = useState('01');
  const [cookTime, setCookTime] = useState('45'); // Chỉ lưu giá trị số
  const [ingredients, setIngredients] = useState([
    { name: 'Thịt bò', quantity: '250g' },
    { name: 'Gạo', quantity: '150g' },
  ]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '' });
  const [instructions, setInstructions] = useState(['']);
  const [newInstruction, setNewInstruction] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Hàm để hiển thị cookTime kèm đơn vị "phút"
  const displayCookTime = () => {
    return cookTime ? `${cookTime} phút` : '0 phút';
  };

  // Hàm xử lý khi người dùng nhập cookTime
  const handleCookTimeChange = (text) => {
    // Chỉ cho phép nhập số
    const numericText = text.replace(/[^0-9]/g, '');
    setCookTime(numericText);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1024,
      maxHeight: 1024,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Người dùng hủy chọn ảnh');
      } else if (response.errorCode) {
        console.log('Lỗi ImagePicker: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage({ uri: response.assets[0].uri });
      }
    });
  };

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, { ...newIngredient }]);
      setNewIngredient({ name: '', quantity: '' });
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction('');
    }
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const saveRecipe = async () => {
    if (!recipeTitle || ingredients.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề và ít nhất một nguyên liệu.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('userData');
      const username = userData ? JSON.parse(userData).username : 'Người dùng';
      console.log('Username từ AsyncStorage:', username);

      const newRecipe = {
        title: recipeTitle,
        cookTime: displayCookTime(), // Lưu giá trị kèm đơn vị "phút"
        ingredients,
        instructions: instructions.filter((instr) => instr.trim()),
        author: `Bởi ${username}`,
        image: selectedImage,
      };

      console.log('Bắt đầu lưu công thức:', newRecipe);
      if (typeof addRecipe !== 'function') {
        throw new Error('addRecipe không phải là hàm');
      }
      addRecipe(newRecipe);
      console.log('Công thức đã lưu thành công');

      const notification = {
        id: `${Date.now()}`,
        message: `Bạn đã tạo công thức "${recipeTitle}" thành công!`,
        userImage: selectedImage ? selectedImage.uri : defaultRecipeImage,
        time: 'Vừa xong',
      };
      console.log('Tạo thông báo:', notification);

      addNotification(notification, (newNotifications) => {
        console.log('Danh sách thông báo mới:', newNotifications);
        navigation.navigate('Notifications', {
          notifications: newNotifications,
          newRecipeAdded: true,
        });
      });
    } catch (error) {
      console.error('Lỗi khi lưu công thức:', error);
      Alert.alert('Lỗi', 'Không thể lưu công thức. Vui lòng thử lại.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo công thức</Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={selectedImage || defaultRecipeImage}
            style={styles.image}
            resizeMode="cover"
            onError={(e) => console.log('Lỗi tải ảnh trong CreateRecipe:', e.nativeEvent.error)}
          />
          <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
            <Icon name="photo" size={20} color="#ff4444" />
            <Text style={styles.selectImageText}>Chọn ảnh</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <TextInput
            style={styles.input}
            value={recipeTitle}
            onChangeText={setRecipeTitle}
            placeholder="Nhập tiêu đề công thức"
            returnKeyType="done"
          />
          <View style={styles.counterRow}>
            <View style={styles.counterItem}>
              <Icon name="person" size={20} color="#ff4444" />
              <Text>Phần ăn</Text>
              <TextInput
                style={styles.counterInput}
                value={serves}
                onChangeText={setServes}
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text>→</Text>
            </View>
            <View style={styles.counterItem}>
              <Icon name="timer" size={20} color="#ff4444" />
              <Text>Thời gian nấu</Text>
              <TextInput
                style={styles.counterInput}
                value={displayCookTime()} // Hiển thị giá trị kèm đơn vị
                onChangeText={handleCookTimeChange} // Chỉ cho phép nhập số
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text>→</Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.ingredientsSection}>
            <Text style={styles.ingredientsTitle}>Nguyên liệu</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <TextInput
                  style={styles.ingredientInput}
                  value={ingredient.name}
                  onChangeText={(text) => {
                    const updated = [...ingredients];
                    updated[index].name = text;
                    setIngredients(updated);
                  }}
                  placeholder="Tên nguyên liệu"
                  returnKeyType="done"
                />
                <TextInput
                  style={styles.quantityInput}
                  value={ingredient.quantity}
                  onChangeText={(text) => {
                    const updated = [...ingredients];
                    updated[index].quantity = text;
                    setIngredients(updated);
                  }}
                  placeholder="Số lượng (g)"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => removeIngredient(index)}>
                  <Icon name="remove-circle" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.ingredientItem}>
              <TextInput
                style={styles.ingredientInput}
                value={newIngredient.name}
                onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
                placeholder="Tên nguyên liệu"
                returnKeyType="done"
                onSubmitEditing={addIngredient}
              />
              <TextInput
                style={styles.quantityInput}
                value={newIngredient.quantity}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, '');
                  setNewIngredient({
                    ...newIngredient,
                    quantity: cleanedText ? `${cleanedText}g` : '',
                  });
                }}
                placeholder="Số lượng (g)"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={addIngredient}
              />
              <TouchableOpacity onPress={addIngredient}>
                <Icon name="add-circle" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Instructions Section */}
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>Hướng dẫn</Text>
            {instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <TextInput
                  style={styles.instructionInput}
                  value={instruction}
                  onChangeText={(text) => {
                    const updated = [...instructions];
                    updated[index] = text;
                    setInstructions(updated);
                  }}
                  placeholder={`Bước ${index + 1}`}
                  multiline
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => removeInstruction(index)}>
                  <Icon name="remove-circle" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.instructionItem}>
              <TextInput
                style={styles.instructionInput}
                value={newInstruction}
                onChangeText={setNewInstruction}
                placeholder="Thêm bước hướng dẫn"
                multiline
                returnKeyType="done"
                onSubmitEditing={addInstruction}
              />
              <TouchableOpacity onPress={addInstruction}>
                <Icon name="add-circle" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
            <Text style={styles.saveButtonText}>Lưu công thức</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  imageSection: {
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    position: 'absolute',
    right: 16,
    top: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  selectImageText: {
    color: '#ff4444',
    marginLeft: 4,
    fontSize: 14,
  },
  infoSection: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  counterRow: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counterItem: {
    flexDirection: 'row',
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  counterInput: {
    flex: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  ingredientsSection: {
    marginTop: 16,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  ingredientInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  quantityInput: {
    width: 80,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  instructionsSection: {
    marginTop: 16,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  instructionInput: {
    flex: 1,
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});