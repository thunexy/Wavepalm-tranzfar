import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    NativeModules
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import {COLOR} from "./../Colors/Colors";
import {CheckBox} from "react-native-elements";
import PaymentModal from "../components/common/PaymentModal";
import {addingCard, processingPayment, validatingCard} from "../components/Strings/Strings";
import ProgressModal from "../components/common/ProgressModal";
import {addCard} from "../components/Urls/Urls";
import {validateCard} from "../components/checkout/ValidateCard";

const {width, height} = Dimensions.get("window");

class ChargeCard extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <View
                    style={{flex: 1, flexDirection: "row", justifyContent: "center"}}
                >
                    <Image
                        style={{width: 200}}
                        resizeMode="contain"
                        source={require("../assets/logo.png")}
                    />
                </View>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon
                        color="#000"
                        name="md-menu"
                        size={30}
                        style={{marginLeft: 24, marginRight: 24}}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <View
                    color="#000"
                    name="md-menu"
                    size={30}
                    style={{marginLeft: 24, marginRight: 24}}
                />
            )
        };
    };

    state = {
        cardNumber: "",
        cardName: "",
        month: "",
        year: "",
        cvv: "",
        saveCard: false,
        showModal: false,
        isProgressModalVisible: false,
        modalText: processingPayment
    };

    setDetails = (key, value) => {
        this.setState(state => {
            return {
                ...state,
                [key]: value
            };
        });
    };

    registerCard = () => {
        const {cardName, cardNumber, saveCard, cvv, month, year} = this.state;
        this.setState({isProgressModalVisible: true, modalText: validatingCard});
        validateCard(cardNumber, cardName, month, year, cvv, async (status) => {//validate card
            if (status) {//successful validation
                if(saveCard){//user wants to save card
                    this.setState({modalText: addingCard});
                    try{
                        const response = await fetch(`${addCard}?userEmail=${this.props.userEmail}&cardNumber=${cardNumber}&cardName=${cardName}&month=${month}&year=${year}`);
                        const responseJson = await response.json();
                        this.setState({isProgressModalVisible: false});
                        alert(responseJson.message);
                        if(!responseJson.bool){
                            return;
                        }
                        this.props.navigation.replace("History");
                    }
                    catch (e) {
                        this.setState({isProgressModalVisible: false});
                        alert(e.message);
                    }


                }
                //continue to process transaction for now do the top
            }
            else {
                this.setState({isProgressModalVisible: false});
                alert("This card could not be validated!");
            }
        });
        // then continue transaction
    };

    render() {
        const {navigation} = this.props;
        console.log(this.props.navigation);
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                }}
            >
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>

                <ScrollView>
                    <View style={styles.container}>
                        <PaymentModal
                            isVisible={this.state.showModal}
                            goToPage={() => {
                                this.setState(state => {
                                    return {
                                        ...state,
                                        showModal: false
                                    };
                                });
                                this.props.navigation.navigate("History");
                            }}
                        />
                        <Header
                            icon="md-calculator"
                            backButtonAction={"Dashboard"}
                            navigate={this.props.navigation.navigate}
                            headerText="Charge Card"
                        />

                        <View style={[styles.textContainer, {marginTop: 16}]}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLOR.AppBlueColor
                                }}
                            >
                                Card Number *
                            </Text>
                            <TextInput
                                keyboardType={"numeric"}
                                maxLength={16}
                                value={this.state.cardNumber}
                                onChangeText={this.setDetails.bind(this, "cardNumber")}
                                style={[styles.inputField]}
                                placeholder="0000 0000 0000 0000"
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={{fontSize: 12, color: COLOR.AppBlueColor}}>
                                Name on Card *
                            </Text>
                            <TextInput
                                keyboardType="name-phone-pad"
                                value={this.state.cardName}
                                onChangeText={this.setDetails.bind(this, "cardName")}
                                style={[styles.inputField]}
                                placeholder={"e.g John Doe"}
                            />
                        </View>

                        <View style={{flexDirection: "row", width: "100%"}}>
                            <View style={styles.textSmallerContainer}>
                                <Text style={{fontSize: 12, color: COLOR.AppBlueColor}}>
                                    Expiry *
                                </Text>
                                <View style={{flexDirection: "row", width: "50%"}}>
                                    <TextInput
                                        keyboardType="phone-pad"
                                        maxLength={2}
                                        value={this.state.month}
                                        onChangeText={this.setDetails.bind(this, "month")}
                                        style={[styles.inputField, {width: "100%"}]}
                                        placeholder="MM"
                                    />
                                    <Text style={{fontSize: 25, alignSelf: "center"}}> / </Text>
                                    <TextInput
                                        keyboardType="phone-pad"
                                        maxLength={2}
                                        value={this.state.year}
                                        onChangeText={this.setDetails.bind(this, "year")}
                                        style={[styles.inputField, {width: "100%"}]}
                                        placeholder="YY"
                                    />
                                </View>
                            </View>

                            <View style={styles.textSmallerContainer}>
                                <Text style={{fontSize: 12, color: COLOR.AppBlueColor}}>
                                    3 Digit CVV *
                                </Text>
                                <TextInput
                                    keyboardType="phone-pad"
                                    maxLength={3}
                                    value={this.state.cvv}
                                    onChangeText={this.setDetails.bind(this, "cvv")}
                                    style={[styles.inputField, {width: "100%"}]}
                                    placeholder="CVV"
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <CheckBox
                                containerStyle={{
                                    backgroundColor: "transparent",
                                    borderWidth: 0
                                }}
                                title="Add Card For Future Transactions"
                                textStyle={{
                                    fontWeight: "100"
                                }}
                                checkedColor={COLOR.AppBlueColor}
                                onPress={() => {
                                    this.setState({
                                        saveCard: !this.state.saveCard
                                    });
                                }}
                                checked={this.state.saveCard}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.setState({isProgressModalVisible: true});
                                NativeModules.Checkout.show((msg)=>{
                                    this.setState({isProgressModalVisible: false});
                                    alert("Payment Successful");
                                    navigation.replace("Dashboard");
                                });
                            }}
                        >
                            <Text style={styles.buttonText}> Continue</Text>
                        </TouchableOpacity>
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
        backgroundColor: "#f5f5f5",
        alignItems: "center"
    },
    footer: {
        marginTop: 90,
    },
    inputField: {
        textAlign: "center",
        height: 42,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        fontSize: 16
    },
    textContainer: {
        width: "100%",
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 1
    },
    textSmallerContainer: {
        width: "50%",
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 1
    },
    buttonContainer: {
        width: 240,
        backgroundColor: COLOR.AppBlueColor,
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 4,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 24
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});

export default ChargeCard;
