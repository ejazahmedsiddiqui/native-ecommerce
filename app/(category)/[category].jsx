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
    FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import headphonesImage from '../../assets/images/headphones.jpg';
import shoesImage from '../../assets/images/shoes.webp';
import watchImage from '../../assets/images/watch.webp';
import { theme } from '../../utils/themes';

const categoryDatabase = {
    'Electronics': {
        id: 'Electronics',
        name: 'Electronics',
        products: [
            {
                id: 1,
                name: 'Wireless HeadPhones',
                price: '$30',
                rating: 4.3,
                discount: '33% OFF',
                image: headphonesImage
            },
            {
                id: 2,
                name: 'HeadPhones',
                price: '$25',
                rating: 4.1,
                discount: '20% OFF',
                image: headphonesImage
            },
            {
                id: 3,
                name: 'Wireless Watch',
                price: '$120',
                rating: 4.5,
                discount: '15% OFF',
                image: watchImage
            },
            {
                id: 4,
                name: 'Smart Watch',
                price: '$80',
                rating: 4.2,
                discount: '25% OFF',
                image: watchImage
            },
        ]
    },
    'Fashion': {
        id: 'Fashion',
        name: 'Fashion',
        products: [
            {
                id: 1,
                name: 'Running Shoes',
                price: '$60',
                rating: 4.4,
                discount: '30% OFF',
                image: shoesImage
            },
            {
                id: 2,
                name: 'Casual Sneakers',
                price: '$45',
                rating: 4.0,
                discount: '25% OFF',
                image: shoesImage
            },
            {
                id: 3,
                name: 'Sports Shoes',
                price: '$75',
                rating: 4.6,
                discount: '20% OFF',
                image: shoesImage
            },
        ]
    },
    'Beauty': {
        id: 'Beauty',
        name: 'Beauty',
        products: [
            {
                id: 1,
                name: 'Face Cream',
                price: '$25',
                rating: 4.3,
                discount: '15% OFF'
            },
            {
                id: 2,
                name: 'Lipstick',
                price: '$18',
                rating: 4.1,
                discount: '10% OFF'
            },
        ]
    },
    'Home': {
        id: 'Home',
        name: 'Home & Garden',
        products: [
            {
                id: 1,
                name: 'Table Lamp',
                price: '$35',
                rating: 4.2,
                discount: '20% OFF'
            },
            {
                id: 2,
                name: 'Flower Vase',
                price: '$22',
                rating: 4.0,
                discount: '15% OFF'
            },
        ]
    },
    'Books': {
        id: 'Books',
        name: 'Books',
        products: [
            {
                id: 1,
                name: 'Programming Guide',
                price: '$29',
                rating: 4.7,
                discount: '25% OFF'
            },
            {
                id: 2,
                name: 'Design Patterns',
                price: '$35',
                rating: 4.5,
                discount: '20% OFF'
            },
        ]
    },
    'Sports': {
        id: 'Sports',
        name: 'Sports',
        products: [
            {
                id: 1,
                name: 'Running Shoes',
                price: '$29',
                rating: 4.7,
                discount: '25% OFF'
            },
            {
                id: 2,
                name: 'Sweat Absorbants',
                price: '$35',
                rating: 4.5,
                discount: '20% OFF'
            },
        ]
    },
}

const Category = () => {
    const { category } = useLocalSearchParams();
    const router = useRouter();

    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = () => {
            setTimeout(() => {
                const foundCategory = categoryDatabase[category];
                setCategoryData(foundCategory);
                setLoading(false);
            }, 500);
        };

        fetchCategory();
    }, [category]);

    const renderProduct = ({ item }) => (
        <TouchableOpacity style={styles.productCard}>
            {item.image && (
                <Image source={item.image} style={styles.productImage} />
            )}
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    {item.discount && (
                        <Text style={styles.discountText}>{item.discount}</Text>
                    )}
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.accent.green[500]} />
                    <Text style={styles.loadingText}>Loading category...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!categoryData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Category not found</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.push('/')}
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
                <Text style={styles.categoryTitle}>{categoryData.name}</Text>
            </View>
            
            <View style={styles.contentContainer}>
                <Text style={styles.productsCount}>
                    {categoryData.products.length} Products Found
                </Text>
                
                <FlatList
                    data={categoryData.products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </SafeAreaView>
    )
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
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
        backgroundColor: 'white',
        paddingHorizontal: theme.spacing.lg,
        paddingTop: 20,
        paddingBottom: theme.spacing.md,
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
    categoryTitle: {
        fontSize: theme.typography.fontSizes.heading2,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
    },
    contentContainer: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    productsCount: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.lg,
    },
    flatListContent: {
        paddingBottom: theme.spacing.lg,
    },
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        flex: 0.48,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: theme.spacing.sm,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    productPrice: {
        fontSize: theme.typography.fontSizes.bodyLarge,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.accent.green[500],
        marginRight: theme.spacing.sm,
    },
    discountText: {
        fontSize: theme.typography.fontSizes.bodySmall,
        color: '#ff4444',
        backgroundColor: '#ffe6e6',
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: theme.typography.fontSizes.bodySmall,
        color: theme.colors.text.secondary,
    },
});