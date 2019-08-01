import React, {Component} from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import {Dashboard} from "../secure-pages";
import ProgressModal from "../components/common/ProgressModal";
import {isLoggedIn} from "../store/actions/index";
import {connect} from "react-redux";
import {logUserIn} from "../components/Urls/Urls";

const {width, height} = Dimensions.get("window");

class Login extends Component {
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
        email: "",
        password: "",
        isProgressModalVisible: false,
        modalText: ""
    };

    //4 no verify
    //3 verify no melissa
    //2 verify, melissa, recipient
    //1 verify, melissa, sender

    submitLogIn = async () => {

        try {
            this.setState({modalText: "Trying to log in...", isProgressModalVisible: true});
            const response = await fetch(`${logUserIn}?email=${this.state.email}&password=${this.state.password}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                alert(responseJson.message);
                return;
            }
            if(responseJson.bool && responseJson.data.status === 3){
                this.props.navigation.navigate("Melissa");
                return;
            }
            else if(responseJson.bool && responseJson.data.status === 4){
                this.props.navigation.navigate("Verification");
                return;
            }
                this.props.onLogIn(true, this.state.email, responseJson.data.country);
                this.props.navigation.navigate("Dashboard");


        }
        catch(error){
            this.setState({isProgressModalVisible: false});
            alert(error.message);
        }
    };
    setDetails = (key, value) => {
        this.setState(state => {
            return {
                ...state,
                [key]: value
            }
        });

    };
    render() {
        return (
            <View style={styles.container}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>
                <Header
                    icon="md-lock"
                    headerText="Log In"
                    riderText="Login to send money and manage account"
                />

                <TextInput style={styles.inputField} value={this.state.email} onChangeText={this.setDetails.bind(this, "email")} keyboardType={"email-address"} placeholder="Email Address"/>
                <TextInput
                    style={styles.inputField}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={this.setDetails.bind(this, "password")}
                    placeholder="Password"
                />
                <TouchableOpacity style={{alignSelf: "flex-start"}}>
                    <Text style={styles.passcodeText}>Login with passcode</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.submitLogIn}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("PasswordRecovery")}
                    style={{alignSelf: "center", marginBottom: 12}}
                >
                    <Text style={styles.passcodeText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.rider}>
                    <Text style={styles.riderText}>
                        Don't have an account? You can create one.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate("Signup")}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    footer: {
        position: "absolute",
        top: height - 100
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
        color: "#49add3"
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
        borderRadius: 24
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});


const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (statusBool, email, country) => dispatch(isLoggedIn(statusBool, email, country)),
    }
};

export default connect(null, mapDispatchToProps)(Login);