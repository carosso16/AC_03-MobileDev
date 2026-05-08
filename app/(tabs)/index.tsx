'use client';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useExpenses } from '../expenses-context';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function HomeScreen() {
  const { expenses, total, removeExpense } = useExpenses();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Caderneta de Gastos</ThemedText>
        <ThemedText style={styles.subtitle}>Visualize seus gastos e controle seu orçamento.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.summaryCard}>
        <ThemedText style={styles.summaryLabel}>Total gasto</ThemedText>
        <ThemedText type="subtitle" style={styles.totalValue}>
          {currencyFormatter.format(total)}
        </ThemedText>
        <ThemedText style={styles.summaryCaption}>{expenses.length} gasto(s) registrados</ThemedText>
      </ThemedView>

      {expenses.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="defaultSemiBold">Nenhum gasto registrado ainda.</ThemedText>
          <ThemedText>Use o botão abaixo para adicionar seu primeiro gasto.</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <ThemedText type="defaultSemiBold" style={styles.cardText}>{item.description}</ThemedText>
                <ThemedText style={styles.cardText}>{currencyFormatter.format(item.amount)}</ThemedText>
              </View>
              <Pressable style={styles.deleteButton} onPress={() => removeExpense(item.id)}>
                <ThemedText style={styles.deleteButtonText}>Apagar</ThemedText>
              </Pressable>
            </View>
          )}
        />
      )}

      <Link href="/explore" style={styles.addButton}>
        <ThemedText type="subtitle" style={styles.addButtonText}>
          Adicionar gasto
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    gap: 8,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
  },
  summaryCard: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  summaryLabel: {
    color: '#c7d2fe',
    fontSize: 14,
    marginBottom: 6,
  },
  summaryCaption: {
    color: '#dbeafe',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  totalValue: {
    color: '#fff',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 40,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#dbeafe',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  deleteButtonText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  cardText: {
    color: '#1e3a8a',
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
  },
});
