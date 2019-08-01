import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

class PlaceInput extends Component {
    state = {
        placeName: ""
    };

    placeNameChangedHandler = (val) => {
        this.setState({
                placeName: val
            }
        )
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        this.props.onPlaceAdded(this.state.placeName);
        this.setState({placeName: ""});
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.placeInput} value={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
                <Button style={styles.placeButton} onPress={this.placeSubmitHandler} title="Add"/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    placeInput: {
        width: "80%",
        borderColor: "#000",
        borderWidth: 1
    },
    placeButton: {
        width: "20%",
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default PlaceInput;