import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { defaultRecipeImage } from '../recipesData.js'; // Nhập defaultRecipeImage

const defaultUserImage = require('../assets/images/default_notification.png');

const initialNotifications = [
  {
    id: '1',
    userImage: defaultUserImage,
    message: 'Roberta Anny đã thích công thức của bạn.',
    time: '2 phút trước',
  },
  {
    id: '2',
    userImage: defaultUserImage,
    message: 'Niki Samantha đã bình luận về công thức của bạn.',
    time: '15 phút trước',
  },
  {
    id: '3',
    userImage: defaultUserImage,
    message: 'James Wolden đã theo dõi bạn.',
    time: '1 giờ trước',
  },
  {
    id: '4',
    userImage: defaultUserImage,
    message: 'Gợi ý công thức mới: Hãy thử món này!',
    time: '2 giờ trước',
  },
];

export const addNotification = (notification, setNotifications) => {
  console.log('Thêm thông báo:', notification);
  setNotifications((prev) => {
    const newNotification = {
      id: notification.id || `${Date.now()}`,
      userImage: notification.userImage || defaultRecipeImage, // Dùng defaultRecipeImage
      message: notification.message,
      time: notification.time || 'Vừa xong',
    };
    const updated = [newNotification, ...prev];
    console.log('Danh sách thông báo mới:', updated);
    return updated;
  });
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.notifications) {
      console.log('Nhận danh sách thông báo từ điều hướng:', route.params.notifications);
      setNotifications(route.params.notifications);
    } else if (route.params?.newNotification) {
      console.log('Nhận thông báo mới từ điều hướng:', route.params.newNotification);
      setNotifications((prev) => {
        const updated = [route.params.newNotification, ...prev];
        console.log('Cập nhật thông báo từ điều hướng:', updated);
        return updated;
      });
    }
  }, [route.params?.notifications, route.params?.newNotification]);

  // Chuẩn hóa nguồn ảnh
  const getImageSource = (image) => {
    if (typeof image === 'string') {
      return { uri: image }; // URI từ selectedImage
    }
    return image || defaultRecipeImage; // require() hoặc fallback
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Thông báo</Text>
        {notifications.length === 0 ? (
          <Text style={styles.noNotifications}>Chưa có thông báo nào.</Text>
        ) : (
          notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <Image
                source={getImageSource(notification.userImage)}
                style={styles.userImage}
                onError={(e) => console.log('Lỗi tải ảnh thông báo:', e.nativeEvent.error)}
              />
              <View style={styles.notificationContent}>
                <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </View>
          ))
        )}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 30,
  },
  noNotifications: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6b7280',
  },
});