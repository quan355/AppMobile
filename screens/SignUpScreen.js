import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      if (username && email && password) {
        const userData = { username, email, password };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.replace('SignIn');
      } else {
        alert('Vui lòng điền đầy đủ tất cả các trường');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng ký:', error);
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
          <Text style={styles.title}>Đăng ký</Text>
          <Text style={styles.subtitle}>Nhập thông tin của bạn để tiếp tục</Text>
          <Text style={styles.label}>Tên người dùng</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Afsar Hossen Shuvo"
            autoCapitalize="words"
          />
          <Text style={styles.label}>Email</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={email}
              onChangeText={setEmail}
              placeholder="imshuvo97@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon name="check" size={20} color="#53B175" style={styles.checkIcon} />
          </View>
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
          <Text style={styles.termsText}>
            Bằng việc tiếp tục, bạn đồng ý với{' '}
            <Text style={styles.link}>Điều khoản Dịch vụ</Text> và{' '}
            <Text style={styles.link}>Chính sách Bảo mật</Text> của chúng tôi.
          </Text>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginText}>
              Đã có tài khoản? <Text style={styles.link}>Đăng nhập</Text>
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  checkIcon: {
    padding: 10,
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
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginVertical: 20,
  },
  link: {
    color: '#53B175',
  },
  signupButton: {
    backgroundColor: '#53B175',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
});