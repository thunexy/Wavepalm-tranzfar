import React, {Component} from 'react';
import { Dimensions, StyleSheet, View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer';
import Header from './../components/common/header';
import ProgressModal from "../components/common/ProgressModal";
import {recoveryUrl} from "../components/Urls/Urls";



const {width, height} = Dimensions.get("window");
class PasswordRecovery extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
            <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
                                                                          style={{marginLeft: 24, marginRight: 24}}/></TouchableOpacity>
        ),
        headerRight: (
            <View color="#000" name="md-lock" size={30} style={{marginLeft: 24, marginRight: 24}}/>
        )
    });

    state = {
        email: "",
        modalText: "",
        isProgressModalVisible: false,
    };

    setDetails = (key, value) => {
        this.setState(state => {
            return {
                ...state,
                [key]: value
            }
        });

    };

    recoverPassword =  async () => {
        try{
            this.setState({modalText: "Resending code...", isProgressModalVisible: true});
            const response = await fetch(`${recoveryUrl}?email=${this.state.email}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if(!responseJson.bool){
                alert(responseJson.message);
                return;
            }
            this.props.navigation.navigate("PasswordChange");
        }
        catch (e) {
            console.log(e);
        }

    };

    render() {


        return (
            <View style={styles.container}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>


                <Header icon="md-lock" headerText="Forgot Password" riderText="Please provide your email address and we will send you a one-time security code in other for you to reset your password" />


                <TextInput style={styles.inputField} onChangeText={this.setDetails.bind(this, "email")} value={this.state.email} placeholder="Email Address"/>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.recoverPassword()}>
                    <Text style={styles.buttonText}>Request New Password</Text>
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
    buttonContainer:{
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

export default PasswordRecovery;
