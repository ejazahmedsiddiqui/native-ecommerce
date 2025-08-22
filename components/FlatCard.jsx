import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { theme } from '../utils/themes'
import React from 'react'
export default function FlatCard() {
    return (
        <View>
            <Text style={styles.headingText}>FlatCard</Text>
            <ScrollView
                horizontal={true}
                style={styles.container}
                showsHorizontalScrollIndicator={false}
            >
                <View style={[styles.card, styles.cardOne]}>
                    <Text style={styles.cardTitle}>Red</Text>
                </View>
                <View style={[styles.card, styles.cardTwo]}>
                    <Text style={styles.cardTitle}>Blue</Text>
                </View>
                <View style={[styles.card, styles.cardThree]}>
                    <Text style={styles.cardTitle}>Green</Text>
                </View>
                <View style={[styles.card, styles.cardFour]}>
                    <Text style={styles.cardTitle}>Yellow</Text>
                </View>
                <View style={[styles.card, styles.cardFive]}>
                    <Text style={styles.cardTitle}>Orange</Text>
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
        flexDirection: 'row',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 4,
        marginLeft: 8,
    },
    cardOne: {
        backgroundColor: theme.colors.accent.blue[500],
    },
    cardTwo: {
        backgroundColor: theme.colors.accent.red[500],

    },
    cardThree: {
        backgroundColor: theme.colors.accent.green[500],

    },
    cardFour: {
        backgroundColor: theme.colors.accent.yellow[500],

    },
    cardFive: {
        backgroundColor: theme.colors.accent.orange[500],

    },
    cardTitle: {
        color: 'white',
    }
})