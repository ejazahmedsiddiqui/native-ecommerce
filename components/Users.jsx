import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { theme } from '../utils/themes';
import { useCallback } from 'react';
const Users = ({ item }) => {
    return (
        <View style={[styles.userCard, item.status === 'Active' ? styles.activeStatus : styles.inactiveStatus]}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.8}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={[item.status === 'Active' ? styles.usernameActive : styles.usernameInactive]}>@{item.username}</Text>
                </View>

                {/* Contact Section */}
                <View style={styles.section}>
                    <Text style={item.status === 'Active' ? styles.sectionTitleActive : styles.sectionTitleInactive}>
                        <AntDesign name="contacts" size={24} color="black" /> Contact</Text>
                    <View style={styles.contact}>
                        <Text style={styles.contactText}>{item.email}</Text>
                        <Text style={styles.contactText}>{item.phone}</Text>
                        <Text style={styles.contactText}>{item.website}</Text>

                    </View>

                </View>

                {/* Address Section */}
                <View style={styles.section}>
                    <Text style={item.status === 'Active' ? styles.sectionTitleActive : styles.sectionTitleInactive}><SimpleLineIcons name="location-pin" size={24} color="black" /> Address</Text>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>{item.address.street}, {item.address.suite}</Text>
                        <Text style={styles.addressText}>{item.address.city} - {item.address.zipcode}</Text>
                    </View>
                </View>

                {/* Company Section */}
                <View style={styles.section}>
                    <Text style={item.status === 'Active' ? styles.sectionTitleActive : styles.sectionTitleInactive}><FontAwesome5 name="building" size={24} color="black" /> Company</Text>
                    <View style={styles.company}>

                        <Text style={styles.companyName}>{item.company.name}</Text>
                        <Text style={styles.catchPhrase}>"{item.company.catchPhrase}"</Text>
                        <Text style={styles.businessText}>{item.company.bs}</Text>
                    </View>
                </View>

                {/* Status Section */}
                <View style={styles.statusSection}>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.role}</Text>
                    </View>
                    <View style={[styles.statusBadge, item.status === 'Active' ? styles.activeStatus : styles.inactiveStatus]}>
                        <Text style={item.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive}>{item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    userCard: {
        backgroundColor: theme.colors.background.primary,
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        elevation: 4,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
    },
    cardContent: {
        padding: 20,
    },
    headerSection: {
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.black,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    usernameActive: {
        fontSize: 16,
        color: theme.colors.text.secondary,
        fontStyle: 'italic',
    },
    usernameInactive: {
        fontSize: 16,
        color: theme.colors.text.inverse,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitleActive: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.secondary,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    sectionTitleInactive: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.inverse,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    contact: {
        backgroundColor: theme.colors.accent.red[50],
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.accent.blue[800],
    },
    contactText: {
        fontSize: 14,
        color: theme.colors.text.primary,
        marginBottom: 4,
        paddingLeft: 8,
    },
    addressContainer: {
        backgroundColor: theme.colors.accent.orange[50],
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.accent.blue[500]
    },
    addressText: {
        fontSize: 14,
        color: '#2c3e50',
        marginBottom: 2,
    },
    company: {
        backgroundColor: theme.colors.accent.green[50],
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.accent.blue[900]
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2980b9',
        marginBottom: 6,
        paddingLeft: 8,
    },
    catchPhrase: {
        fontSize: 14,
        color: '#27ae60',
        fontStyle: 'italic',
        marginBottom: 4,
        paddingLeft: 8,
    },
    businessText: {
        fontSize: 12,
        color: '#7f8c8d',
        textTransform: 'capitalize',
        paddingLeft: 8,
    },
    statusSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#ecf0f1',
        minWidth: 80,
        alignItems: 'center',
    },
    activeStatus: {
        backgroundColor: theme.colors.background.tertiary,
        borderColor: 'black',
        borderWidth: 2
    },
    inactiveStatus: {
        backgroundColor: theme.colors.error,
        borderColor: 'white',
        borderWidth: 2
    },
    statusTextActive: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statusTextInactive: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text.inverse,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

})