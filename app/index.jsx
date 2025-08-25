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
import { theme } from '../utils/themes';
import FeaturedProducts from '../components/FeaturedProducts'
import Category from '../components/Category'

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
        <Category />

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
        <FeaturedProducts />

        {/* Recommended Section */}
        <FeaturedProducts />

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 20,
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
  bottomSpacing: {
    height: theme.spacing.xxxxl,
  },
});