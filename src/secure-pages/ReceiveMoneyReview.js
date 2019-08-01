import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Picker,
    ScrollView,
    DatePickerAndroid,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer';
import Header from './../components/common/header';
import {COLOR} from "../Colors/Colors";
import {CheckBox} from "react-native-elements";
import {NativeModules} from "react-native";
import {fetchSendRecipients} from "../components/Urls/Urls";
import {fetchSavedRecipientsModalText} from "../components/Strings/Strings";
import ProgressModal from "../components/common/ProgressModal";

const {width, height} = Dimensions.get("window");

class ReceiveMoneyReview extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
                                                                                style={{
                                                                                    marginLeft: 24,
                                                                                    marginRight: 24
                                                                                }}/></TouchableOpacity>
            ),
            headerRight: (
                <View color="#000" name="md-menu" size={30} style={{marginLeft: 24, marginRight: 24}}/>
            ),
        }

    };

    setCountry = (country, i) => {
        this.setState({selectedCountry: this.state.countries[i]});
    };


    setRecipient = (country, i) => {

        this.setState({selectedRecipient: this.state.recipients[i], isRecipientSelected: !(i === 0)});
    };

    state = {
        selectedCountry: [],
        receiveCurrency: this.props.navigation.getParam("state").receiveCurrency,
        sendCurrency: this.props.navigation.getParam("state").sendCurrency,
        recipients: [{name: "Select Recipient"}],
        selectedRecipient: {},
        countries: [{code: 0, country: "Select Receiver Country"}, {
            code: 1,
            short: "GBP",
            country: "United Kingdom"
        }, {
            code: 234,
            short: "USD",
            country: "United States"
        }],
    };



    loadRecipient = async () => {
        //load the recipients attached to the user
        const recipientCountryJson = this.props.navigation.getParam("state").selectedReceiveCountry;
        try {
            this.setState({modalText: fetchSavedRecipientsModalText, isProgressModalVisible: true});
            const response = await fetch(`${fetchSendRecipients}?type=w&ownerEmail=${this.state.email}&country=${recipientCountryJson.name}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                alert(responseJson.message);
                return;
            }
            this.setState({recipients: [this.state.recipients, ...responseJson.data]});


        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            console.log(e);
        }

    };


    componentDidMount() {
        this.props.navigation.getParam("state").selectedPaymentType.i === 2 && this.loadRecipient();
    };


    render() {
        const {navigation} = this.props;
        const recipientsDropdown = this.state.recipients.map((recipient, i) => {
            if (i === 0) {

                return (
                    <Picker.Item key={i} label={`Select Recipient:`} value={null}/>
                )
            }
            return (
                <Picker.Item key={i}
                             label={`${recipient.name} (${(recipient.bank) ? recipient.bank + " - " + recipient.acc_no : recipient.country})`} value={recipient.name}/>
            )
        });
        return (

            <View style={{flex: 1}}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>

                <ScrollView>
                    <View style={styles.container}>
                        <Header icon="md-calculator" backButtonAction={"ReceiveMoneyEstimate"}
                                navigation={this.props.navigation} replace={false} headerText="Receive Money"
                                riderText="Enter an amount in either field."/>


                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {navigation.getParam("state").sendCurrency}
                            </Text>
                            <TextInput style={styles.inputField} editable={false}
                                       value={navigation.getParam("state").sendAmount} placeholder="Send Amount"/>
                        </View>
                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {navigation.getParam("state").receiveCurrency}
                            </Text>
                            <TextInput style={styles.inputField} editable={false}
                                       value={`${navigation.getParam("state").receiveAmount || ""}`}
                                       placeholder="Receive Amount"/>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text style={{width: "50%", textAlign: "left", fontSize: 16,}}>Transfer Rate </Text>
                            <Text editable={false} style={{
                                width: "50%",
                                textAlign: "right",
                                fontSize: 16
                            }}>{navigation.getParam("state").transferRate}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text style={{width: "50%", textAlign: "left", fontSize: 16,}}>Transfer fee </Text>
                            <Text editable={false} style={{
                                width: "50%",
                                textAlign: "right",
                                fontSize: 16
                            }}>{navigation.getParam("state").transferFee}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text style={{width: "50%", textAlign: "left", fontSize: 16,}}>Total cost </Text>
                            <Text editable={false} style={{
                                width: "50%",
                                textAlign: "right",
                                fontSize: 16
                            }}>{navigation.getParam("state").receiveCurrency} {navigation.getParam("state").totalAmount}</Text>
                        </View>


                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 16,
                            height: 42,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <TextInput style={{color: "#000", width: "70%", height: 42, fontSize: 16}}
                                       placeholder="Promo Code"/>
                            <Text onPress={() => {
                            }} style={{width: "30%", textAlign: "center", color: COLOR.AppBlueColor, fontSize: 15}}>Apply
                                Code</Text>
                        </View>

                        {

                            navigation.getParam("state").selectedPaymentType.i === 2 &&

                            <View style={{
                                width: "100%",
                                paddingHorizontal: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                height: 42,
                                borderBottomWidth: 2,
                                borderBottomColor: COLOR.InputGreyBorderColor
                            }}>
                                <Picker style={{color: "#000", width: "70%",}}
                                        selectedValue={`${this.state.selectedRecipient.name}`}
                                        onValueChange={this.setRecipient}>

                                    {recipientsDropdown}

                                </Picker>
                                <Text
                                    onPress={() => this.props.navigation.replace((navigation.getParam("state").selectedCountry.type === "w" && "AddSendMoneyEuropeRecipient") || "AddSendMoneyAfricaRecipient", {
                                        state: this.props.navigation.getParam("state"),
                                        baseCurrency: this.props.navigation.getParam("baseCurrency")
                                    })}
                                    style={{
                                        width: "30%",
                                        textAlign: "center",
                                        color: COLOR.AppBlueColor,
                                        fontSize: 15
                                    }}>Add
                                    New</Text>
                            </View>

                        }

                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => {
                                              navigation.navigate("AddCard");
                                          }}>
                            <Text style={styles.buttonText}>Pay Via Card</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.footer}>
                        <Footer/>
                    </View>
                </ScrollView>

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
        backgroundColor: "#fff"
    },
    pageHeader: {
        height: 42,
        backgroundColor: "#e5e5e5",
        width: "100%",
    },
    pageHeaderRow: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    pageHeaderIcon: {
        marginLeft: 25,
        marginRight: 30
    },
    pageHeaderText: {
        color: "#000",
        fontSize: 21
    },
    rider: {
        backgroundColor: "#e5e5e5",
        width: "100%",
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    passwordRider: {
        backgroundColor: "#e5e5e5",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    riderText: {
        color: "#000",
        fontSize: 16
    },
    inputField: {
        width: "100%",
        height: 42,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 2,
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: 16,
        color: "#000"
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
        marginTop: 40,
        marginBottom: 4,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 24,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    },
    outerRadioButton: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderColor: "#49add3",
        borderWidth: 2,
        flexDirection: "row"
    },
    currencyContainer: {
        flexDirection: "row", width: "100%",
    },
    currencyContainerText: {
        paddingHorizontal: 20,
        minWidth: 80,
        fontSize: 16,
        backgroundColor: "#e5e5e5",
        paddingVertical: 11,
        textAlign: "center"
    }

});


export default ReceiveMoneyReview;
