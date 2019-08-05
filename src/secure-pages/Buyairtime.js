import React, {Component} from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Picker,
    Image,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import NetworkProvider from "./../components/common/NetworkProvider";
import {COLOR} from "../Colors/Colors";

const {width, height} = Dimensions.get("window");

class Buyairtime extends Component {
    state = {
        selectedNetwork: null,
        selectedCountry: null,
        isSelectExpresso: false,
        isSelectVodafone: false,
        isSelectSafari: false,
        isSelectTelekoms: false,
        isSelect9mobile: false,
        isSelectAirtel: false,
        isSelectAirtelTigo: false,
        isSelectGlo: false,
        isSelectMtn: false,
        countries: ["Select a Country", "Nigeria", "Ghana"],
        phoneNumber: null,
        airtimeAmount: null
    };
    formatClick = () => {
        this.setState(state => {
            return {
                isSelectExpresso: false,
                isSelectVodafone: false,
                isSelectSafari: false,
                isSelectTelekoms: false,
                isSelectAirtelTigo: false,
                isSelect9mobile: false,
                isSelectAirtel: false,
                isSelectGlo: false,
                isSelectMtn: false
            };
        });
    };
    setCountry = (value, i) => {
        this.setState({
            isSelectExpresso: false,
            isSelectVodafone: false,
            isSelectSafari: false,
            isSelectTelekoms: false,
            isSelect9mobile: false,
            isSelectAirtel: false,
            isSelectGlo: false,
            isSelectAirtelTigo: false,
            isSelectMtn: false,
            selectedNetwork: null,
            selectedCountry: value
        });
    };

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

    processPayment = () => {
        if (
            this.state.selectedNetwork !== null &&
            this.state.airtimeAmount !== null &&
            this.state.phoneNumber !== null
        ) {
            let info = {
                selectedNetwork: this.state.selectedNetwork,
                selectedCountry: this.state.selectedCountry,
                phoneNumber: this.state.phoneNumber,
                airtimeAmount: this.state.airtimeAmount,
                transactionType: "AIRTIME",
                prevPage: "Buyairtime",
            };
            this.props.navigation.navigate("AirtimePayment", {
                details: info
            });
        } else {
            alert("Necessary fields to fill");
        }
    };

    setDetails = (key, value) => {
        this.setState(state => {
            return {
                ...state,
                [key]: value
            };
        });
    };

    render() {
        let country = this.state.countries.map((value, i) => {
            return <Picker.Item key={i} label={value} value={value}/>;
        });

        return (
            <View style={styles.container}>
                <Header
                    icon="md-call"
                    backButtonAction={"Dashboard"}
                    navigation={this.props.navigation}
                    headerText="Buy Airtime"
                />

                <View style={{width: "100%", paddingHorizontal: 16}}>
                    <View
                        style={{
                            width: "100%",
                            // borderBottomColor: "#e5e5e5",
                            // borderBottomWidth: 2
                        }}
                    >
                        <Text style={{color: "#49add3", marginTop: 16, padding: 0}}>
                            Select your country
                        </Text>
                        <View style={{borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 5, backgroundColor: "#fff", height: 42, justifyContent: "center"}}>
                            <Picker
                                style={{color: "#000", width: "100%"}}
                                selectedValue={this.state.selectedCountry}
                                onValueChange={this.setCountry}
                            >
                                {country}
                            </Picker>
                        </View>
                    </View>

                    {this.state.selectedCountry !== null && (
                        <View
                            style={{
                                width: "100%",
                                paddingVertical: 10
                            }}
                        >
                            {(this.state.selectedCountry == "Nigeria" ||
                                this.state.selectedCountry == "Ghana" ||
                                this.state.selectedCountry == "Kenya" ||
                                this.state.selectedCountry === "Unknown") && (
                                <Text style={{color: "#49add3", marginBottom: 5}}>
                                    Select a network
                                </Text>
                            )}

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                                        style={{flexDirection: "row"}}>
                                {(this.state.selectedCountry == "Nigeria" ||
                                    this.state.selectedCountry == "Unknown") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelect9mobile: true,
                                                    selectedNetwork: "9mobile"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelect9mobile}
                                            title={"9Mobile"}
                                            logo={"9mobile" + (this.state.isSelect9mobile ? "" : "-g")}
                                        />
                                    </TouchableOpacity>
                                )}
                                {(this.state.selectedCountry === "Nigeria" ||
                                    this.state.selectedCountry === "Kenya") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectAirtel: true,
                                                    selectedNetwork: "Airtel"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectAirtel}
                                            title="AIRTEL"
                                            logo={"airtel" + (this.state.isSelectAirtel ? "" : "-g")}
                                        />
                                    </TouchableOpacity>
                                )}

                                {this.state.selectedCountry === "Ghana" && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectAirtelTigo: true,
                                                    selectedNetwork: "AirtelTigo"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectAirtelTigo}
                                            title="AIRTEL-TIGO"
                                            logo={
                                                "airteltigo" + (this.state.isSelectAirtelTigo ? "" : "-g")
                                            }
                                        />
                                    </TouchableOpacity>
                                )}

                                {(this.state.selectedCountry === "Nigeria" ||
                                    this.state.selectedCountry === "Ghana") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectGlo: true,
                                                    selectedNetwork: "Glo"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectGlo}
                                            title="GLO"
                                            logo={"glo" + (this.state.isSelectGlo ? "" : "-g")}
                                        />
                                    </TouchableOpacity>
                                )}
                                {(this.state.selectedCountry === "Ghana" ||
                                    this.state.selectedCountry === "Nigeria" ||
                                    this.state.selectedCountry === "Kenya") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectMtn: true,
                                                    selectedNetwork: "MTN"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectMtn}
                                            title="MTN"
                                            logo={"mtn" + (this.state.isSelectMtn ? "" : "-g")}
                                        />
                                    </TouchableOpacity>
                                )}

                                {(this.state.selectedCountry === "Ghana" ||
                                    this.state.selectedCountry === "Unknown") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectVodafone: true,
                                                    selectedNetwork: "Vodafone"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectVodafone}
                                            title="Vodafone"
                                            logo={
                                                "vodafone" + (this.state.isSelectVodafone ? "" : "-g")
                                            }
                                        />
                                    </TouchableOpacity>
                                )}

                                {(this.state.selectedCountry === "Kenya" ||
                                    this.state.selectedCountry === "Unknown") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectSafari: true,
                                                    selectedNetwork: "Safari"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectSafari}
                                            title="Safari"
                                            logo={"mtn" + (this.state.isSelectSafari ? "" : "-g")}
                                        />
                                    </TouchableOpacity>
                                )}
                                {/* {(this.state.selectedCountry === "Kenya" ||
                this.state.selectedCountry === "Unknown") && (
                <TouchableOpacity
                  onPress={() => {
                    this.formatClick();
                    this.setState(state => {
                      return {
                        ...state,
                        isSelectTelekoms: true,
                        selectedNetwork: "Telekoms"
                      };
                    });
                  }}
                >
                  <NetworkProvider
                    focus={this.state.isSelectTelekoms}
                    title="Telekoms"
                    logo={
                      "expresso" + (this.state.isSelectTelekoms ? "" : "-g")
                    }
                  />
                </TouchableOpacity>
              )} */}
                                {(
                                    this.state.selectedCountry === "Ghana") && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.formatClick();
                                            this.setState(state => {
                                                return {
                                                    ...state,
                                                    isSelectExpresso: true,
                                                    selectedNetwork: "Expresso"
                                                };
                                            });
                                        }}
                                    >
                                        <NetworkProvider
                                            focus={this.state.isSelectExpresso}
                                            title="Expresso"
                                            logo={
                                                "expresso" + (this.state.isSelectExpresso ? "" : "-g")
                                            }
                                        />
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                    )}

                    <View style={{}}>
                        <Text
                            style={{color: "#49add3", paddingTop: 6}}
                        >
                            Phone Number
                        </Text>

                        <TextInput
                            style={styles.inputField}
                            keyboardType="phone-pad"
                            placeholder="0XXXXXXXXXX"
                            maxLength={11}
                            onChangeText={this.setDetails.bind(this, "phoneNumber")}
                        />
                    </View>
                    <View style={{}}>
                        <Text
                            style={{color: "#49add3", paddingTop: 15}}
                        >
                            Airtime Amount
                        </Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType="numeric"
                            placeholder="How much airtime do you want"
                            onChangeText={this.setDetails.bind(this, "airtimeAmount")}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.processPayment}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Footer/>
                    </View>
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
        backgroundColor: "#fff",
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        borderRadius: 5,
    },

    buttonContainer: {
        width: 240,
        backgroundColor: "#49add3",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 4,
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});

export default Buyairtime;
