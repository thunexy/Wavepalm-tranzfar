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
    DatePickerAndroid
} from 'react-native';
import {CheckBox} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer';
import Header from './../components/common/header';
import ProgressModal from "../components/common/ProgressModal";
import {AGREE_TO_TERMS, FILL_ALL_FIELDS, PASSWORD_NOT_MATCHED} from "../Errors";
import {COLOR} from "../Colors/Colors";
import {registerUrl} from "../components/Urls/Urls";


class Signup extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
            <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
                                                                            style={{marginLeft: 24, marginRight: 24}}/></TouchableOpacity>
        ),
        headerRight: (
            <View color="#000" name="md-menu" size={30} style={{marginLeft: 24, marginRight: 24}}/>
        ),

    });

    state = {
        isProgressModalVisible: false,
        isAgreeToTerms: false,
        name: "" || "NA",
        email: "",
        password: "",
        cpassword: "",
        dob: "" || "NA",
        phone: "",
        address1: "" || "NA",
        address2: "" || "NA",
        city: "" || "NA",
        postCode: null || 1,
        referralCode: null || 1,
        status: 4,
        type: "full",
        gender: "",
        selectedCountry: {},
        countryCode: null,
        countries: [{code: "000", country: "Select Country", t: 0}, {code: "44", country: "United Kingdom", t: 2}, {
            code: "234", country: "Nigeria", t: 1
        }],
    };

    setCountry = (country, i) => {
        this.setState(state => {
            return {
                ...state,
                selectedCountry: this.state.countries[i]
            }
        })
    };

    registerUser = async () => {
        const state = this.state;
        if (state.password !== state.cpassword) {
            alert(PASSWORD_NOT_MATCHED);
            return;
        }
        else if (state.password.length < 8) {
            alert("Password must be a minimum of 8 digits");
            return;
        }
        else if (!state.name || !state.email || !state.password || !state.dob || !state.gender || !state.countryCode || !state.phone || !state.address1 || !state.city || !state.postCode) {
            alert(FILL_ALL_FIELDS);
            return;
        } else if (!this.state.isAgreeToTerms) {
            alert(AGREE_TO_TERMS);
            return;
        }
        this.setState((state) => {
            return {
                ...state, isProgressModalVisible: true,
            }
        });

        try {
            let response = await fetch(registerUrl,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: state.email,
                        password: state.password,
                        name: state.name,
                        dob: state.dob,
                        gender: state.gender,
                        country: state.selectedCountry.country || "NA",
                        phone: state.phone,
                        address1: state.address1,
                        address2: state.address2,
                        city: state.city,
                        postCode: state.postCode,
                        referralCode: state.referralCode,
                        status: state.status,
                        type: state.type
                    }),
                    //this.props.navigation.navigate("Melissa")
                });
            let responseJson = await response.json();
            if (responseJson.bool) {
                this.props.navigation.navigate("Verification", {email: this.state.email});
            }
            alert(responseJson.message);
            this.setState((state) => {
                return {
                    ...state, isProgressModalVisible: false
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    setGender = (sex) => {
        this.setState((state) => {
            return {
                ...state,
                gender: sex,
            }

        })
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
        // let countryCodes = this.state.countries.map((value, i) => {
        //
        //     return (
        //         <Picker.Item key={i} label={value.code} value={value.code}/>
        //     )
        // });
        // const openDate = async () => {
        //     try {
        //         const {action, year, month, day} = await DatePickerAndroid.open({
        //             date: new Date,
        //             minDate: new Date(1900, 1, 1)
        //         });
        //         if (DatePickerAndroid.dismissedAction !== action) {
        //             this.setState(state => {
        //                 return {
        //                     ...state,
        //                     dob: `${day}/${month}/${year}`
        //                 }
        //             })
        //         }
        //     } catch ({code, message}) {
        //     }
        // };
        const selectGender = (
            <View style={{width: 12, height: 12, borderRadius: 12, backgroundColor: "#49add3"}}/>);

        const riderExtras = <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}><Text
            style={{color: "#49add3", fontSize: 16}}>Login</Text></TouchableOpacity>

        return (
            <ScrollView>

                <View style={styles.container}>
                    <Header icon="md-contact" headerText="Create an Account" riderText="Already have an account? "
                            extras={riderExtras}/>

                    <ProgressModal isVisible={this.state.isProgressModalVisible} text={"Registering..."}/>

                    {/*<TextInput value={this.state.name} onChangeText={this.setDetails.bind(this, "name")}*/}
                    {/*           style={styles.inputField} placeholder="Full Name *"/>*/}

                    <TextInput keyboardType="email-address" value={this.state.email}
                               onChangeText={this.setDetails.bind(this, "email")}
                               style={styles.inputField} placeholder="Email Address *"/>

                    <View style={styles.passwordRider}>
                        <Text style={{fontWeight: "bold", fontSize: 18, color: "#000"}}>Password
                            Requirements:</Text>
                        <Text style={styles.riderText}>Minimum of 8 characters. At least 1 letter and 1
                            number</Text>
                    </View>


                    <TextInput style={styles.inputField} value={this.state.password}
                               onChangeText={this.setDetails.bind(this, 'password')} secureTextEntry={true}
                               placeholder="Password *"/>
                    <TextInput style={styles.inputField} value={this.state.cpassword}
                               onChangeText={this.setDetails.bind(this, 'cpassword')} secureTextEntry={true}
                               placeholder="Confirm Password *"/>

                    {/*<View style={{*/}
                    {/*    paddingVertical: 10,*/}
                    {/*    paddingHorizontal: 24,*/}
                    {/*    width: "100%",*/}
                    {/*    flexDirection: "row",*/}
                    {/*    justifyContent: "flex-start",*/}
                    {/*    alignItems: "center"*/}
                    {/*}}>*/}
                    {/*    <Text style={{fontSize: 16}}>{this.state.dob || "Choose date of birth"}</Text>*/}
                    {/*    <TouchableOpacity onPress={openDate}>*/}
                    {/*        <Icon name="md-calculator" size={24} style={{marginLeft: 20, color: "#49add3"}}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 12,
                        width: "100%",
                        justifyContent: "flex-start",
                        paddingHorizontal: 24
                    }}>
                        <TouchableOpacity onPress={this.setGender.bind(this, 'male')}
                                          style={styles.outerRadioButton}>{this.state.gender === 'male' ? selectGender : null}</TouchableOpacity>
                        <Text style={{marginHorizontal: 12}}>Male</Text>

                        <TouchableOpacity onPress={this.setGender.bind(this, 'female')}
                                          style={styles.outerRadioButton}>{this.state.gender === 'female' ? selectGender : null}</TouchableOpacity>
                        <Text style={{marginHorizontal: 12}}>Female</Text>

                    </View>

                    {/*<View style={{*/}
                    {/*    width: "100%",*/}
                    {/*    paddingHorizontal: 16,*/}
                    {/*    height: 42,*/}
                    {/*    borderBottomColor: "#e5e5e5",*/}
                    {/*    borderBottomWidth: 2*/}
                    {/*}}>*/}
                    {/*    <Picker style={{*/}
                    {/*        color: "#000",*/}
                    {/*        textAlign: "center",*/}
                    {/*        justifyContent: "center",*/}
                    {/*        alignItems: "center",*/}
                    {/*        height: 40*/}
                    {/*    }}*/}
                    {/*            selectedValue={this.state.selectedCountry.country} onValueChange={this.setCountry}>*/}
                    {/*        {country}*/}
                    {/*    </Picker>*/}
                    {/*</View>*/}


                    <View style={{flexDirection: "row", width: "100%", borderColor: COLOR.InputGreyBorderColor, borderTopWidth: 2}}>
                        {/*<Text style={{*/}
                        {/*    paddingHorizontal: 20,*/}
                        {/*    fontSize: 16,*/}
                        {/*    backgroundColor: "#e5e5e5",*/}
                        {/*    paddingVertical: 11*/}
                        {/*}}>*/}
                        {/*    /!*{`+${this.state.selectedCountry.code || 0}`}*!/*/}
                        {/*</Text>*/}

                        <TextInput keyboardType="phone-pad" maxLength={4} value={this.state.countryCode}
                                   onChangeText={this.setDetails.bind(this, "countryCode")} style={{height: 42,
                            borderColor: "#e5e5e5",
                            borderBottomWidth: 2,
                            borderRightWidth: 2,
                            paddingLeft: 24,
                            fontSize: 16,
                            width: "20%"}}
                                   placeholder="+000"/>

                        <TextInput keyboardType="phone-pad" maxLength={11} value={this.state.phone}
                                   onChangeText={this.setDetails.bind(this, "phone")} style={[styles.inputField, {width: "90%"}]}
                                   placeholder="Telephone *"/>
                    </View>
                    {/*<TextInput value={this.state.address1} onChangeText={this.setDetails.bind(this, "address1")} style={styles.inputField} placeholder="Address 1 *"/>*/}
                    {/*<TextInput value={this.state.address2} onChangeText={this.setDetails.bind(this, "address2")} style={styles.inputField} placeholder="Address 2"/>*/}
                    {/*<TextInput value={this.state.city} onChangeText={this.setDetails.bind(this, "city")} style={styles.inputField} placeholder="City/Town *"/>*/}

                    {/*<TextInput keyboardType="numeric" value={this.state.postCode} onChangeText={this.setDetails.bind(this, "postCode")} style={styles.inputField} placeholder="Post Code *"/>*/}
                    {/*<TextInput keyboardType="numeric" value={this.state.referralCode} onChangeText={this.setDetails.bind(this, "referralCode")} style={styles.inputField} placeholder="Referral Code"/>*/}

                    <View style={{
                        width: "100%",
                        justifyContent: "flex-start",
                        paddingVertical: 10,
                        paddingHorizontal: 16
                    }}>
                        <View style={{width: "90%", flexDirection: "row", alignItems: "center", paddingRight: 16}}>
                            <CheckBox checkedColor={COLOR.AppBlueColor} onPress={() => {
                                return this.setState({isAgreeToTerms: !this.state.isAgreeToTerms})
                            }} checked={this.state.isAgreeToTerms}/>
                            <Text style={{fontSize: 14}}>By clicking Sign Up, you agree to our Terms and confirm
                                that you have read our Privacy Policy</Text>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => this.registerUser()}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>


                    <View style={styles.footer}>
                        <Footer/>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: "flex-start"
        },
        footer: {
            marginTop: 16,
            marginBottom: 10
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
        }

    });


export default Signup;
