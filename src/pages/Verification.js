import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Button, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer';
import Header from './../components/common/header';
import ProgressModal from "../components/common/ProgressModal";
import {resendVerificationUrl, verificationUrl} from "../components/Urls/Urls";


const {width, height} = Dimensions.get("window");

class Verification extends Component {
    state = {
        code: null,
        isProgressModalVisible: false,
        modalText: "",
    };
    static navigationOptions = ({navigation}) => ({
        headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
            <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
                                                                            style={{marginLeft: 24, marginRight: 24}}/></TouchableOpacity>
        ),
        headerRight: (
            <View color="#000" name="md-lock" size={30} style={{marginLeft: 24, marginRight: 24}}/>
        )
    });

    verifyEmail = async () => {
        try{
            this.setState({modalText: "Verifying...", isProgressModalVisible: true});
            const response = await fetch(`${verificationUrl}?code=${this.state.code}&email=${this.props.navigation.getParam('email', 'NA')}`);

            const responseJson = await response.json();
            if (responseJson.bool) {
                this.props.navigation.navigate("Melissa");
            }
            this.setState({isProgressModalVisible: false});
            alert(responseJson.message);
        }
        catch (e) {
            console.log(e);
        }

    };

    resendVerificationCode = async () => {
        try{
            this.setState({modalText: "Resending code...", isProgressModalVisible: true});
            const response = await fetch(`${resendVerificationUrl}?email=${this.props.navigation.getParam('email', null)}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            alert(responseJson.message);
        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            alert(e.message);
        }

    };



    render() {


        return (
            <View style={styles.container}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>
                <Header icon="md-lock" headerText="Verify Account"
                        riderText="Please enter the code that was sent to your email address"/>


                <TextInput keyboardType={"numeric"} onChangeText={(code) => this.setState({code})}
                           value={this.state.code} style={styles.inputField} placeholder="Email Code"/>
                {/*<TextInput style={styles.inputField} placeholder="Phone Code"/>*/}
                <TouchableOpacity
                    onPress={() => this.resendVerificationCode()}
                    style={{alignSelf: "center", marginBottom: 5}}
                >
                    <Text style={styles.passcodeText}>Resend code</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.verifyEmail()}>
                    <Text style={styles.buttonText}>Verify Account</Text>
                </TouchableOpacity>


                <View style={styles.footer}>
                    <Footer/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    footer: {
        position: "absolute",
        top: height - 100,
    },
    inputField: {
        width: "100%",
        height: 42,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 2,
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: 16
    },
    passcodeText: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        fontSize: 16,
        color: "#49add3",
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

export default Verification;
