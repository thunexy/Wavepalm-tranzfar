import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions, NativeModules
} from "react-native";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import {COLOR} from "./../Colors/Colors";
import Card from "./../components/common/Card";
import PaymentModal from "../components/common/PaymentModal";
import ProgressModal from "../components/common/ProgressModal";
import {addToTransactions, airtimePaymentUrl, fetchCardLists} from "../components/Urls/Urls";
import {fetchCardListText, fetchSavedRecipientsModalText} from "../components/Strings/Strings";
import {CARD_NOT_VALIDATED, ENTER_CVV, ERROR_OCCURRED} from "../Errors";
import CVVModal from "../components/common/CVVModal";
import {validateCard} from "../components/checkout/ValidateCard";

const {width, height} = Dimensions.get("window");
const formatCardNumber = num => {
    return `XXXX XXXX XXXX ${num.slice(num.length - 4)}`;
};


class CardList extends Component {
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
        showModal: false,
        isProgressModalVisible: false,
        isCVVModalVisible: false,
        modalText: "",
        paymentModalText: "",
        allCards: [],
        selectedCard: [],
    };


    fetchUserCards = async () => {
        this.setState({modalText: fetchCardListText, isProgressModalVisible: true});
        try {
            const response = await fetch(`${fetchCardLists}?userEmail=${this.props.userEmail}`, {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                alert(responseJson.message);
                return;
            }
            responseJson.data.map((val, i) => {
                this.setState({allCards: [...this.state.allCards, val]});
            });
        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            alert(e.message);
        }

    };

    getCVV = () => {
        this.setState({isCVVModalVisible: true});
    };

    checkCard = (cvv) => {//check card if valid and generate token
        if (cvv.length !== 3) {
            alert(ENTER_CVV);
            return;
        }
        const card = this.state.selectedCard;
        const expiry = card.expiry.split("/");
        const year = expiry[1];
        const month = expiry[0];
        this.setState({isCVVModalVisible: false, isProgressModalVisible: true, modalText: "Validating card..."});
        validateCard(card.cardNumber, card.cardName, month, year, cvv, (status) => {

            if (!status) {
                this.setState({isProgressModalVisible: false});
                alert(CARD_NOT_VALIDATED);
                return;
            }
            const {transactionType} = this.props.navigation.state.params.details;
            this.completePayment(transactionType);
        });

    };


    completePayment = async (transactionType) => {
        const {userEmail} = this.props;

        try {
            let response;
            const {phoneNumber, airtimeAmount, recipient, amount} = this.props.navigation.state.params.details;
            switch (transactionType) {
                case "AIRTIME":

                    response = await fetch(`${addToTransactions}?name=Airtime&email=${userEmail}&recipient=${phoneNumber}&phone=${phoneNumber}&amount=${airtimeAmount}&type=${transactionType}`);
                    break;
                case "SEND MONEY":
                    response = await fetch(`${addToTransactions}?name=Outgoing&email=${userEmail}&recipient=${recipient}&phone=${recipient}&amount=${amount}&type=${transactionType}`);
                    break;
                case "RECEIVE MONEY":
                    response = await fetch(`${addToTransactions}?name=Incoming&email=${userEmail}&recipient=${recipient}&phone=${recipient}&amount=${amount}&type=${transactionType}`);
                    break;
            }
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                return;
            }
            alert("Payment successful");
            this.props.navigation.navigate("History");
        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            alert(e.message);
        }

    };

    processPaymentWithExistingCard = async () => {
        const {details} = this.props.navigation.state.params;


        //for airtime payment to Nigeria and Ghana only
        if (details.transactionType === "AIRTIME") {
            let countryShort;
            let formattedNumber;
            details.selectedCountry === "Nigeria"
                ? (countryShort = "NG")
                : (countryShort = "GH");
            details.selectedCountry === "Nigeria"
                ? (formattedNumber = "+" + "+234" + details.phoneNumber.slice(1))
                : (formattedNumber = "+" + "+233" + details.phoneNumber.slice(1));
            // console.log(formattedNumber, countryShort);
            try {
                this.setState({
                    modalText: "Processing payment...",
                    isProgressModalVisible: true,
                    showModal: false
                });
                const response = await fetch(
                    airtimePaymentUrl,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            secret_key: "FLWSECK-0ff1e91399e04404d10c860ece88c6b9-X",
                            service: "fly_buy",
                            service_method: "post",
                            service_version: "v1",
                            service_channel: "rave",
                            service_payload: {
                                Country: countryShort,
                                CustomerId: formattedNumber,
                                // Reference: "9300049404444",
                                Amount: details.airtimeAmount,
                                RecurringType: 0,
                                IsAirtime: true,
                                BillerName: "AIRTIME"
                            }
                        })
                    }
                );
                const responseJson = await response.json();
                console.log(responseJson);
                this.setState(state => {
                    return {
                        isProgressModalVisible: false
                    };
                });
                if (responseJson.status === "success") {
                    if (responseJson.data.Status === "fail") {
                        alert(JSON.stringify(responseJson.data.Message));
                    } else {
                        this.setState(state => {
                            return {
                                isProgressModalVisible: false,
                                showModal: true
                            };
                        });
                    }
                } else {
                    alert("Failed");
                }
            } catch (error) {
                this.setState(state => {
                    return {
                        isProgressModalVisible: false,
                        showModal: false
                    };
                });
                alert(ERROR_OCCURRED);
            }
        }

        //For send airtime to african countries
        else if (details.transactionType === "SEND_AIRTIME") {

        }
    };

    componentDidMount() {
        this.fetchUserCards();
    }

    render() {
        const {navigation, others} = this.props;
        const {details} = navigation.state.params;
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <ProgressModal
                            isVisible={this.state.isProgressModalVisible}
                            text={this.state.modalText}
                        />
                        <CVVModal
                            isVisible={this.state.isCVVModalVisible}
                            text={this.state.cvvModalText}
                            checkCard={this.checkCard}
                            cancel={() => {
                                this.setState({isCVVModalVisible: false})
                            }}
                        />
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
                            backButtonAction={details.prevPage}
                            replace={false}
                            navigation={this.props.navigation}
                            headerText="Process Transfer"
                        />
                        <View style={{flex: 1, marginVertical: 10, marginHorizontal: 16}}>
                            <Text
                                style={{
                                    marginTop: 7,
                                    fontSize: 16,
                                    color: COLOR.AppBlueColor
                                }}
                            >
                                Select a Card
                            </Text>

                            {this.state.allCards.map(card => (
                                <Card
                                    key={card.id}
                                    country={others.country}
                                    cardNumber={formatCardNumber(card.cardNumber)}
                                    expiryDate={card.expiry}
                                    cvv={"XXX"}
                                    cardName={card.cardName}
                                    onPress={() => {
                                        this.setState((state) => {
                                            return {
                                                ...state,
                                                selectedCard: card,
                                            }
                                        }, this.getCVV());


                                    }}
                                />
                            ))}

                            {this.state.allCards.length <= 1 ? (
                                <View
                                    style={{
                                        marginTop: 16,
                                        height: 150,
                                        marginVertical: 20,
                                        backgroundColor: COLOR.InputGreyBorderColor
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("AddCard", {
                                                buttonType: "AddCard",
                                                details: this.props.navigation.state.params.details
                                            })
                                        }
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 2,
                                            borderColor: COLOR.AppBlueColor,
                                            borderStyle: "dotted",
                                            borderRadius: 5
                                        }}
                                    >
                                        <Icon
                                            name="md-add-circle"
                                            color={COLOR.AppBlueColor}
                                            size={30}
                                        />
                                        <Text>Add Card</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() =>
                                    this.props.navigation.navigate("ChargeCard", {
                                        buttonType: "PayDirectly",
                                        details: details
                                    })
                                }
                            >
                                <Text style={styles.buttonText}> Pay Directly</Text>
                            </TouchableOpacity>
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
        backgroundColor: "#fff",
    },
    footer: {
        backgroundColor: "#fff"
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 16,
        width: "80%",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 24,
    },
    buttonText: {
        color: COLOR.AppBlueColor,
        fontSize: 16,
        fontWeight: "800"
    }
});

const mapState = (state) => {
    return {
        userEmail: state.auth.email,
        userCountry: state.auth.country,
        others: state.auth.others,
    }
};

export default connect(mapState)(CardList);
