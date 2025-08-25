import React from 'react';
import {
    Dimensions,
    FlatList,
    Platform,
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
import { theme } from '../../utils/themes';
import logo from '../../assets/images/favicon.png'
import { router } from 'expo-router';


const { width, height } = Dimensions.get('window');

const SignIn = () => {

    const menuItems = [
        { id: 1, label: 'login', text: 'Login to Your Account' },
        { id: 2, label: 'register', text: 'Create an Accound' },
        { id: 3, label: 'guest' },
    ]
    const handleMenuPress = (label) => {
        if (label === 'login') {
            router.push('/(auth)/login');
        } else if (label === 'register') {
            router.push('/(auth)/register');
        } else if (label === 'guest') {
            router.push('/(auth)/guest');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoPlaceholder}>
                            <Image source={logo} />
                        </View>
                    </View>
                    <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                    <Text style={styles.welcomeSubtitle}>Sign in to continue shopping</Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[styles.button, styles.primaryButton]}
                            activeOpacity={0.8}
                            onPress={() => handleMenuPress(menuItems[0].label)} // Add arrow function
                        >
                            <Text style={styles.primaryButtonText}>{menuItems[0].text}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            activeOpacity={0.8}
                            onPress={() => handleMenuPress(menuItems[1].label)} // Add arrow function
                        >
                            <Text style={styles.secondaryButtonText}>{menuItems[1].text}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.divider} />
                    </View>
                    <TouchableOpacity
                        style={styles.guestButton}
                        activeOpacity={0.4}
                        onPress={() => handleMenuPress('guest')} // Add this onPress handler
                    >
                        <Text style={styles.guestButtonText}>Continue as Guest</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.linkText}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral[100],
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        paddingTop: height * 0.08,
        paddingBottom: 40,
    },
    logoContainer: {
        marginBottom: 32,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.accent.blue[400],
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.accent.blue[700],
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: theme.typography.fontWeights.extrabold,
        color: theme.colors.neutral[800],
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: theme.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 24,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    buttonContainer: {
        marginBottom: 32,
    },
    button: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: theme.colors.border.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButton: {
        backgroundColor: theme.colors.accent.blue[600],
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.neutral[50],
        letterSpacing: 0.5,
    },
    secondaryButton: {
        backgroundColor: theme.colors.background.tertiary,
        borderWidth: 2,
        borderColor: theme.colors.accent.blue[400],
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.accent.blue[800],
        letterSpacing: 0.5,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    guestButton: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: theme.colors.background.tertiary,
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
    },
    guestButtonText: {
        fontSize: 15,
        color: theme.colors.text.secondary,
        fontWeight: '500',
    },
    footer: {
        paddingBottom: 32,
        paddingTop: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 16,
    },
    linkText: {
        color: theme.colors.accent.blue[800],
        fontWeight: theme.typography.fontWeights.bold,
    },
});