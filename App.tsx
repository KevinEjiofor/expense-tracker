import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WelcomeScreen } from './src/compontents/WelcomeScreen';
import { AddExpense } from './src/compontents/AddExpense';
import { ExpenseList } from './src/compontents/ExpenseList';
import { TotalAmount } from './src/compontents/TotalAmount';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Expense = {
  description: string;
  amount: number;
  category: string;
};

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true); 

  useEffect(() => {
    // Load stored expenses
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('@expenses');
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };

    loadExpenses();
  }, []);

  useEffect(() => {
   
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem('@expenses', JSON.stringify(expenses));
      } catch (error) {
        console.error('Error saving expenses:', error);
      }
    };

    saveExpenses();
  }, [expenses]);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsWelcomeVisible(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

 
  const filteredExpenses = filter === 'all' ? expenses : expenses.filter((exp) => exp.category === filter);

  return (
    <View style={styles.container}>
    
      {isWelcomeVisible ? (
        <WelcomeScreen />
      ) : (
        <>
          <AddExpense onAddExpense={handleAddExpense} />
          <View style={styles.filterContainer}>
            <Button title="All" onPress={() => handleFilterChange('all')} />
            <Button title="Food" onPress={() => handleFilterChange('food')} />
            <Button title="Transport" onPress={() => handleFilterChange('transport')} />
            <Button title="Shopping" onPress={() => handleFilterChange('shopping')} />
            <Button title="Bills" onPress={() => handleFilterChange('bills')} />
          </View>
          <TotalAmount expenses={filteredExpenses} />
          <ExpenseList expenses={filteredExpenses} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
