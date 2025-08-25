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

const categories = [
    { id: '1', name: 'Electronics', icon: '📱', color: theme.colors.accent.blue[500] },
    { id: '2', name: 'Fashion', icon: '👕', color: theme.colors.accent.orange[500] },
    { id: '3', name: 'Home', icon: '🏠', color: theme.colors.accent.green[500] },
    { id: '4', name: 'Sports', icon: '⚽', color: theme.colors.accent.yellow[500] },
    { id: '5', name: 'Beauty', icon: '💄', color: theme.colors.accent.red[500] },
    { id: '6', name: 'Books', icon: '📚', color: theme.colors.primary500 },
];

const Category = () => {

    const renderCategory = ({ item }) => (
        <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.color }]}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
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
})