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
import {CheckBox} from "react-native-elements";
import {COLOR} from "../Colors/Colors";
import {mixedCountries} from "../components/common/countries";
import {requiredFields} from "../components/Strings/Strings";
import {connect} from "react-redux";

const {width, height} = Dimensions.get("window");

class SendMoneyEstimate extends Component {
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

    state = {
        selectedCountry: [],
        baseCurrency: "",
        transferFee: 0,
        transferRate: 365,
        includeTransferFee: false,
        isCountrySelected: false,
        sendAmount: null,
        receiveAmount: null,
        countries: mixedCountries.filter(country => {

            return country.name !== this.props.country;
        }),
        totalAmount: null,
    };

    calculateFees = () => {
        const totalAmount = (parseFloat(this.state.transferFee) + parseFloat(this.state.sendAmount)).toFixed(2);
        this.setState({totalAmount});
    };
    setSendAmount = (value) => {
        if (value > 5000) {
            alert(`You cannot send more than GBP 5000`);
            return;
        }
        this.setState(state => {
            return {
                ...state,
                sendAmount: value,
                receiveAmount: value * state.transferRate,
                transferFee: (value * 0.05).toFixed(2),
            }
        }, () => {
            this.calculateFees();
        });

    };
    setReceiveAmount = (value) => {
        const sendAmount = (value / this.state.transferRate).toFixed(2);
        if (sendAmount > 5000) {
            alert("You cannot send more than GBP 5000");
            return;
        }
        this.setState(state => {
            return {
                ...state,
                sendAmount,
                transferFee: ((value / state.transferRate) * 0.05).toFixed(2),
                receiveAmount: value
            }
        }, () => {
            this.calculateFees();
        });

    };
    setCountry = (country, i) => {

        this.setState({selectedCountry: this.state.countries[i], isCountrySelected: !(i === 0)});
    };

    componentWillMount() {
        //set base currency.

        this.setState({
            baseCurrency: mixedCountries.filter(country => {
                return country.name === this.props.country;
            })[0].short,
        });
    }

    render() {

        //fetch dropdown list of countries
        const country = this.state.countries.map((value, i) => {
            return (

                <Picker.Item key={i} label={value.name} value={value.name} />
            )
        });

        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <Header icon="md-calculator" backButtonAction={"Dashboard"}
                                navigation={this.props.navigation} replace={true} headerText="Estimate Cost"
                                riderText="Enter an amount in either field."/>


                        <View style={{
                            width: "100%",
                            paddingHorizontal: 16,
                            height: 42,
                            borderBottomColor: "#e5e5e5",
                            borderBottomWidth: 2
                        }}>
                            <Picker style={{color: "#000", width: "100%", height: 40}}
                                    selectedValue={this.state.selectedCountry.name} onValueChange={this.setCountry}>
                                {country}
                            </Picker>
                        </View>

                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 16,
                            borderBottomWidth: 2, borderBottomColor: "#e5e5e5"
                        }}>
                            <CheckBox containerStyle={{padding: 0, borderWidth: 0, height: 30, backgroundColor: "#fff"}}
                                      checkedColor={COLOR.AppBlueColor} title={"Include transfer fee?"} onPress={() => {
                                return this.setState({includeTransferFee: !this.state.includeTransferFee})
                            }} checked={this.state.includeTransferFee}/>
                        </View>

                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {this.state.baseCurrency || "###"}
                            </Text>
                            <TextInput editable={this.state.isCountrySelected} style={styles.inputField}
                                       keyboardType={"numeric"}
                                       value={`${this.state.sendAmount || ""}`} onChangeText={this.setSendAmount}
                                       placeholder="Send Amount"/>
                        </View>
                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {this.state.selectedCountry.short || "###"}
                            </Text>
                            <TextInput editable={this.state.isCountrySelected} style={styles.inputField}
                                       keyboardType={"numeric"}
                                       value={(!this.state.selectedCountry.short) ? "" : `${this.state.receiveAmount || ""}`}
                                       onChangeText={this.setReceiveAmount} placeholder="Receive Amount"/>
                        </View>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            height: 42,
                            paddingHorizontal: 24,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text style={{width: "50%", fontSize: 15}}>Transfer fee</Text>
                            <TextInput style={{color: "#000", textAlign: "right", width: "50%"}} editable={false}
                                       value={`${this.state.transferFee}`}/>
                        </View>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            height: 42,
                            paddingHorizontal: 24,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text onPress={() => {
                            }} style={{width: "50%", fontSize: 15}}>Transfer rate</Text>
                            <TextInput style={{color: "#000", textAlign: "right", width: "50%"}} editable={false}
                                       value={(this.state.selectedCountry.short) ? `${this.state.transferRate}` : "0"}/>
                        </View>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            height: 42,
                            paddingHorizontal: 24,
                            borderBottomWidth: 2,
                            borderBottomColor: COLOR.InputGreyBorderColor
                        }}>
                            <Text style={{width: "50%", fontSize: 15}}>Total Cost</Text>
                            <TextInput style={{color: "#000", textAlign: "right", width: "50%", fontWeight: "bold"}}
                                       editable={false}
                                       value={(this.state.selectedCountry.symbol) ? `${this.state.selectedCountry.symbol} ${(!this.state.includeTransferFee) ? this.state.sendAmount || 0 : this.state.totalAmount || 0}` : "N/A"}/>
                        </View>
                        <TouchableOpacity
                            style={[styles.buttonContainer, !this.state.isCountrySelected && {backgroundColor: COLOR.InputGreyBorderColor}]}
                            onPress={() => {
                                if (this.state.sendAmount <= 0) {
                                    alert("Enter a greater amount!");
                                }
                                else if (this.state.sendAmount !== null) {
                                    this.state.isCountrySelected && this.props.navigation.navigate("SendMoneyReview", {state: this.state, baseCurrency: this.state.baseCurrency})
                                }
                                else {
                                    alert(requiredFields);
                                }
                            }}>
                            <Text style={styles.buttonText}>Continue</Text>
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
        flexDirection: "row", width: "100%"
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
const mapStateToProps = state => {
    return {
        country: state.auth.country,
    }
};

export default connect(mapStateToProps)(SendMoneyEstimate);
