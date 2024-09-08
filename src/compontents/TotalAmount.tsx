import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TotalAmountProps {
  expenses: { amount: number }[];
}

export const TotalAmount: React.FC<TotalAmountProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total Spent: ₦ {total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
