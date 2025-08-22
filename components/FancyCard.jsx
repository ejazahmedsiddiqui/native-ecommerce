import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/themes'

export default function FancyCard() {
    return (
        <View style={styles.fancyCard}>
            <Text style={styles.headingText}>Trending Places</Text>
            <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.card, styles.cardElevated]}>
                    <Image
                        source={{
                            uri: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-469786746_super.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75'
                        }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>Hawa Mahal</Text>
                        <Text style={styles.cardLabel}>Pink City, Jaipur</Text>
                        <Text style={styles.cardDescription}>The Hawa Mahal is a palace in the city of Jaipur, Rajasthan, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers</Text>
                        <Text style={styles.cardFooter}>12km Away</Text>
                    </View>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Image
                        source={{
                            uri: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-469786746_super.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75'
                        }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>Hawa Mahal</Text>
                        <Text style={styles.cardLabel}>Pink City, Jaipur</Text>
                        <Text style={styles.cardDescription}>The Hawa Mahal is a palace in the city of Jaipur, Rajasthan, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers</Text>
                        <Text style={styles.cardFooter}>12km Away</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8,
    },
    fancyCard: {
        flex: 1, // Add this
    },
    card: {
        width: 350,
        height: 360, // Fixed typo
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 12,
    },
    cardElevated: {
        backgroundColor: theme.colors.accent.blue[200],
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        }
    },
    cardImage: {
        height: 180,
        marginBottom: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardBody: {
        flexGrow: 1,
        paddingHorizontal: 12,
    },
    cardTitle: {
        color: theme.colors.neutral[900],
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    cardLabel: {
        fontSize: 16,
        color: theme.colors.neutral[700], // Fixed typo
        marginBottom: 6,
        flexShrink: 1
    },
    cardDescription: {
        padding: 15,
        fontSize: 14,
        color: theme.colors.neutral[600],
        marginBottom: 4,
        lineHeight: theme.typography.lineHeights.bodySmall,
    },
    cardFooter: {
        color: theme.colors.neutral[800],
        marginBottom: 8,
    },
})