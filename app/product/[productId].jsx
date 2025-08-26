import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import headphonesImage from '../../assets/images/headphones.jpg';
import shoesImage from '../../assets/images/shoes.webp';
import watchImage from '../../assets/images/watch.webp';
import { theme } from '../../utils/themes';

// This would ideally come from an API or database
const productDatabase = {
    'WireLessHeadphone01': {
        id: 'WireLessHeadphone01',
        name: 'Wireless Headphones',
        price: '$99.99',
        originalPrice: '$149.99',
        image: headphonesImage,
        rating: 4.5,
        discount: '33% OFF',
        description: 'Premium wireless headphones with noise cancellation technology. Experience crystal-clear sound quality and comfortable fit for all-day listening.',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Quick charge - 5 minutes for 3 hours playback',
            'Premium build quality',
            'Voice assistant compatible'
        ],
        specifications: {
            'Driver Size': '40mm',
            'Frequency Response': '20Hz - 20kHz',
            'Impedance': '32Ω',
            'Weight': '250g',
            'Bluetooth': '5.0'
        }
    },
    'SmartWatch01': {
        id: 'SmartWatch01',
        name: 'Smart Watch',
        price: '$199.99',
        originalPrice: '$299.99',
        image: watchImage,
        rating: 4.8,
        discount: '33% OFF',
        description: 'Advanced smartwatch with health monitoring, GPS tracking, and comprehensive fitness features. Stay connected and track your wellness journey.',
        features: [
            'Heart Rate Monitoring',
            'GPS Tracking',
            'Water Resistant (50m)',
            '7-day battery life',
            'Sleep tracking',
            'Multiple sports modes'
        ],
        specifications: {
            'Display': '1.4" AMOLED',
            'Battery': '7 days',
            'Water Rating': '5ATM',
            'Sensors': 'Heart Rate, GPS, Accelerometer',
            'Connectivity': 'Bluetooth, WiFi'
        }
    },
    'Shoes01': {
        id: 'Shoes01',
        name: 'Running Shoes',
        price: '$89.99',
        originalPrice: '$120.99',
        image: shoesImage,
        rating: 4.3,
        discount: '25% OFF',
        description: 'High-performance running shoes designed for comfort and durability. Perfect for daily runs and long-distance training.',
        features: [
            'Responsive cushioning',
            'Breathable mesh upper',
            'Durable rubber outsole',
            'Lightweight design',
            'Arch support'
        ],
        specifications: {
            'Weight': '280g (Size 9)',
            'Drop': '10mm',
            'Upper': 'Engineered mesh',
            'Midsole': 'EVA foam',
            'Outsole': 'Rubber'
        }
    }
};

const Product = () => {
    const { productId } = useLocalSearchParams();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call or database fetch
        const fetchProduct = () => {
            setTimeout(() => {
                const foundProduct = productDatabase[productId];
                setProduct(foundProduct);
                setLoading(false);
            }, 500);
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.accent.green[500]} />
                    <Text style={styles.loadingText}>Loading product...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Product not found</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.backButtonText}>← Back</Text>
                    </TouchableOpacity>
                </View>
            <ScrollView style={styles.scrollContainer}>

                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image source={product.image} style={styles.productImage} />
                    {product.discount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{product.discount}</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>⭐ {product.rating}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{product.price}</Text>
                        {product.originalPrice && (
                            <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                        )}
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Features */}
                    <Text style={styles.sectionTitle}>Features</Text>
                    {product.features.map((feature, index) => (
                        <Text key={index} style={styles.featureItem}>• {feature}</Text>
                    ))}

                    {/* Specifications */}
                    <Text style={styles.sectionTitle}>Specifications</Text>
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <View key={key} style={styles.specRow}>
                            <Text style={styles.specKey}>{key}:</Text>
                            <Text style={styles.specValue}>{value}</Text>
                        </View>
                    ))}

                    {/* Add to Cart Button */}
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
    },
    scrollContainer: {
        flex: 1,
        paddingTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    errorText: {
        fontSize: theme.typography.fontSizes.heading3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
    },
    header: {
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: 20,
        backgroundColor: 'white',
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
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
    imageContainer: {
        position: 'relative',
        height: 300,
        marginHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        backgroundColor: theme.colors.white,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    discountBadge: {
        position: 'absolute',
        top: theme.spacing.md,
        left: theme.spacing.md,
        backgroundColor: theme.colors.error,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    discountText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSizes.bodySmall,
        fontWeight: theme.typography.fontWeights.bold,
    },
    contentContainer: {
        padding: theme.spacing.lg,
    },
    productName: {
        fontSize: theme.typography.fontSizes.heading2,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    ratingContainer: {
        marginBottom: theme.spacing.sm,
    },
    rating: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    price: {
        fontSize: theme.typography.fontSizes.heading3,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.accent.green[500],
        marginRight: theme.spacing.md,
    },
    originalPrice: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.tertiary,
        textDecorationLine: 'line-through',
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.heading4,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    description: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
        lineHeight: 22,
        marginBottom: theme.spacing.md,
    },
    featureItem: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xs,
    },
    specKey: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text.primary,
        flex: 1,
    },
    specValue: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
        flex: 1,
        textAlign: 'right',
    },
    addToCartButton: {
        backgroundColor: theme.colors.accent.green[500],
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.xl,
    },
    addToCartText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSizes.bodyLarge,
        fontWeight: theme.typography.fontWeights.bold,
    },
});