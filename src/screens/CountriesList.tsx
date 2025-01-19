import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {countries} from '../constants/countries';
import Snackbar from 'react-native-snackbar';

const CountriesList = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState(0);

  const buttonPressed = (targetValue: any) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter value to convert',
        backgroundColor: '#EA7773',
        textColor: '#00000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    const exchangeRate = parseFloat(targetValue.exchangeRate);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * exchangeRate;
      setResultValue(convertedValue);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          maxLength={14}
          clearButtonMode="always"
          keyboardType="number-pad"
          placeholder="Enter amount in Rupees"
          onChangeText={setInputValue}
          value={inputValue}
        />

        {resultValue ? (
          <Text style={styles.result}>
            {' '}
            Converted Value is - {resultValue.toFixed(3)}
          </Text>
        ) : (
          ''
        )}

        <FlatList
          data={countries}
          keyExtractor={item => item.name}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <Pressable
              style={styles.itemContainer}
              onPress={() => buttonPressed(item)}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.exchangeRate}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CountriesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#6A89CC',
    marginVertical: 25,
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: '#487EB0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  result: {
    color: 'purple',
    fontWeight: 'bold',
  },
});
