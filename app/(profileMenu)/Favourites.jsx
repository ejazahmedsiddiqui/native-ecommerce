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
import Product from '../../components/Product';


const Favourites = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products from API
  const fetchProducts = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await fetch(
        `https://fakestoreapiserver.reactbd.org/api/products?page=${pageNum}&limit=20`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        const newProducts = data.data || data;
        
        if (isLoadMore) {
          setProducts(prev => [...prev, ...newProducts]);
        } else {
          setProducts(newProducts);
        }

        setHasMore(newProducts.length === 20);
        setError(null);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      if (!isLoadMore) {
        Alert.alert('Error', 'Failed to load products. Please try again.');
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProducts(nextPage, true);
  };

  useEffect(() => {
    fetchProducts(1, false);
  }, []);

  // Calculate discount percentage
  const calculateDiscount = (oldPrice, price) => {
    const oldPriceNum = parseFloat(oldPrice);
    const priceNum = parseFloat(price);
    return Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
  };

  const renderProduct = useCallback(({ item }) => (
    <Product item={item} onCalculateDiscount={calculateDiscount}/>
  ), []);

  // Render Show More button
  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endMessage}>No more products to load</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.showMoreButton} 
          onPress={loadMoreProducts}
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
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchProducts(1, false)}>
          <Text style={styles.retryText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products ({products.length})</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  },
  retryText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContent: {
    padding: 16,
  },

  footerContainer: {
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
  endMessage: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default Favourites;