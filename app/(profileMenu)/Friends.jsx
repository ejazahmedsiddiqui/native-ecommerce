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

const Friends = () => {
  // Fetch users from API
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PER_PAGE = 5;

  const fetchUsers = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await fetch(
        `https://fakestoreapiserver.reactbd.org/api/users?page=${pageNum}&perPage=${PER_PAGE}`
      );

      const data = await response.json();

      if (response.ok) {
        const newUsers = data.data || data;

        if (isLoadMore) {
          // Append new users to existing ones
          setUsers(prev => [...prev, ...newUsers]);
        } else {
          // Replace users for initial load
          setUsers(newUsers);
        }

        // Check if there are more users to load
        // Match the perPage parameter (10, not 20)
        setHasMore(newUsers.length === PER_PAGE);
        setError(null);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
      if (!isLoadMore) {
        Alert.alert('Error', 'Failed to load users. Please try again.');
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  // Load more users (renamed from loadMoreProducts)
  const loadMoreUsers = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchUsers(nextPage, true); // ✅ Call fetchUsers, not fetchProducts
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers(1, false); // ✅ Call fetchUsers, not fetchProducts
  }, []);

  // Render user card (renamed from renderProduct)
  const renderUser = useCallback(({ item }) => (
    <Users item={item} />
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
          onPress={loadMoreUsers} // ✅ Call loadMoreUsers, not loadMoreProducts
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
          onPress={() => router.push('/')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
          <Text style={styles.title}>Friends ({users.length})</Text>

        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderUser} // ✅ Use renderUser, not renderProduct
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Friends;

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
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
  },
});