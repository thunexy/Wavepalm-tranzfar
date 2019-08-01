import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import PlaceList from "./../../src/components/PlaceList/PlaceList";
import PlaceInput from "./../../src/components/PlaceInput/PlaceInput";
import PlaceDetail from "./../../src/components/PlaceDetail/PlaceDetail";
import {addPlace, selectPlace, deselectPlace, deletePlace} from "./../../src/store/actions/index";
import {connect} from "react-redux";



class OtherScreen extends Component {


    placeAddedHandler = (placeName) => {
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = (key) => {
        this.props.onSelectPlace(key);

    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    };


    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    };


    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail selectedPlace={this.props.selectedPlace} onItemDeleted={this.placeDeletedHandler}
                             onModalClosed={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler}/>
                <Button title="Go to new Screen" color="red" onPress={() => this.props.navigation.navigate("Home")}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
        alignItems: 'center',
        justifyContent: "flex-start"
    },


});


const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherScreen);

