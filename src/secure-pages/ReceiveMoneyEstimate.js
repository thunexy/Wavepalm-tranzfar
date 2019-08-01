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
import ProgressModal from "../components/common/ProgressModal";
import {
    europeanCountries,
    africanCountriesForReceive,
    mixedCountries,
    africanCountries
} from "../components/common/countries";
import {requiredFields} from "../components/Strings/Strings";
import {connect} from "react-redux";


const {width, height} = Dimensions.get("window");

class ReceiveMoneyEstimate extends Component {
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
        selectedSendCountry: [],
        sendCurrency: "",
        selectedReceiveCountry: [],
        receiveCurrency: "",
        selectedPaymentType: {},
        transferFee: 0,
        transferRate: 365,
        includeTransferFee: false,
        isProgressModalVisible: false,
        modalText: "",
        sendAmount: null,
        receiveAmount: null,
        paymentType: [{type: "Send to:", i: 0}, {type: "Self", i: 1}, {type: "Others", i: 2}],
        totalAmount: null
    };

    calculateFees = () => {//calculates the amount to be paid
        const totalAmount = (parseFloat(this.state.transferFee) + parseFloat(this.state.sendAmount)).toFixed(2);
        this.setState({totalAmount});
    };


    setSendAmount = (value) => {//user types amount in send amount field
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

    setReceiveAmount = (value) => {//user types amount in receive amount field
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
                receiveAmount: value,
            }
        }, () => {
            this.calculateFees();
        });

    };


    setPaymentType = (value, i) => {
        let stateJson = [];
        if (i === 0) {
            stateJson = {selectedSendCountry: [], selectedReceiveCountry: []};

        }
        else if (i === 1) {
            //For self: use this to set receiver currency to the currency of the country user registered with
            const receiveCurrency = europeanCountries.filter(country => {
                return country.name === this.props.country;
            })[0].short;
            stateJson = {
                receiveCurrency,
                sendCurrency: "",
                selectedSendCountry: [],
                selectedReceiveCountry: [],
                selectedPaymentType: this.state.paymentType[i]
            };
        }
        else if (i === 2) {
            stateJson = {
                selectedSendCountry: [],
                sendCurrency: "",
                receiveCurrency: "",
                selectedReceiveCountry: [],
                selectedPaymentType: this.state.paymentType[i]
            };
        }
        this.setState(stateJson);
    };

    getCountriesDropdown = (countries) => {
        return countries.map((value, i) => {
            return (
                <Picker.Item key={i} label={value.name} value={value.name}/>
            )
        });
    };

    componentDidMount() {

    }


    render() {

        let paymentType = this.state.paymentType.map((value, i) => {
            return (
                <Picker.Item key={i} label={value.type} value={value.type}/>
            )
        });


        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <ProgressModal isVisible={this.state.isProgressModalVisible} text={"Processing Payment..."}/>

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
                                    selectedValue={this.state.selectedPaymentType.type}
                                    onValueChange={this.setPaymentType}>
                                {paymentType}
                            </Picker>
                        </View>

                        {/*Only display countries when payment type is selected.*/}

                        {
                            (this.state.selectedPaymentType.i === 1 || this.state.selectedPaymentType.i === 2) &&
                            <View style={{
                                width: "100%",
                                paddingHorizontal: 16,
                                height: 42,
                                borderBottomColor: "#e5e5e5",
                                borderBottomWidth: 2
                            }}>
                                <Picker style={{color: "#000", width: "100%", height: 40}}
                                        selectedValue={this.state.selectedSendCountry.name}
                                        onValueChange={(country, i) => {
                                            this.setState({
                                                sendCurrency: africanCountriesForReceive[i].short,
                                                selectedSendCountry: africanCountriesForReceive[i]
                                            });
                                        }}>
                                    {this.getCountriesDropdown(africanCountriesForReceive)}
                                </Picker>
                            </View>
                        }

                        {
                            (this.state.selectedPaymentType.i === 2) && <View style={{
                                width: "100%",
                                paddingHorizontal: 16,
                                height: 42,
                                borderBottomColor: "#e5e5e5",
                                borderBottomWidth: 2
                            }}>
                                <Picker style={{color: "#000", width: "100%", height: 40}}
                                        selectedValue={this.state.selectedReceiveCountry.name}
                                        onValueChange={(country, i) => {
                                            this.setState({
                                                receiveCurrency: europeanCountries[i].short,
                                                selectedReceiveCountry: europeanCountries[i]
                                            });
                                        }}>
                                    {this.getCountriesDropdown(europeanCountries)}
                                </Picker>
                            </View>
                        }


                        <View style={{
                            width: "100%",
                            justifyContent: "center",
                            paddingVertical: 4,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 16,
                            borderBottomWidth: 2, borderBottomColor: "#e5e5e5"
                        }}>
                            <View style={{width: "100%", flexDirection: "row", alignItems: "center", height: 32,}}>
                                <CheckBox containerStyle={{backgroundColor: "transparent", borderWidth: 0}}
                                          checkedColor={COLOR.AppBlueColor} onPress={() => {
                                    return this.setState({includeTransferFee: !this.state.includeTransferFee})
                                }} checked={this.state.includeTransferFee} title={"Include Transfer Fee?"}/>
                            </View>
                        </View>

                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {this.state.sendCurrency || "###"}
                            </Text>
                            <TextInput editable={this.state.sendCurrency !== "" && this.state.receiveCurrency !== ""}
                                       style={styles.inputField}
                                       keyboardType={"numeric"}
                                       value={`${this.state.sendAmount || ""}`} onChangeText={this.setSendAmount}
                                       placeholder="Send Amount"/>
                        </View>
                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyContainerText}>
                                {this.state.receiveCurrency || "###"}
                            </Text>
                            <TextInput editable={this.state.sendCurrency !== "" && this.state.receiveCurrency !== ""}
                                       style={styles.inputField}
                                       keyboardType={"numeric"}
                                       value={(!this.state.receiveCurrency) ? "" : `${this.state.receiveAmount || ""}`}
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
                                       value={(this.state.selectedSendCountry.short) ? `${this.state.transferRate}` : "0"}/>
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
                                       value={(this.state.selectedSendCountry.short) ? `${this.state.selectedSendCountry.short} ${(!this.state.includeTransferFee) ? this.state.sendAmount || 0 : this.state.totalAmount || 0}` : "N/A"}/>
                        </View>
                        <TouchableOpacity
                            style={[styles.buttonContainer, (this.state.sendCurrency === "" && this.state.receiveCurrency === "") && {backgroundColor: COLOR.InputGreyBorderColor}]}
                            onPress={() => {
                                if (this.state.sendAmount <= 0) {
                                    alert("Enter a greater amount!");
                                }
                                else if (this.state.sendAmount !== null && this.state.sendAmount > 0) {
                                    this.props.navigation.navigate("ReceiveMoneyReview", {state: this.state});
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

export default connect(mapStateToProps)(ReceiveMoneyEstimate);


//
//
// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     View,
//     Image,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Picker,
//     ScrollView,
//     DatePickerAndroid,
//     Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Footer from './../components/common/footer';
// import Header from './../components/common/header';
// import {CheckBox} from "react-native-elements";
// import {COLOR} from "../Colors/Colors";
// import ProgressModal from "../components/common/ProgressModal";
// import {
//     europeanCountries,
//     africanCountriesForReceive,
//     mixedCountries,
//     africanCountries
// } from "../components/common/countries";
// import {requiredFields} from "../components/Strings/Strings";
// import {connect} from "react-redux";
//
//
// const {width, height} = Dimensions.get("window");
//
// class ReceiveMoneyEstimate extends Component {
//     static navigationOptions = ({navigation}) => {
//         return {
//             headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
//                 <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
//                                                                                 style={{
//                                                                                     marginLeft: 24,
//                                                                                     marginRight: 24
//                                                                                 }}/></TouchableOpacity>
//             ),
//             headerRight: (
//                 <View color="#000" name="md-menu" size={30} style={{marginLeft: 24, marginRight: 24}}/>
//             ),
//         }
//
//     };
//
//     state = {
//         selectedSendCountry: [],
//         selectedReceiveCountry: [],
//         selectedPaymentType: {},
//         sendCurrency: "",
//         receiveCurrency: "",
//         transferFee: 0,
//         transferRate: 365,
//         includeTransferFee: false,
//         isCountrySelected: false,
//         isPaymentTypeSelectedForSelf: false,
//         isPaymentTypeSelectedForOthers: false,
//         isProgressModalVisible: false,
//         modalText: "",
//         sendAmount: null,
//         receiveAmount: null,
//         paymentType: [{type: "Send to:", i: 0}, {type: "Self", i: 1}, {type: "Others", i: 2}],
//         countries: [],
//         totalAmount: null
//     };
//
//     calculateFees = () => {
//         const totalAmount = (parseFloat(this.state.transferFee) + parseFloat(this.state.sendAmount)).toFixed(2);
//         this.setState({totalAmount});
//     };
//     setSendAmount = (value) => {
//         if (value > 5000) {
//             alert(`You cannot send more than GBP 5000`);
//             return;
//         }
//         this.setState(state => {
//             return {
//                 ...state,
//                 sendAmount: value,
//                 receiveAmount: value * state.transferRate,
//                 transferFee: (value * 0.05).toFixed(2),
//                 // sendCurrency: this.state.selectedSendCountry.short,
//             }
//         }, () => {
//             this.calculateFees();
//         });
//
//     };
//     setReceiveAmount = (value) => {
//         const sendAmount = (value / this.state.transferRate).toFixed(2);
//         if (sendAmount > 5000) {
//             alert("You cannot send more than GBP 5000");
//             return;
//         }
//         this.setState(state => {
//             return {
//                 ...state,
//                 sendAmount,
//                 transferFee: ((value / state.transferRate) * 0.05).toFixed(2),
//                 receiveAmount: value,
//             }
//         }, () => {
//             this.calculateFees();
//         });
//
//     };
//
//
//     setPaymentType = (value, i) => {
//         if(i===0){
//             this.setState({isCountrySelected: false, receiveCurrency: "", selectedCountry: [], selectedPaymentType: this.state.paymentType[i], isPaymentTypeSelectedForSend: false, isPaymentTypeSelectedForOthers: false,});
//
//         }
//         else if(i === 1){
//             //For self: use this to set receiver currency to the currency of the country user registered with
//             const receiveCurrency = europeanCountries.filter(country => {
//                 return country.name === this.props.country;
//             })[0].short;
//             this.setState({receiveCurrency, countries: africanCountriesForReceive, selectedSendCountry: [], isPaymentTypeSelectedForSend: true, isPaymentTypeSelectedForOthers: false, selectedReceiveCountry: [], isCountrySelected: false, selectedPaymentType: this.state.paymentType[i]});
//         }
//         else if(i === 2){
//             this.setState({countries: europeanCountries, receiveCurrency: "", selectedSendCountry: [], selectedReceiveCountry: [], isPaymentTypeSelectedForSend: false, isPaymentTypeSelectedForOthers: true, isCountrySelected: false, selectedPaymentType: this.state.paymentType[i]});
//         }
//     };
//
//     getCountriesDropdown = (countries)=>{
//         return countries.map((value, i) => {
//             return (
//                 <Picker.Item key={i} label={value.name} value={value.name}/>
//             )
//         });
//     };
//
//     componentDidMount() {
//
//     }
//
//
//     render() {
//
//         let paymentType = this.state.paymentType.map((value, i)=>{
//             return (
//                 <Picker.Item key={i} label={value.type} value={value.type} />
//             )
//         });
//
//
//
//         return (
//             <View style={{flex: 1}}>
//                 <ScrollView>
//                     <View style={styles.container}>
//                         <ProgressModal isVisible={this.state.isProgressModalVisible} text={"Processing Payment..."}/>
//
//                         <Header icon="md-calculator" backButtonAction={"Dashboard"}
//                                 navigation={this.props.navigation} replace={true} headerText="Estimate Cost"
//                                 riderText="Enter an amount in either field."/>
//                         <View style={{
//                             width: "100%",
//                             paddingHorizontal: 16,
//                             height: 42,
//                             borderBottomColor: "#e5e5e5",
//                             borderBottomWidth: 2
//                         }}>
//                             <Picker style={{color: "#000", width: "100%", height: 40}}
//                                     selectedValue={this.state.selectedPaymentType.type} onValueChange={this.setPaymentType}>
//                                 {paymentType}
//                             </Picker>
//                         </View>
//
//                         {/*Only display countries when payment type is selected.*/}
//
//                         {
//                             (this.state.selectedPaymentType.i === 1 || this.state.selectedPaymentType.i === 2) &&
//                             <View style={{
//                                 width: "100%",
//                                 paddingHorizontal: 16,
//                                 height: 42,
//                                 borderBottomColor: "#e5e5e5",
//                                 borderBottomWidth: 2
//                             }}>
//                                 <Picker style={{color: "#000", width: "100%", height: 40}}
//                                         selectedValue={this.state.selectedSendCountry.name} onValueChange={(country, i) => {
//                                     this.setState({selectedSendCountry: africanCountriesForReceive[i], isCountrySelected: !(i === 0)});}}>
//                                     {this.getCountriesDropdown(africanCountriesForReceive)}
//                                 </Picker>
//                             </View>
//                         }
//
//                         {
//                             (this.state.selectedPaymentType.i === 2) && <View style={{
//                                 width: "100%",
//                                 paddingHorizontal: 16,
//                                 height: 42,
//                                 borderBottomColor: "#e5e5e5",
//                                 borderBottomWidth: 2
//                             }}>
//                                 <Picker style={{color: "#000", width: "100%", height: 40}} selectedValue={this.state.selectedReceiveCountry.name} onValueChange={(country, i) => {
//                                     this.setState({ receiveCurrency: europeanCountries[i].short, selectedReceiveCountry: europeanCountries[i], isCountrySelected: !(i === 0)});}}>
//                                     {this.getCountriesDropdown(europeanCountries)}
//                                 </Picker>
//                             </View>
//                         }
//
//
//
//                         <View style={{
//                             width: "100%",
//                             justifyContent: "center",
//                             paddingVertical: 4,
//                             flexDirection: "row",
//                             alignItems: "center",
//                             paddingHorizontal: 16,
//                             borderBottomWidth: 2, borderBottomColor: "#e5e5e5"
//                         }}>
//                             <View style={{width: "100%", flexDirection: "row", alignItems: "center", height: 32,}}>
//                                 <CheckBox containerStyle={{backgroundColor: "transparent", borderWidth: 0}} checkedColor={COLOR.AppBlueColor} onPress={() => {
//                                     return this.setState({includeTransferFee: !this.state.includeTransferFee})
//                                 }} checked={this.state.includeTransferFee} title={"Include Transfer Fee?"}/>
//                             </View>
//                         </View>
//
//                         <View style={styles.currencyContainer}>
//                             <Text style={styles.currencyContainerText}>
//                                 {this.state.selectedSendCountry.short || "###"}
//                             </Text>
//                             <TextInput editable={this.state.isCountrySelected} style={styles.inputField}
//                                        keyboardType={"numeric"}
//                                        value={`${this.state.sendAmount || ""}`} onChangeText={this.setSendAmount}
//                                        placeholder="Send Amount"/>
//                         </View>
//                         <View style={styles.currencyContainer}>
//                             <Text style={styles.currencyContainerText}>
//                                 {this.state.receiveCurrency || "###"}
//                             </Text>
//                             <TextInput editable={(this.state.isPaymentTypeSelectedForSelf && !this.state.selectedReceiveCountry) || (this.state.isPaymentTypeSelectedForOthers && this.state.selectedReceiveCountry.length > 0) } style={styles.inputField}
//                                        keyboardType={"numeric"}
//                                        value={(!this.state.receiveCurrency) ? "" : `${this.state.receiveAmount || ""}`}
//                                        onChangeText={this.setReceiveAmount} placeholder="Receive Amount"/>
//                         </View>
//                         <View style={{
//                             width: "100%",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             height: 42,
//                             paddingHorizontal: 24,
//                             borderBottomWidth: 2,
//                             borderBottomColor: COLOR.InputGreyBorderColor
//                         }}>
//                             <Text style={{width: "50%", fontSize: 15}}>Transfer fee</Text>
//                             <TextInput style={{color: "#000", textAlign: "right", width: "50%"}} editable={false}
//                                        value={`${this.state.transferFee}`}/>
//                         </View>
//                         <View style={{
//                             width: "100%",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             height: 42,
//                             paddingHorizontal: 24,
//                             borderBottomWidth: 2,
//                             borderBottomColor: COLOR.InputGreyBorderColor
//                         }}>
//                             <Text onPress={() => {
//                             }} style={{width: "50%", fontSize: 15}}>Transfer rate</Text>
//                             <TextInput style={{color: "#000", textAlign: "right", width: "50%"}} editable={false}
//                                        value={(this.state.selectedSendCountry.short) ? `${this.state.transferRate}` : "0"}/>
//                         </View>
//                         <View style={{
//                             width: "100%",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             height: 42,
//                             paddingHorizontal: 24,
//                             borderBottomWidth: 2,
//                             borderBottomColor: COLOR.InputGreyBorderColor
//                         }}>
//                             <Text style={{width: "50%", fontSize: 15}}>Total Cost</Text>
//                             <TextInput style={{color: "#000", textAlign: "right", width: "50%", fontWeight: "bold"}}
//                                        editable={false}
//                                        value={(this.state.selectedSendCountry.short) ? `${this.state.selectedSendCountry.short} ${(!this.state.includeTransferFee) ? this.state.sendAmount || 0 : this.state.totalAmount || 0}` : "N/A"}/>
//                         </View>
//                         <TouchableOpacity
//                             style={[styles.buttonContainer, !this.state.isCountrySelected && {backgroundColor: COLOR.InputGreyBorderColor}]}
//                             onPress={() => {
//                                 if(this.state.sendAmount <= 0){
//                                     alert("Enter a greater amount!");
//                                 }
//                                 else if(this.state.sendAmount !== null && this.state.sendAmount > 0){
//                                     this.state.isCountrySelected && this.props.navigation.navigate("ReceiveMoneyReview", {state: this.state})
//                                 }
//                                 else{
//                                     alert(requiredFields);
//                                 }
//                             }}>
//                             <Text style={styles.buttonText}>Continue</Text>
//                         </TouchableOpacity>
//
//                     </View>
//                     <View style={styles.footer}>
//                         <Footer/>
//                     </View>
//                 </ScrollView>
//             </View>
//         );
//     }
//
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: "flex-start",
//         marginBottom: 60
//     },
//     footer: {
//         paddingTop: 10,
//         paddingBottom: 10,
//         backgroundColor: "#fff"
//     },
//     pageHeader: {
//         height: 42,
//         backgroundColor: "#e5e5e5",
//         width: "100%",
//     },
//     pageHeaderRow: {
//         flexDirection: "row",
//         flex: 1,
//         alignItems: "center"
//     },
//     pageHeaderIcon: {
//         marginLeft: 25,
//         marginRight: 30
//     },
//     pageHeaderText: {
//         color: "#000",
//         fontSize: 21
//     },
//     rider: {
//         backgroundColor: "#e5e5e5",
//         width: "100%",
//         marginTop: 2,
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 24,
//         paddingVertical: 10,
//     },
//     passwordRider: {
//         backgroundColor: "#e5e5e5",
//         width: "100%",
//         flexDirection: "column",
//         justifyContent: "center",
//         paddingHorizontal: 24,
//         paddingVertical: 10,
//     },
//     riderText: {
//         color: "#000",
//         fontSize: 16
//     },
//     inputField: {
//         width: "100%",
//         height: 42,
//         borderBottomColor: "#e5e5e5",
//         borderBottomWidth: 2,
//         paddingLeft: 24,
//         paddingRight: 24,
//         fontSize: 16
//     },
//     passcodeText: {
//         paddingHorizontal: 24,
//         paddingVertical: 16,
//         fontSize: 16,
//         color: "#49add3",
//     },
//     buttonContainer: {
//         width: 240,
//         backgroundColor: "#49add3",
//         flexDirection: "row",
//         marginTop: 20,
//         marginBottom: 4,
//         justifyContent: "center",
//         paddingTop: 12,
//         paddingBottom: 12,
//         borderRadius: 24,
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16
//     },
//     outerRadioButton: {
//         width: 24,
//         height: 24,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 12,
//         borderColor: "#49add3",
//         borderWidth: 2,
//         flexDirection: "row"
//     },
//     currencyContainer: {
//         flexDirection: "row", width: "100%"
//     },
//     currencyContainerText: {
//         paddingHorizontal: 20,
//         minWidth: 80,
//         fontSize: 16,
//         backgroundColor: "#e5e5e5",
//         paddingVertical: 11,
//         textAlign: "center"
//     }
//
// });
// const mapStateToProps = state => {
//     return {
//         country: state.auth.country,
//     }
// };
//
// export default connect(mapStateToProps)(ReceiveMoneyEstimate);
