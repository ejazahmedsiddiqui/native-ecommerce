import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { theme } from '../utils/themes';
import FlatCard from '../components/FlatCard';
import ElevatedCard from '../components/ElevatedCard';
import FancyCard from '../components/FancyCard';

const cardWrapper = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Card Wrapper</Text>
                <FlatCard />
                <ElevatedCard />
                <FancyCard />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
        marginTop: StatusBar.currentHeight || 0,
        paddingTop: theme.spacing.md,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    }
})
export default cardWrapper