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
import { theme } from '../../utils/themes';
import { router } from 'expo-router';

const Payment = () => {

  // Navigate back to profile and clear any intermediate screens
  const navigateToProfile = () => {
    router.replace('/profile');
  };

  const [page, setPage] = useState(1);
  const [payments, setPayments] = useState([]); // Fixed: was boolean, should be array
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Fixed: was true, should be false initially

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
          setPayments((prev) => [...prev, ...newPayments]);
        } else {
          setPayments(newPayments);
        }

        // Check if there are more payments to load
        setHasMore(newPayments.length === PER_PAGE);
        setError(null);
      } else {
        throw new Error('Failed to fetch Payments');
      }

    } catch (error) {
      setError(error.message);
      if (!isLoadMore) {
        Alert.alert('Error', 'Failed to load payments. Please try again.');
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMorePayments = async () => { // Fixed function name
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPayments(nextPage, true); // Fixed: was fetchUsers, should be fetchPayments
  };

  useEffect(() => {
    fetchPayments(1, false);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return styles.completed;
      case 'Refunded':
        return styles.refunded;
      case 'Failed':
        return styles.failed;
      case 'Pending':
        return styles.pending;
      default:
        return styles.pending;
    }
  };

  const renderPayments = useCallback(({ item }) => (
    <View style={[styles.paymentCard, getStatusStyle(item.status)]}>
      <View style={styles.paymentHeader}>
        <Text style={styles.orderId}>Order #{item.orderId}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.paymentDetails}>
        <Text style={styles.amount}>${item.amount}</Text>
        <Text style={styles.method}>via {item.method}</Text>
      </View>
      
      <View style={styles.paymentFooter}>
        <Text style={styles.transactionId}>ID: {item.transactionId}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  ), []);

  // Render Show More button
  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endMessage}>No more payments to load</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={loadMorePayments}
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
        <Text style={styles.loadingText}>Loading payments...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchPayments(1, false)}>
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
          onPress={navigateToProfile}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payments ({payments.length})</Text>
      </View>
      <FlatList
        data={payments}
        renderItem={renderPayments}
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 20,
    paddingBottom: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    color: '#333',
    paddingHorizontal: theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryText: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  showMoreButton: {
    backgroundColor: theme.colors.accent.red[600],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  showMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endMessage: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  method: {
    fontSize: 14,
    color: '#666',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionId: {
    fontSize: 12,
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  completed: {
    backgroundColor: '#27ae60',
  },
  pending: {
    backgroundColor: '#f39c12',
  },
  failed: {
    backgroundColor: '#e74c3c',
  },
  refunded: {
    backgroundColor: '#3498db',
  },
});