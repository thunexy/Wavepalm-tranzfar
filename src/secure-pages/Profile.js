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
    DatePickerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer'
import Header from './../components/common/header';


class Profile extends Component {
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
        gender: "male",
        selectedCountry: [],
        countries: [{code: 0, country: "Select Country"}, {code: 1, country: "United States"}, {
            code: 234,
            country: "Nigeria"
        }],
        dob: null,
    };

    setCountry = (country, i) => {
        this.setState(state => {
            return {
                ...state,
                selectedCountry: this.state.countries[i]
            }
        })
    };

    setGender = (sex) => {
        this.setState((state) => {
            return {
                ...state,
                gender: sex,
            }

        })
    };


    render() {
        let country = this.state.countries.map((value, i) => {

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
        const selectGender = (<View style={{width: 12, height: 12, borderRadius: 12, backgroundColor: "#49add3"}}/>);

        const riderExtras = <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}><Text
            style={{color: "#49add3", fontSize: 16}}>Login</Text></TouchableOpacity>
let userData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    dob: "4/5/2018"

}
        return (
            <ScrollView>

                <View style={styles.container}>
                    <Header icon="md-contact" headerText="Update Account"
                            />


                    <TextInput style={styles.inputField} defaultValue={userData.firstName} />
                    <TextInput style={styles.inputField} defaultValue={userData.lastName} />
                    <TextInput style={styles.inputField} defaultValue={userData.email} />


                    <View style={{
                        paddingVertical: 10,
                        paddingHorizontal: 24,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <Text style={{fontSize: 16}}>{userData.dob}</Text>
                        <TouchableOpacity onPress={openDate}>
                            <Icon name="md-calculator" size={24} style={{marginLeft: 20, color: "#49add3"}}/>
                        </TouchableOpacity>
                    </View>

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

                    <View style={{
                        width: "100%",
                        paddingHorizontal: 16,
                        height: 42,
                        borderBottomColor: "#e5e5e5",
                        borderBottomWidth: 2
                    }}>
                        <Picker style={{
                            color: "#000",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 40
                        }}
                                selectedValue={this.state.selectedCountry.country} onValueChange={this.setCountry}>
                            {country}
                        </Picker>
                    </View>


                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Text style={{
                            paddingHorizontal: 20,
                            fontSize: 16,
                            backgroundColor: "#e5e5e5",
                            paddingVertical: 11
                        }}>
                            {`+${this.state.selectedCountry.code || 0}`}
                        </Text>
                        <TextInput style={styles.inputField} placeholder="Telephone *"/>
                    </View>
                    <TextInput style={styles.inputField} placeholder="Address 1 *"/>
                    <TextInput style={styles.inputField} placeholder="Address 2"/>
                    <TextInput style={styles.inputField} placeholder="City/Town *"/>

                    <TextInput style={styles.inputField} placeholder="Post Code *"/>
                    <Text style={{color: "#49add3", paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}} onPress={()=>this.props.navigation.navigate("EnrollPasscode")}>Enable passcode for quick logon</Text>


                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => this.props.navigation.navigate("Melissa")}>
                        <Text style={styles.buttonText}>Update Info</Text>
                    </TouchableOpacity>


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


export default Profile;
