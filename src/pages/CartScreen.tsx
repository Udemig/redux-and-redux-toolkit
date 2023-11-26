import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {IProductResponse} from '../redux/types/types';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_TO_CART,
  FETCH_TO_CART,
  FETCH_TO_PRODUCT,
} from '../redux/actions/actionTypes';
import {useNavigation} from '@react-navigation/native';
import Seperator from '../components/Seperator';

export default function ProductScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector(state => state?.product.products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/5')
      .then(response => response?.json())
      .then((payload: IProductResponse) => {
        dispatch({type: FETCH_TO_CART, payload});
      })
      .catch(error => console.error('Error fetching product ', error));
  }, [dispatch]);

  return (
    <View>
      <FlatList<IProductResponse>
        data={products}
        keyExtractor={item => item?.id.toString()}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', {product: item})
              }>
              <View style={styles.itemContainer}>
                <Image
                  source={{uri: item.image}}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
                <View style={styles.metaContainer}>
                  <Text style={styles.title} numberOfLines={3}>
                    {item?.title}
                  </Text>
                  <Text style={styles.description}>by {item?.category}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  thumbnail: {width: 100, height: 150},
  itemContainer: {flexDirection: 'row', padding: 10},
  metaContainer: {
    padding: 5,
    paddingLeft: 10,
  },
  title: {fontSize: 16, fontWeight: 'bold', width: '44%'},
  description: {fontSize: 12, fontWeight: '400', marginTop: 10},
  buttonContainer: {
    position: 'absolute',
    top: 110,
    right: 10,
  },
  button: {backgroundColor: '#24a0ed', borderRadius: 10, padding: 5},
  buttonText: {fontSize: 20, color: '#fff'},
});
