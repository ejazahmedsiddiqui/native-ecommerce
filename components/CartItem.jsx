import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product details for each product in the cart
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const productPromises = item.products.map(async (product) => {
                    const response = await fetch(`https://fakestoreapiserver.reactbd.org/api/products/${product.productId}`);
                    const data = await response.json();
                    return {
                        ...data,
                        quantity: product.quantity,
                        productId: product.productId
                    };
                });

                const products = await Promise.all(productPromises);
                const productMap = {};
                products.forEach(product => {
                    productMap[product.productId] = product;
                });
                
                setProductDetails(productMap);
                setError(null);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (item.products && item.products.length > 0) {
            fetchProductDetails();
        }
    }, [item.products]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateTotalPrice = () => {
        return item.products.reduce((total, product) => {
            const productDetail = productDetails[product.productId];
            if (productDetail) {
                return total + (parseFloat(productDetail.price) * product.quantity);
            }
            return total;
        }, 0);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            Alert.alert(
                'Remove Item',
                'Do you want to remove this item from cart?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Remove', onPress: () => onRemoveItem && onRemoveItem(item._id, productId) }
                ]
            );
            return;
        }
        onUpdateQuantity && onUpdateQuantity(item._id, productId, newQuantity);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#e74c3c" />
                <Text style={styles.loadingText}>Loading cart items...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load cart items</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cartTitle}>Cart #{item._id}</Text>
                <Text style={styles.cartDate}>{formatDate(item.date)}</Text>
            </View>

            {item.products.map((product) => {
                const productDetail = productDetails[product.productId];
                if (!productDetail) return null;

                return (
                    <View key={product.productId} style={styles.productContainer}>
                        <Image 
                            source={{ uri: productDetail.image }} 
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                        
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle} numberOfLines={2}>
                                {productDetail.title}
                            </Text>
                            <Text style={styles.productCategory}>
                                {productDetail.category}
                            </Text>
                            <Text style={styles.productPrice}>
                                ${parseFloat(productDetail.price).toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleQuantityChange(product.productId, product.quantity - 1)}
                            >
                                <Ionicons name="remove" size={16} color="#666" />
                            </TouchableOpacity>
                            
                            <Text style={styles.quantityText}>{product.quantity}</Text>
                            
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleQuantityChange(product.productId, product.quantity + 1)}
                            >
                                <Ionicons name="add" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.itemTotal}>
                            <Text style={styles.totalText}>
                                ${(parseFloat(productDetail.price) * product.quantity).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                );
            })}

            <View style={styles.cartFooter}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Cart Total:</Text>
                    <Text style={styles.cartTotal}>
                        ${calculateTotalPrice().toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
        fontSize: 14,
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    cartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    cartDate: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    productContainer: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    productImage: {
        width: 60,
        height: 60,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
        marginBottom: 4,
    },
    productCategory: {
        fontSize: 12,
        color: '#7f8c8d',
        textTransform: 'capitalize',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#e74c3c',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f3f4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        minWidth: 24,
        textAlign: 'center',
    },
    itemTotal: {
        alignItems: 'flex-end',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    cartFooter: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    cartTotal: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e74c3c',
    },
});

export default CartItem;