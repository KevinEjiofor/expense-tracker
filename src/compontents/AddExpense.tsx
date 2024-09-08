import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Expense = {
  description: string;
  amount: number;
  category: string;
};

interface AddExpenseProps {
  onAddExpense: (expense: Expense) => void;
}

export const AddExpense: React.FC<AddExpenseProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  const handleSubmit = () => {
    if (description && amount && category) {
      const newExpense: Expense = {
        description,
        amount: parseFloat(amount),
        category,
      };
      onAddExpense(newExpense);
      setDescription('');
      setAmount('');
      Keyboard.dismiss(); 
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Transport" value="transport" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Bills" value="bills" />
      </Picker>
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
  },
  input: {
    height: 40,
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
