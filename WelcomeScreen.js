import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// 可选：如果你有单独的 mathLogic.js，可在此处引入
// import { add } from '../utils/mathLogic'; 

export default function HomeScreen({ navigation }) {
  // 定义两个数字输入的状态
  const [numberA, setNumberA] = React.useState('');
  const [numberB, setNumberB] = React.useState('');

  // 用于显示在同一屏幕上的结果
  const [result, setResult] = React.useState(null);

  // 当输入内容变化时，可在此处 log（可选 Bonus）
  const handleChangeA = (text) => {
    console.log('Number A changed:', text);
    setNumberA(text);
  };
  const handleChangeB = (text) => {
    console.log('Number B changed:', text);
    setNumberB(text);
  };

  // 简单加法运算逻辑
  const computeResult = () => {
    const a = parseFloat(numberA) || 0;
    const b = parseFloat(numberB) || 0;
    // 如果有单独 mathLogic.js，可以这样写：const sum = add(a, b);
    const sum = a + b;
    setResult(sum);
  };

  // 导航到结果页面
  const goToResultScreen = () => {
    // 先确保已经计算过 result；或可在此处直接再计算一次
    computeResult();
    // 跳转到 ResultScreen 并传递结果参数
    navigation.navigate('Result', { finalResult: result });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Two Numbers</Text>

      <TextInput
        style={styles.input}
        placeholder="Number A"
        keyboardType="numeric"
        value={numberA}
        onChangeText={handleChangeA} // 带日志输出
      />
      <TextInput
        style={styles.input}
        placeholder="Number B"
        keyboardType="numeric"
        value={numberB}
        onChangeText={handleChangeB} // 带日志输出
      />

      {/* 按钮1：计算并显示在同一页面 */}
      <Button title="Compute" onPress={computeResult} />

      {/* 结果显示 */}
      {result !== null && (
        <Text style={styles.resultText}>Result: {result}</Text>
      )}

      {/* 按钮2：导航到第二个页面显示结果 */}
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Result Screen" onPress={goToResultScreen} />
      </View>
    </View>
  );
}

// 简单样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});