'use client';

import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useExpenses } from '../expenses-context';

export default function ExpenseFormScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const parsedAmount = Number(amount.replace(',', '.'));

    if (!description.trim() || !parsedAmount || parsedAmount <= 0) {
      setError('Descrição não pode ficar vazia e valor deve ser maior que zero.');
      return;
    }

    addExpense({
      description: description.trim(),
      amount: parsedAmount,
    });

    router.push('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.panel}>
          <ThemedText type="title">Novo gasto</ThemedText>
          <ThemedText style={styles.subtitle}>Adicione o nome e valor para controlar seus gastos.</ThemedText>

          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Ex: almoço"
            placeholderTextColor="#9ca3af"
          />

          <ThemedText style={styles.label}>Valor</ThemedText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="Ex: 25.50"
            placeholderTextColor="#9ca3af"
          />

          {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <ThemedText type="subtitle" style={styles.saveButtonText}>
              Salvar gasto
            </ThemedText>
          </Pressable>

          <View style={styles.infoBox}>
            <ThemedText style={styles.infoText}>
              Ao salvar, você volta automaticamente para a lista e vê o total atualizado.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  panel: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginTop: 4,
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 16,
    color: '#334155',
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    color: '#b91c1c',
    marginTop: 4,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
  },
  infoBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
  },
  infoText: {
    color: '#0f172a',
  },
});
