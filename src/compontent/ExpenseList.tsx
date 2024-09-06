// src/components/ExpenseList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Expense = {
  description: string;
  amount: number;
  category: string;
};

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.expenseItem}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  description: {
    fontSize: 18,
  },
  amount: {
    fontSize: 16,
    color: 'green',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});