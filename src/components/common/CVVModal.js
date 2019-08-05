import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, TouchableOpacity, TextInput} from "react-native";
import {COLOR} from "../../Colors/Colors";

export default class PaymentModal extends Component {

    state = {
        cvv: null,
    };

    setCVV = (value) => this.setState({cvv: value});

    render() {

        return (

            <Modal visible={this.props.isVisible} transparent={true}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={this.props.cancel} style={styles.modalOverlay}/>
                    <View style={styles.modalBox}>
                        <Text style={{alignSelf: "flex-start"}}>Enter the 3-digit CVV at the back of your card</Text>
                        <View style={{flex: 1, flexDirection: "row", marginVertical: 16}}>
                            <TextInput onChangeText={this.setCVV} value={this.state.cvv} maxLength={3}
                                       keyboardType={"numeric"} style={
                                {
                                    width: 100,
                                    height: 40,
                                    textAlign: "center",
                                    borderRadius: 10,
                                    borderColor: COLOR.InputGreyBorderColor,
                                    borderWidth: 1
                                }}/>
                            <TouchableOpacity style={styles.buttonContainer}
                                              onPress={()=>this.props.checkCard(this.state.cvv)}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>

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
        opacity: 0.6,
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
        minHeight: 130,
        minWidth: 200,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: "#49add3",
        height: 40,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});

