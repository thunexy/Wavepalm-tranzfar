import React from "react";
import {StyleSheet, FlatList} from "react-native";
import ListItem from "../ListItem/ListItem";
const placeList = (props) => {
    return (<FlatList style={styles.listContainer} data={props.places} renderItem={(snap) => (<ListItem style={styles.listItem} placeName={snap.item.name} placeImage={snap.item.image} onItemPressed={() => props.onItemSelected(snap.item.key)}/>)} />);
};

const styles = StyleSheet.create({
    listContainer:{
        width: "100%",
        marginTop: 10
    },
});
export default placeList;