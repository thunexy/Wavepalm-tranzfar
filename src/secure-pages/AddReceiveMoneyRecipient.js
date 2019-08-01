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

const {width, height} = Dimensions.get("window");

class AddReceiveMoneyRecipient extends Component {
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
        country: "",
        accountNumber: "",
        bank: "",
        fullName: "",
        email: "",
        onboarding: true
    };

    textChange = text => {
        console.log(text);
    };

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header icon="md-contact" backButtonAction={"SendMoneyReview"}
                            navigate={this.props.navigation.navigate} headerText="Add Recipient"/>
                    <View style={{width: "100%"}}>
                        <Dropdown
                            line
                            width="100%"
                            selectedValue={this.state.country}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({country: itemValue})
                            }
                            items={[
                                {label: "Select Country", value: ""},
                                {label: "United Kingdom", value: "USA"},
                                {label: "United States of America", value: "USA"},
                            ]}
                        />

                        <TextInput
                            id="accountNumber"
                            placeholder="Account Number"
                            value={this.state.accountNumber}
                            onValueChange={this.textChange}
                            style={styles.inputField}
                        />
                        <Dropdown
                            line
                            width="100%"
                            selectedValue={this.state.bank}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({bank: itemValue})
                            }
                            items={[
                                {label: "Select Bank", value: ""},
                            ]}
                        />
                        <TextInput
                            id="fullName"
                            placeholder="Full Name *"
                            value={this.state.fullName}
                            onValueChange={this.textChange}
                            style={styles.inputField}
                        />
                        <TextInput
                            id="email"
                            placeholder="Email *"
                            value={this.state.email}
                            onValueChange={this.textChange}
                            style={styles.inputField}
                        />

                        <CheckBox
                            title="Onboard recipient as user"
                            checkedColor={COLOR.AppBlueColor}
                            checked={this.state.onboarding}
                            onPress={() =>
                                this.setState({
                                    onboarding: !this.state.onboarding
                                })
                            }


                        />

                        <View style={{flexDirection: "row"}}>

                            <SubmitButton
                                title="Save Recipient"
                                color="#49add3"
                                textColor="white"
                                onPress={() => this.props.navigation.navigate('SendMoneyReview')}
                            />
                        </View>
                    </View>


                    <View style={styles.footer}>
                        <Footer/>
                    </View>
                </View>
            </ScrollView>

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
        marginTop: 46,
        marginBottom: 10

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

export default AddReceiveMoneyRecipient;
