import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Create a proper React component instead of exporting a useCallback
const Coupons = ({ item }) => {
  // Only render if item status is Active
  if (item.status !== 'Active') {
    return null;
  }

  return (
    <TouchableOpacity style={styles.couponCard} activeOpacity={0.8}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardCode}>{item.code}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {item.discountType === "Fixed" && "$"}{item.discountValue}{item.discountType === "Percentage" && "%"}
              </Text>
              <Text style={styles.offText}>OFF</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.cardFooter}>
            <View style={styles.minOrderSection}>
              <Text style={styles.minOrderLabel}>Min. Order Amount</Text>
              <Text style={styles.minOrderAmount}>${item.minOrderAmount}</Text>
            </View>
            <View style={styles.expirySection}>
              <Text style={styles.expiryLabel}>Expires on</Text>
              <Text style={styles.expiryDate}>
                {new Date(item.expiryDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Decorative circular cuts */}
        <View style={styles.leftCircle} />
        <View style={styles.rightCircle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  couponCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  discountBadge: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  discountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  offText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
    marginHorizontal: -20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  minOrderSection: {
    flex: 1,
  },
  minOrderLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  minOrderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expirySection: {
    alignItems: 'flex-end',
  },
  expiryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  leftCircle: {
    position: 'absolute',
    left: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    transform: [{ translateY: -10 }],
  },
  rightCircle: {
    position: 'absolute',
    right: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    transform: [{ translateY: -10 }],
  },
});

export default Coupons;