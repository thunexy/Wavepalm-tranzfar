import React, {Component} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
} from "react-native";
import {CheckBox} from "react-native-elements";
import Footer from './../components/common/footer';
import Header from './../components/common/header';
import Dropdown from './../components/common/Dropdown';
import SubmitButton from './../components/common/SubmitButton';
import {COLOR} from "../Colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import {europeanCountries} from "../components/common/countries";
import ProgressModal from "../components/common/ProgressModal";
import {connect} from "react-redux";
import {checkUserDetails} from "../store/actions/auth";
import {saveRecipientUrl} from "../components/Urls/Urls";


class AddSendMoneyEuropeRecipient extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon color="#000" name="md-menu" size={30} style={{
                        marginLeft: 24,
                        marginRight: 24
                    }}/>
                </TouchableOpacity>
            ),
            headerRight: (
                <View color="#000" name="md-menu" size={30} style={{marginLeft: 24, marginRight: 24}}/>
            ),
        }

    };
    state = {
        country: this.props.navigation.getParam("state").selectedCountry,
        accountNumber: "",
        bank: "",
        fullName: "",
        onboarding: true,
        isProgressModalVisible: false,
        modalText: "",
        recipientEmail: "",
    };

    saveRecipient = async () => {
        if (this.state.country.name && this.state.recipientEmail) {
            try {
                this.setState({modalText: "Saving recipient...", isProgressModalVisible: true});
                const response = await fetch(`${saveRecipientUrl}?type=w&owneremail=${this.props.email}&recipientemail=${this.state.recipientEmail}`);
                const responseJson = await response.json();
                this.setState({isProgressModalVisible: false});
                alert(responseJson.message);
                if (!responseJson.bool) {
                    return;
                }
                this.props.navigation.navigate("SendMoneyEstimate");
            }
            catch (error) {
                this.setState({isProgressModalVisible: false});
                alert(error.message);
            }
        }
        else {
            alert("All fields are required!");
        }

    };

    textChange = (key, value) => {
        this.setState({[key]: value});
    };




    render() {

        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>
                        <Header icon="md-contact" backButtonAction={"SendMoneyEstimate"}
                                navigation={this.props.navigation} headerText="Add Recipient"/>
                        <View style={{width: "100%"}}>

                            {/*<Dropdown*/}
                                {/*line*/}
                                {/*width="100%"*/}
                                {/*selectedValue={this.state.country}*/}
                                {/*onValueChange={(itemValue, itemIndex) =>*/}
                                    {/*this.setState({country: itemValue})*/}
                                {/*}*/}
                                {/*items={europeanCountries}*/}
                            {/*/>*/}



                            <TextInput
                                id="country"
                                placeholder="Country"
                                value={`Country: ${this.state.country.name}`}
                                editable={false}
                                style={[styles.inputField, {color: "#000"}]}
                            />
                            <TextInput
                                id="email"
                                placeholder="Email *"
                                value={this.state.recipientEmail}
                                keyboardType={"email-address"}
                                onChangeText={this.textChange.bind(this, "recipientEmail")}
                                style={styles.inputField}
                            />

                            <View style={{flexDirection: "row"}}>

                                <SubmitButton
                                    title="Save Recipient"
                                    color="#49add3"
                                    textColor="white"
                                    onPress={this.saveRecipient}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

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
        justifyContent: "flex-start",
        marginBottom: 60
    },
    footer: {
        paddingTop: 10,
        paddingBottom: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff"
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
const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
};

export default connect(mapStateToProps)(AddSendMoneyEuropeRecipient);
