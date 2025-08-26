import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/themes';

const register = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                Alert.alert('Registration Successful', `Welcome, ${name}!`);
                // Navigate back to login after successful registration
                navigation.navigate('login');
            } else {
                Alert.alert('Error', 'Passwords do not match.');
            }
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                {/* Register Form */}
                <View style={styles.registerBox}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{' '}
                        <Text 
                            style={styles.signInText}
                            onPress={() => navigation.navigate('login')}
                        >
                            Sign in
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
    registerBox: {
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
    input: {
        height: theme.componentSizes.input.height,
        borderColor: theme.colors.border.light,
        borderWidth: 1.5,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.typography.fontSizes.bodyMedium,
        backgroundColor: theme.colors.background.secondary,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    button: {
        height: theme.componentSizes.button.large.height,
        backgroundColor: theme.colors.accent.blue[500],
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.lg,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
        shadowColor: theme.colors.accent.blue[500],
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
    signInText: {
        color: theme.colors.accent.blue[600],
        fontWeight: theme.typography.fontWeights.semibold,
    },
});

export default register;