import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const Product = ({ item, onCalculateDiscount }) => {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.category}>{item.category} • {item.brand}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.originalPrice}>${item.oldPrice}</Text>
          <Text style={styles.discount}>
            {onCalculateDiscount(item.oldPrice, item.price)}% OFF
          </Text>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
          {item.isNew && <Text style={styles.newBadge}>NEW</Text>}
        </View>
      </View>
    </View>
  )
}

export default React.memo(Product);

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: '#27ae60',
    backgroundColor: '#d5f4e6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
  },
  stock: {
    fontSize: 12,
    color: '#666',
  },
  newBadge: {
    fontSize: 12,
    color: '#e74c3c',
    backgroundColor: '#ffebee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
})