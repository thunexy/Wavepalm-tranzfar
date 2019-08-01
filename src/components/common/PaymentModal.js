import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Button, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {COLOR} from "../../Colors/Colors";

export default class PaymentModal extends Component {

    render() {

        return (

            <Modal visible={this.props.isVisible} transparent={true}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.modalOverlay}/>
                    <View style={styles.modalBox}>
                        <Icon name="md-checkmark-circle" size={90} color={COLOR.AppGreenColor}/>
                        <Text>Successful transaction</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.props.goToPage}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
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
        minHeight: 200,
        minWidth: 200,
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderRadius: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        width: 240,
        backgroundColor: "#49add3",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 4,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 24,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});

