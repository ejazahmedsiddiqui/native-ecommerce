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
import headphonesImage from '../assets/images/headphones.jpg';
import shoesImage from '../assets/images/shoes.webp';
import watchImage from '../assets/images/watch.webp';
import { theme } from '../utils/themes';

const { width } = Dimensions.get('window');

// Sample data - replace with your actual data
const categories = [
  { id: '1', name: 'Electronics', icon: '📱', color: theme.colors.accent.blue[500] },
  { id: '2', name: 'Fashion', icon: '👕', color: theme.colors.accent.orange[500] },
  { id: '3', name: 'Home', icon: '🏠', color: theme.colors.accent.green[500] },
  { id: '4', name: 'Sports', icon: '⚽', color: theme.colors.accent.yellow[500] },
  { id: '5', name: 'Beauty', icon: '💄', color: theme.colors.accent.red[500] },
  { id: '6', name: 'Books', icon: '📚', color: theme.colors.primary500 },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: '$99.99',
    originalPrice: '$149.99',
    image: headphonesImage,
    rating: 4.5,
    discount: '33% OFF',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: '$199.99',
    originalPrice: '$299.99',
    image: watchImage,
    rating: 4.8,
    discount: '33% OFF',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: '$89.99',
    originalPrice: '$120.99',
    image: shoesImage,
    rating: 4.3,
    discount: '25% OFF',
  },
];

const bannerAds = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% OFF',
    backgroundColor: theme.colors.accent.orange[500],
    textColor: theme.colors.white,
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Latest Collection',
    backgroundColor: theme.colors.accent.blue[500],
    textColor: theme.colors.white,
  },
];

export default function HomeScreen() {
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.color }]}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  
  // PRODUCT CAROUSEL
  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
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

  // THIS FUNCTION RENDERS A BANNER  ex: SUMMER SALE!! 50% off, etc.
  const renderBanner = ({ item }) => (
    <View style={[styles.bannerCard, { backgroundColor: item.backgroundColor }]}>
      <Text style={[styles.bannerTitle, { color: item.textColor }]}>
        {item.title}
      </Text>
      <Text style={[styles.bannerSubtitle, { color: item.textColor }]}>
        {item.subtitle}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Welcome back</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands..."
            placeholderTextColor={theme.colors.text.tertiary}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner Carousel */}
        <View style={[styles.section, { paddingTop: 20 }]} >
          <FlatList
            data={bannerAds}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width - theme.spacing.xl * 2}
            decelerationRate="fast"
            contentContainerStyle={styles.bannerContainer}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Flash Sale Section */}
        <View style={styles.section}>
          <View style={styles.flashSaleHeader}>
            <View style={styles.flashSaleTitle}>
              <Text style={styles.flashSaleIcon}>⚡</Text>
              <Text style={styles.sectionTitle}>Flash Sale</Text>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Ends in: 02:45:30</Text>
            </View>
          </View>
        </View>

        {/* Featured Products */}
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

        {/* Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => `rec-${item.id}`}
            // the keyextractor (or id) becomes rec-1, rec-2, rec-3. This is done to prevent mismatch in multiple flatlists in a single file
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent.green[200],
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeights.regular,
  },
  userName: {
    fontSize: theme.typography.fontSizes.heading3,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeights.bold,
    marginTop: theme.spacing.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: theme.spacing.sm,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.full,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: theme.typography.fontWeights.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.text.primary,
  },
  filterButton: {
    padding: theme.spacing.xs,
  },
  filterIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
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
  bannerContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  bannerCard: {
    width: width - theme.spacing.xl * 2,
    height: 120,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  bannerTitle: {
    fontSize: theme.typography.fontSizes.heading2,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.xs,
  },
  bannerSubtitle: {
    fontSize: theme.typography.fontSizes.bodyLarge,
    fontWeight: theme.typography.fontWeights.medium,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  categoryCard: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.typography.fontSizes.bodySmall,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: 'center',
  },
  flashSaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  flashSaleTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashSaleIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  timerContainer: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  timerText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.bodySmall,
    fontWeight: theme.typography.fontWeights.bold,
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
  bottomSpacing: {
    height: theme.spacing.xxxxl,
  },
});