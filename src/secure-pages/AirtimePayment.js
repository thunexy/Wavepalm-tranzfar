import React, {Component} from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import TransactionCard from "./../components/common/TransactionCard";
import {COLOR} from "../Colors/Colors";
import PaymentModal from "../components/common/PaymentModal";
import {logUserIn} from "../components/Urls/Urls";
import ProgressModal from "../components/common/ProgressModal";

const {width, height} = Dimensions.get("window");

class AirtimePayment extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
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
    });

    state = {
        password: "",
        modalText: "",
        isProgressModalVisible: false,
    };

    setPassword = (value, i) => {
        this.setState({password: value});
    };

    processPayment = async () => {

        try {
            this.setState({isProgressModalVisible: true, modalText: "Verifying Password..."});
            const response = await fetch(`${logUserIn}?email=${this.props.userEmail}&password=${this.state.password}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                alert(responseJson.message);
                return;
            }
            this.props.navigation.navigate("CardList", {
                details: this.props.navigation.state.params.details
            });
        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            alert(e.message);
        }

    };

    render() {
        const {details} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>
                <Header
                    icon="md-call"
                    backButtonAction={"Buyairtime"}
                    navigation={this.props.navigation}
                    headerText="Payment Summary"
                />
                <View style={{padding: 16, width: "100%"}}>
                    <View style={{width: "100%", paddingVertical: 10}}>
                        <Text
                            style={{
                                color: "#49add3",
                                paddingVertical: 5,
                                paddingHorizontal: 10
                            }}
                        >
                            Airtime Top-up
                        </Text>
                        <TransactionCard
                            name={details.selectedNetwork}
                            subname={details.phoneNumber}
                            amount={details.airtimeAmount}
                        />
                    </View>
                    <View style={{width: "100%"}}>
                        <Text style={{color: COLOR.AppBlueColor}}>
                            Tranzfar Password
                        </Text>
                        <TextInput secureTextEntry={true} style={styles.inputField} onChangeText={this.setPassword}
                                   value={this.state.password} placeholder="******"/>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.processPayment()}
                >
                    <Text style={styles.buttonText}>Purchase</Text>
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
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    footer: {
        marginTop: 50
    },
    inputField: {
        width: "100%",
        borderColor: "#e5e5e5",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16
    },

    buttonContainer: {
        width: 240,
        backgroundColor: COLOR.AppGreenColor,
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 4,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});
const mapStateToProps = (state) => {
    return {
        userEmail: state.auth.email,
    }
};
export default connect(mapStateToProps)(AirtimePayment);
