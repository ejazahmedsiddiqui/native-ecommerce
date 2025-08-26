import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '../../utils/themes';

const { width } = Dimensions.get('window');

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleLogin = () => {
        if (email && password) {
            console.log('Attempting to navigate to index...');
            router.replace('/');
            Alert.alert('Login Successful', `Welcome, ${email}!`);
        } else {
            Alert.alert('Error', 'Please enter email and password.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.subtitle}>Sign in to your account</Text>
                </View>

                {/* Login Form */}
                <View style={styles.loginBox}>
                    <View style={styles.form}>
                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    isEmailFocused && styles.inputFocused,
                                    email && styles.inputFilled
                                ]}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.colors.text.tertiary}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    isPasswordFocused && styles.inputFocused,
                                    password && styles.inputFilled
                                ]}
                                placeholder="Enter your password"
                                placeholderTextColor={theme.colors.text.tertiary}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                            />
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                (email && password) ? styles.buttonActive : styles.buttonInactive
                            ]}
                            onPress={handleLogin}
                            disabled={!email || !password}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text
                            style={styles.signUpText}
                            onPress={() => router.push('/(auth)/register')}
                        >
                            Sign up
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.xl,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxxxl,
    },
    welcomeText: {
        fontSize: theme.typography.fontSizes.heading1,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.typography.fontSizes.bodyLarge,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    loginBox: {
        backgroundColor: theme.colors.background.primary,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xxl,
        ...theme.shadows.lg,
        shadowColor: theme.colors.neutral[900],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 8,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
    },
    form: {
        gap: theme.spacing.lg,
    },
    inputContainer: {
        marginBottom: theme.spacing.md,
    },
    inputLabel: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    input: {
        height: theme.componentSizes.input.height,
        borderColor: theme.colors.border.light,
        borderWidth: 1.5,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.typography.fontSizes.bodyMedium,
        backgroundColor: theme.colors.background.secondary,
        color: theme.colors.text.primary,
        transition: 'all 0.2s ease',
    },
    inputFocused: {
        borderColor: theme.colors.accent.blue[500],
        backgroundColor: theme.colors.background.primary,
        shadowColor: theme.colors.accent.blue[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
    },
    inputFilled: {
        backgroundColor: theme.colors.background.primary,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    forgotPasswordText: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.accent.blue[600],
        fontWeight: theme.typography.fontWeights.medium,
    },
    button: {
        height: theme.componentSizes.button.large.height,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.lg,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    buttonActive: {
        backgroundColor: theme.colors.accent.blue[500],
        shadowColor: theme.colors.accent.blue[500],
    },
    buttonInactive: {
        backgroundColor: theme.colors.neutral[300],
        shadowColor: theme.colors.neutral[400],
    },
    buttonText: {
        color: theme.colors.text.inverse,
        fontSize: theme.typography.fontSizes.bodyLarge,
        fontWeight: theme.typography.fontWeights.semibold,
    },
    footer: {
        alignItems: 'center',
        marginTop: theme.spacing.xxxxl,
    },
    footerText: {
        fontSize: theme.typography.fontSizes.bodyMedium,
        color: theme.colors.text.secondary,
    },
    signUpText: {
        color: theme.colors.accent.blue[600],
        fontWeight: theme.typography.fontWeights.semibold,
    },
});

export default login;