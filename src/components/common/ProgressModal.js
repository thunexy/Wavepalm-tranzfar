import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Image} from "react-native";

export default class ProgressModal extends Component {

    render() {

        return (

            <Modal visible={this.props.isVisible} transparent={true}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.modalOverlay}/>
                    <View style={styles.modalBox}>
                        <Image style={{width:40, height: 40}} source={require("../../assets/loader.gif")}/>
                        <Text style={{fontSize: 15}}>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>


        )
    }

};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "#000",
        opacity: 0.4,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalBox: {
        backgroundColor: "#fff",
        minHeight: 80,
        minWidth: 230,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    }
});

