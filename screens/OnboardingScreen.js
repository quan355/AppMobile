import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Chào mừng đến với Food Recipe App!',
      description: 'Khám phá hàng ngàn công thức món ăn ngon từ khắp nơi.',
      image: require('../assets/images/background.png'), // Ảnh burger ban đầu
    },
    {
      title: 'Tìm kiếm dễ dàng',
      description: 'Tìm công thức theo danh mục hoặc nguyên liệu bạn có.',
      image: require('../assets/images/background.png'), // Ảnh burger mới 1
    },
    {
      title: 'Bắt đầu nấu ăn!',
      description: 'Lưu công thức yêu thích và chia sẻ với bạn bè.',
      image: require('../assets/images/background.png'), // Ảnh burger mới 2
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('SignIn');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <ImageBackground
      source={slides[currentSlide].image}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.onboardingTitle}>{slides[currentSlide].title}</Text>
        <Text style={styles.onboardingDescription}>{slides[currentSlide].description}</Text>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, currentSlide === 0 && styles.disabledButton]}
            onPress={prevSlide}
            disabled={currentSlide === 0}
          >
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={nextSlide}>
            <Text style={styles.buttonText}>
              {currentSlide === slides.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    justifyContent: 'center',
  },
  onboardingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
  },
  onboardingDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: '#d1d5db',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});