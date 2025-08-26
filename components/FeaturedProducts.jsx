import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import headphonesImage from '../assets/images/headphones.jpg';
import shoesImage from '../assets/images/shoes.webp';
import watchImage from '../assets/images/watch.webp';
import { theme } from '../utils/themes';

const featuredProducts = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: '$99.99',
        originalPrice: '$149.99',
        image: headphonesImage,
        rating: 4.5,
        discount: '33% OFF',
        productId: 'WireLessHeadphone01'
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: '$199.99',
        originalPrice: '$299.99',
        image: watchImage,
        rating: 4.8,
        discount: '33% OFF',
        productId: 'SmartWatch01'
    },
    {
        id: '3',
        name: 'Running Shoes',
        price: '$89.99',
        originalPrice: '$120.99',
        image: shoesImage,
        rating: 4.3,
        discount: '25% OFF',
        productId: 'Shoes01'
    },
];

const FeaturedProducts = () => {
    const router = useRouter();

    const handleProductPress = (productId) => {
        console.log('Navigating to product:', productId);
        console.log('Route will be:', `/product/${productId}`);
        router.push(`/product/${productId}`);
    };

    // PRODUCT CAROUSEL
    const renderProduct = ({ item }) => (
        <TouchableOpacity 
            style={styles.productCard}
            onPress={() => handleProductPress(item.productId)}
        >
            <View style={styles.productImageContainer}>
                <Image source={item.image} style={styles.productImage} />
                {item.discount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{item.discount}</Text>
                    </View>
                )}
            </View>

            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                    {/* NUMBER OF LINES -> THIS PROPERTY LIMITS THE NUMBER OF LINES AND ANYTHING MORE THAN THAT IS REPLACED BY ELEPSIS (...) */}
                    {item.name} { /* NAME OF ITEM IN CAROUSEL*/}
                </Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {item.rating}</Text>
                    {/* RATING ^ ex:  ⭐ 4.3 */}
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    {item.originalPrice && (
                        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                    )}
                    {/* THIS LINE IS ONLY DISPLAYED IF item.originalPrice is true as REACT IGNORES EVERYTHING AFTER FIRST FALSE  */}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={featuredProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.productsContainer}
                />
            </View>
        </SafeAreaView>
    )
}

export default FeaturedProducts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
    },
    productsContainer: {
        paddingHorizontal: theme.spacing.lg,
    },
    productCard: {
        width: 180,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        marginRight: theme.spacing.md,
        ...theme.shadows.md,
        marginBottom: 10,
    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.background.secondary,
    },
    discountBadge: {
        position: 'absolute',
        top: theme.spacing.sm,
        left: theme.spacing.sm,
        backgroundColor: theme.colors.error,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    discountText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSizes.caption,
        fontWeight: theme.typography.fontWeights.bold,
    },
    productInfo: {
        padding: theme.spacing.md,
    },
    productName: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
        lineHeight: 20,
    },
    ratingContainer: {
        marginBottom: theme.spacing.sm,
    },
    rating: {
        fontSize: theme.typography.fontSizes.bodySmall,
        color: theme.colors.text.secondary,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: theme.typography.fontSizes.bodyLarge,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.accent.green[500],
        marginRight: theme.spacing.sm,
    },
    originalPrice: {
        fontSize: theme.typography.fontSizes.bodySmall,
        color: theme.colors.text.tertiary,
        textDecorationLine: 'line-through',
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.heading3,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
    },
    seeAllText: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.accent.green[500],
        fontWeight: theme.typography.fontWeights.medium,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.heading3,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
    },
    seeAllText: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.accent.green[500],
        fontWeight: theme.typography.fontWeights.medium,
    },
})