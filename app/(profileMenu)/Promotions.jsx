import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { theme } from '../../utils/themes';
import { router } from 'expo-router';

const Promotions = () => {

  const navigateToProfile = () => {
    router.replace('/profile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigateToProfile}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payments</Text>
      </View>
      <Text>Promotions</Text>
    </View>
  )
}

export default Promotions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.accent.green[500],
    fontWeight: theme.typography.fontWeights.medium,
  }
})