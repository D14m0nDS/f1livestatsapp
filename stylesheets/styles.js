import {Platform, StatusBar, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#332B30',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  searchBar: {
    backgroundColor: '#231E24',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  item: {
    backgroundColor: '#5E4A4A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  standings_item: {

    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#332B30',
  },

});

export default styles;