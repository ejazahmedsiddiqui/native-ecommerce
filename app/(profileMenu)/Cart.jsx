import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import CartItem from '../../components/CartItem'; // Import the CartItem component
import { theme } from '../../utils/themes';

const Cart = () => {
    // Navigation
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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

    useEffect(() => {
        fetchCart(1, false);
    }, []);

    const handleBackPress = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            // Navigate to profile tab if no back stack
            router.replace('/profile'); // Adjust this path to match your tab structure
        }
    };

    const fetchCart = async (pageNum = 1, isLoadMore = false) => {
        try {
            if (!isLoadMore) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const response = await fetch(
                `https://fakestoreapiserver.reactbd.org/api/cart?page=${pageNum}&perPage=10`
            );

            const data = await response.json();

            if (response.ok) {
                const newCart = data.data || data;

                if (isLoadMore) {
                    setCart(prev => [...prev, ...newCart]);
                } else {
                    setCart(newCart);
                }

                // Check if there are more pages based on API response
                setHasMore(data.currentPage < data.totalPages);
                setError(null);
            } else {
                throw new Error("Failed to fetch cart data");
            }

        } catch (err) {
            console.log(err.message);
            setError(err.message);
            if (!isLoadMore) {
                Alert.alert('Error', 'Failed to load cart. Please try again.');
            }
        } finally {
            if (!isLoadMore) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    };

    const loadMoreCarts = async () => {
        if (loadingMore || !hasMore) return;

        const nextPage = page + 1;
        setPage(nextPage);
        await fetchCart(nextPage, true);
    };

    const handleUpdateQuantity = (cartId, productId, newQuantity) => {
        setCart(prevCart => 
            prevCart.map(cartItem => {
                if (cartItem._id === cartId) {
                    return {
                        ...cartItem,
                        products: cartItem.products.map(product => 
                            product.productId === productId 
                                ? { ...product, quantity: newQuantity }
                                : product
                        )
                    };
                }
                return cartItem;
            })
        );
    };

    const handleRemoveItem = (cartId, productId) => {
        setCart(prevCart => 
            prevCart.map(cartItem => {
                if (cartItem._id === cartId) {
                    const updatedProducts = cartItem.products.filter(
                        product => product.productId !== productId
                    );
                    // If no products left in cart, you might want to remove the entire cart
                    return updatedProducts.length > 0 
                        ? { ...cartItem, products: updatedProducts }
                        : null;
                }
                return cartItem;
            }).filter(Boolean) // Remove null carts
        );
    };

    const renderCart = useCallback(({ item }) => (
        <CartItem 
            item={item} 
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
        />
    ), []);

    // Render Show More button
    const renderFooter = () => {
        if (!hasMore) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.endMessage}>No more carts to load</Text>
                </View>
            );
        }

        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={loadMoreCarts}
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
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Your Shopping Cart</Text>
                    <View style={styles.placeholder} />
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#e74c3c" />
                    <Text style={styles.loadingText}>Loading cart...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Your Shopping Cart</Text>
                    <View style={styles.placeholder} />
                </View>
                <View style={styles.centerContainer}>
                    <Ionicons name="alert-circle" size={48} color="#e74c3c" />
                    <Text style={styles.errorText}>Error: {error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={() => fetchCart(1, false)}
                    >
                        <Text style={styles.retryText}>Tap to retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Empty cart state
    if (cart.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Your Shopping Cart</Text>
                    <View style={styles.placeholder} />
                </View>
                <View style={styles.centerContainer}>
                    <Ionicons name="cart-outline" size={64} color="#95a5a6" />
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>Add some products to get started</Text>
                    <TouchableOpacity 
                        style={styles.shopButton}
                        onPress={() => router.push('/home')}
                    >
                        <Text style={styles.shopButtonText}>Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Shopping Cart ({cart.length})</Text>
                <View style={styles.placeholder} />
            </View>

            <FlatList
                data={cart}
                renderItem={renderCart}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
        marginRight: 40, // Compensate for back button width
    },
    placeholder: {
        width: 40, // Same as back button to center title
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
        marginTop: 16,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#e74c3c',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2c3e50',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 32,
    },
    shopButton: {
        backgroundColor: '#e74c3c',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 25,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: 20,
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

export default Cart;