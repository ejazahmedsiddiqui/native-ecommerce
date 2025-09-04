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
import Coupons from '../../components/Coupons';

const Promotions = () => {
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

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPromotions = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await fetch(
        `https://fakestoreapiserver.reactbd.org/api/coupons?page=${pageNum}&limit=20`
      );

      const data = await response.json();

      if (response.ok) {
        const newPromotions = data.data || data;

        if (isLoadMore) {
          setPromotions(prev => [...prev, ...newPromotions]);
        } else {
          setPromotions(newPromotions);
        }

        setHasMore(newPromotions.length === 20);
        setError(null);
      } else {
        throw new Error('Failed to fetch promotions');
      }
    } catch (err) {
      setError(err.message);
      if (!isLoadMore) {
        Alert.alert('Error', 'Failed to load promotions. Please try again.');
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMorePromotions = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPromotions(nextPage, true);
  };

  useEffect(() => {
    fetchPromotions(1, false);
  }, []);

  const renderPromotions = useCallback(({ item }) => (
    <Coupons item={item} />
  ), []);

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endMessage}>No more promotions to load</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={loadMorePromotions}
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
        <Text style={styles.loadingText}>Loading Promotions...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchPromotions(1, false)}>
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
        <Text style={styles.headerTitle}>Promotions</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={promotions}
        renderItem={renderPromotions}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default Promotions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: 20,
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
    marginRight: 40,
  },
  placeholder: {
    width: 40,
    paddingVertical: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  showMoreButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
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
footerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
},
  endMessage: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});