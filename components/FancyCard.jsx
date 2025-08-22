import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/themes'

export default function FancyCard() {

    const elevatedCard = [
        {
            id: 1,
            uri: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-469786746_super.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75',
            title: 'Hawa Mahal',
            label: 'Pink City, Jaipur',
            description: "The Hawa Mahal is a palace in the city of Jaipur, Rajasthan, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers",
            footer: "12km away",
        },
        {
            id: 2,
            uri: 'https://media.architecturaldigest.com/photos/67acb9b0339bcbaaadeb91b5/1:1/w_4000,h_4000,c_limit/GettyImages-873536102.jpg',
            title: 'Taj Mahal',
            label: 'Agra',
            description: "The Taj Mahal is a white marble mausoleum in Agra, India, built by Mughal emperor Shah Jahan between 1631 and 1648 as a tomb for his favorite wife, Mumtaz Mahal.",
            footer: "5km away",
        },
        {
            id: '3',
            title: 'Red Fort',
            label: 'Delhi',
            description: 'The Red Fort is a historic fortified palace of the Mughal emperors of India, located in the center of the old city of Delhi. Every year on India\'s Independence Day, the Prime Minister hoists the Indian flag at the main gate of the fort and delivers a nationally broadcast speech from its ramparts.',
            uri: 'https://img.indiahighlight.com/1170x550/ih/uploads/1696599198.jpg',
            footer: "5km away"
        }

    ];

    const renderCard = ({ item }) => (
        <View style={[styles.card, styles.cardElevated]}>
            <Image
                source={{ uri: item.uri }}
                style={styles.cardImage}
            />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardDescription} numberOfLines={4}>{item.description}</Text>
                <Text style={styles.cardFooter}>{item.footer}</Text>
            </View>
        </View>

    );

    return (
        <View style={styles.fancyCard}>
            <Text style={styles.headingText}>Trending Places</Text>
            <FlatList
                data={elevatedCard}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                initialNumToRender={2}
                maxToRenderPerBatch={3}
                windowSize={5}
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    fancyCard: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 20, // Add some padding at the bottom
    },
    card: {
        width: 350,
        // Removed fixed height - let it size to content
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 12,
        alignSelf: 'center', // Center the cards horizontally
    },
    cardElevated: {
        backgroundColor: theme.colors.accent.blue[200],
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover', // Ensure proper image scaling
    },
    cardBody: {
        paddingHorizontal: 12,
        paddingVertical: 12, // Add vertical padding
    },
    cardTitle: {
        color: theme.colors.neutral[900],
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    cardLabel: {
        fontSize: 16,
        color: theme.colors.neutral[700],
        marginBottom: 6,
    },
    cardDescription: {
        fontSize: 14,
        color: theme.colors.neutral[600],
        marginBottom: 12, // Increased margin
        lineHeight: theme.typography.lineHeights.bodySmall,
        // Removed padding - it's redundant with cardBody padding
    },
    cardFooter: {
        color: theme.colors.neutral[800],
        fontSize: 14,
        fontWeight: '500',
    },
})