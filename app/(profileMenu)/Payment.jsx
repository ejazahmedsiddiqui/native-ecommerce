import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { theme } from '../../utils/themes';

const Payment = () => {
  // Navigation
  const navigation = useNavigation();

  // Effect to handle navigation listener
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault(); // Prevent default navigation
      console.log('onback');

      // Always go back to profile, regardless of navigation history
      router.replace('/profile');
    });

    return () => {
      navigation.removeListener('beforeRemove', listener);
    };
  }, []);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navigate to profile tab if no back stack
      router.replace('/profile'); // Adjust this path to match your tab structure
    }
  };

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PER_PAGE = 5;

  const fetchPayments = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const response = await fetch(
        `https://fakestoreapiserver.reactbd.org/api/payments?page=${pageNum}&perPage=${PER_PAGE}`);

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
    await fetchPayments(nextPage, true);
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
        <Text style={styles.orderId}>Order No.: {item.orderId}</Text>
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
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={styles.placeholder} />
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
    backgroundColor: theme.colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Compensate for back button width
  },
  placeholder: {
    width: 40, // Same as back button to center title
  },
  title: {
    fontSize: theme.typography.fontSizes.heading2,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.text.secondary,
  },
  errorText: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.accent.red[500],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryText: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.accent.blue[500],
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  showMoreButton: {
    backgroundColor: theme.colors.accent.red[600],
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  showMoreText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.bodyMedium,
    fontWeight: theme.typography.fontWeights.bold,
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endMessage: {
    fontSize: theme.typography.fontSizes.bodySmall,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  paymentCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  orderId: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSizes.caption,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.white,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  amount: {
    fontSize: theme.typography.fontSizes.bodyLarge,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  method: {
    fontSize: theme.typography.fontSizes.bodySmall,
    color: theme.colors.text.primary,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionId: {
    fontSize: theme.typography.fontSizes.caption,
    color: theme.colors.text.inverse,
  },
  date: {
    fontSize: theme.typography.fontSizes.caption,
    color: theme.colors.text.inverse,
  },
    completed: {
    backgroundColor: theme.colors.accent.green[500],
  },
  pending: {
    backgroundColor: theme.colors.accent.yellow[500],
  },
  failed: {
    backgroundColor: theme.colors.accent.red[400],
  },
  refunded: {
    backgroundColor: theme.colors.accent.blue[500],
  },
});