import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ShoppingCartIcon() {
  const navigation = useNavigation();
  const itemCount = useSelector(state => state.product.count);
  const animatedValue = new Animated.Value(0);

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  useEffect(() => {
    if (itemCount > 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        animatedValue.setValue(0);
      });
    }
  }, [animatedValue, itemCount]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Carts')}>
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{itemCount}</Text>
      </Animated.View>
      <Icon name="cart" size={32} color={'black'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  container: {
    position: 'absolute',
    backgroundColor: '#00FF00',
    width: 24,
    height: 24,
    borderRadius: 12,
    right: 16,
    bottom: 10,
    zIndex: 1000000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
