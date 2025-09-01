import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import Users from '../../components/Users';
import { theme } from '../../utils/themes';
import { useRouter } from 'expo-router';


const Payment = () => {

  const router = useRouter();

  const [page, setPage] = useState(1);
  const [payements, setPayements] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);

  const PER_PAGE = 5;

  const fetchPayments = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const response = await fetch(`https://fakestoreapiserver.reactbd.org/api/payments?page=${pageNum}&perPage=${PER_PAGE}`);

      const data = await response.json();

      if (response.ok) {
        const newPayments = data.data || data;

        if (isLoadMore) {
          setPayements((prev) => [...prev, ...newPayments]);
        } else {
          setPayements(newPayments);
        }

        // Check if there are more users to load
        // Match the perPage parameter (10, not 20)
        setHasMore(newPayments.length === PER_PAGE);
        setError(null);
      } else {
        throw new Error('Failed to fetch Payements');
      }

    } catch (error) {
      setError(error.message);
      if (!isLoadMore) {
        Alert.alert('Error', 'Failed to load payements. Please try again.');
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadingMorePayments = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchUsers(nextPage, true);
  };

  useEffect(() => {
    fetchPayments(1, false);
  }, []);

  const renderPayements = useCallback(({ item }) => (
    <View style={[styles.container,
    item.status === 'Completed' ?
      styles.completed : (
        item.status === 'Refunded' ? styles.refunded :
          (item.status === 'Failed' ? styles.failed : styles.pending))]}>
      <TouchableOpacity style={styles.payementCard}>
        <Text>{item.userId}</Text>
        <Text>{item.orderId}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.method}</Text>
        <Text>{item.status}</Text>
        <Text>{item.transactionId}</Text>
        <Text>{item.createdAt}</Text>
      </TouchableOpacity>
    </View>
  ), []);

  // Render Show More button
  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endMessage}>No more users to load</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={loadingMorePayments}
          disabled={loadingMore}
        >
          {loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.showMoreText}>Loading...</Text>
            </View>
          ) : (
            <Text style={styles.showMoreText}>Show More</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchUsers(1, false)}>
          <Text style={styles.retryText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
          <Text style={styles.title}>Friends ({payements.length})</Text>

        </TouchableOpacity>
      </View>
      <FlatList
        data={payements}
        renderItem={renderPayements}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.accent.green[500],
    fontWeight: theme.typography.fontWeights.medium,
  },
})