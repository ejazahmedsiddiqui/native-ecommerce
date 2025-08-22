import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/themes'

export default function ElevatedCard() {
    return (
        <View>
            <Text style={styles.headingText}>ElevatedCard</Text>
            <ScrollView
                horizontal={true}
                style={styles.container}
               showsHorizontalScrollIndicator={false}
            >
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Tap</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Me</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>To</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Scroll</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>More...</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>:D</Text>
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
    container: {
        padding: 8,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        margin: 2,
    },
    cardElevated: {
        backgroundColor: theme.colors.accent.orange[200],
        elevation: 8,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowColor: 'blue',
        shadowOpacity: 1
    },
})