import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    CheckBox,
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

const {width, height} = Dimensions.get("window");
class Estimate extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Image style={{width: 200}} resizeMode="contain" source={require('../assets/logo.png')}/></View>,
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.openDrawer()}><Icon color="#000" name="md-menu" size={30}
                                        style={{marginLeft: 24, marginRight: 24}}/></TouchableOpacity>
            ),
            headerRight: (
                <View color="#000" name="md-menu" size={30} style={{marginLeft: 24, marginRight: 24}}/>
            ),
        }

    };




    render() {
        let state = {
            gender: "male",
            selectedCountry: [],
            countries: [{code: 0, country: "Select Receiver Country"}, {code: 1, country: "United States"}, {
                code: 234,
                country: "Nigeria"
            }],
            dob: null,
        };

        let setCountry = (country, i) => {
            state.selectedCountry= this.state.countries[i];
        };
        let country = state.countries.map((value, i) => {

            return (
                <Picker.Item key={i} label={value.country} value={value.country}/>
            )
        });
        const openDate = async () => {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date,
                    minDate: new Date(1900, 1, 1)
                });
                if (DatePickerAndroid.dismissedAction !== action) {
                    this.setState(state => {
                        return {
                            ...state,
                            dob: `${day}/${month}/${year}`
                        }
                    })
                }
            } catch ({code, message}) {
            }
        };

        return (
                <View style={styles.container}>
                    <Header icon="md-calculator" headerText="Estimate Transfer Cost" riderText="Enter an amount in either field." />


                    <View style={{
                        width: "100%",
                        paddingHorizontal: 16,
                        height: 42,
                        borderBottomColor: "#e5e5e5",
                        borderBottomWidth: 2
                    }}>
                        <Picker style={{color: "#000", width: "100%", height: 40}}
                                selectedValue={state.selectedCountry.country} onValueChange={setCountry}>
                            {country}
                        </Picker>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        paddingVertical: 4,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        borderBottomWidth: 2, borderBottomColor: "#e5e5e5"
                    }}>
                        <View style={{width: "100%", flexDirection: "row", alignItems:"center", paddingRight: 16,}}>
                            <CheckBox checkedColor="red"/>
                            <Text style={{fontSize: 14}}>Include Transfer Fee?</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Text style={{
                            paddingHorizontal: 20,
                            fontSize: 16,
                            backgroundColor: "#e5e5e5",
                            paddingVertical: 11
                        }}>
                            GBP
                        </Text>
                        <TextInput style={styles.inputField} placeholder="Send Amount"/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Text style={{
                            paddingHorizontal: 20,
                            fontSize: 16,
                            backgroundColor: "#e5e5e5",
                            paddingVertical: 11
                        }}>
                            NGN
                        </Text>
                        <TextInput style={styles.inputField} placeholder="Receive Amount"/>
                    </View>
                    <TextInput style={styles.inputField} placeholder="Transfer fee"/>
                    <TextInput style={styles.inputField} placeholder="Transfer rate"/>
                    <TextInput style={styles.inputField} placeholder="Total cost"/>




                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={styles.buttonText}>Continue</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    footer: {
        position: "absolute",
        top: height - 100,
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


export default Estimate;
