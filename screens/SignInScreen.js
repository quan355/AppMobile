import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
        if (email === storedEmail && password === storedPassword) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          alert('Email hoặc mật khẩu không đúng');
        }
      } else {
        alert('Không tìm thấy người dùng. Vui lòng đăng ký trước.');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.subtitle}>Nhập email và mật khẩu của bạn</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="imshuvo97@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>
              Chưa có tài khoản? <Text style={styles.link}>Đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 50,
    marginLeft: 10,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#53B175',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#53B175',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
  link: {
    color: '#53B175',
  },
});