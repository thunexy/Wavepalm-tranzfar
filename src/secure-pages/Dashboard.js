import React, {Component} from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking
} from "react-native";
import DashboardItems from "../components/common/DashboardItems";
import DashboardButton from "../components/common/DashboardButton";
import Header from "./../components/common/header";
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import {isLoggedIn} from "../store/actions/index";
import {URL} from "../pages/index"


class Dashboard extends Component {
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
        name: "John",
        dropRemittance: false,
        dropInvestment: false,
        dropInternationalStudent: false
    };


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f5f5f5"}}>

                <ScrollView style={{marginBottom: 70}}>
                    <View style={styles.container}>
                        <View>
                            <Header
                                headerText={false}
                                riderText={`Welcome ${this.state.name}`}
                            />

                            <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
                                <View
                                    style={[
                                        {
                                            flexDirection: "column",
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#e5e5e5"
                                        },
                                        this.state.dropRemittance && {
                                            borderColor: "#e5e5e5",
                                            borderWidth: 2
                                        }
                                    ]}
                                >
                                    <DashboardItems
                                        title="SEND / RECEIVE MONEY"
                                        desc="Transact funds across different countries and also buy airtime in Nigeria."
                                        onPress={() =>
                                            this.setState({
                                                dropRemittance: !this.state.dropRemittance,
                                                dropInvestment: false,
                                                dropInternationalStudent: false
                                            })
                                        }
                                        icon={"wallet"}
                                        arrowRight={this.state.dropRemittance}
                                    />
                                    {this.state.dropRemittance && (
                                        <View>
                                            <DashboardItems
                                                title="Send Money"
                                                desc="Send money to 30 western countries."
                                                child={true}
                                                onPress={() =>
                                                    this.props.navigation.navigate("SendMoneyEstimate")
                                                }
                                                icon={"share-alt"}
                                            />
                                            <DashboardItems
                                                title="Receive Money"
                                                desc="Receive money from your accounts in NG, SA, GH & KY"
                                                child={true}
                                                onPress={() =>
                                                    this.props.navigation.navigate("ReceiveMoneyEstimate")
                                                }
                                                icon={"undo"}
                                            />
                                            <DashboardItems
                                                title="Airtime"
                                                desc="Pay for airtime (9mobile, Airtel, Glo, MTN)"
                                                child={true}
                                                onPress={() =>
                                                    //alert("Currently integrating airtime api for other african countries")
                                                    this.props.navigation.navigate("Buyairtime")
                                                }
                                                icon={"call"}
                                            />
                                        </View>
                                    )}
                                </View>

                                <View
                                    style={[
                                        {
                                            flexDirection: "column",
                                            marginVertical: 10,
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#e5e5e5"
                                        },
                                        this.state.dropInvestment && {
                                            borderColor: "#e5e5e5",
                                            borderWidth: 2
                                        }
                                    ]}
                                >
                                    <DashboardItems
                                        title="INVEST"
                                        desc="Buy and sell treasury bills, invest in real estate and Ajooo"
                                        onPress={() =>
                                            this.setState({
                                                dropInvestment: !this.state.dropInvestment,
                                                dropRemittance: false,
                                                dropInternationalStudent: false,
                                            })
                                        }
                                        icon={"leaf"}

                                        arrowRight={this.state.dropInvestment}
                                    />
                                    {this.state.dropInvestment && (
                                        <View>
                                            <DashboardItems
                                                title="Nigerian Financial Instruments"
                                                desc="Buy and sell treasury bills."
                                                child={true}
                                                onPress={() => this.props.navigation.navigate("FinancialInvestment") }
                                                icon={"cash"}
                                            />
                                            <DashboardItems
                                                title="Nigerian Real Estate"
                                                desc={"Invest in Nigerian Real Estate"}
                                                child={true}
                                                onPress={() => this.props.navigation.navigate("RealEstate") }
                                                icon={"business"}
                                            />
                                            <DashboardItems
                                                title="Ajooo"
                                                desc={"Invest in Ajooo"}
                                                child={true}
                                                onPress={() => this.props.navigation.navigate("Ajoo") }
                                                icon={"briefcase"}
                                            />
                                        </View>
                                    )}
                                </View>

                                <View
                                    style={[
                                        {
                                            flexDirection: "column",
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#e5e5e5"

                                        },
                                        this.state.dropInternationalStudent && {
                                            borderColor: "#e5e5e5",
                                            borderWidth: 2
                                        }
                                    ]}
                                >
                                    <DashboardItems
                                        title="INTERNATIONAL STUDENTS"
                                        desc="Pay tuition for students studying abroad "
                                        onPress={() => {
                                            this.setState({
                                                dropInternationalStudent: !this.state.dropInternationalStudent,
                                                dropRemittance: false,
                                                dropInvestment: false,
                                            })
                                        }}
                                        icon={"school"}
                                        arrowRight={this.state.dropInternationalStudent}
                                    />
                                    {this.state.dropInternationalStudent && (
                                        <View>
                                            <DashboardItems
                                                title="Accommodation"
                                                desc="Pay for accommodation for international students"
                                                child={true}
                                                onPress={() => {
                                                    alert("Work in Progress")
                                                }}
                                                icon={"home"}
                                            />
                                            <DashboardItems
                                                title="Maintenance"
                                                desc={"Send money for maintenance to international students"}
                                                child={true}
                                                onPress={() => {
                                                alert("Work in Progress")
                                                }}
                                                icon={"hammer"}
                                            />
                                            <DashboardItems
                                                title="Tuition"
                                                desc={"Pay tuition for international students"}
                                                child={true}
                                                onPress={() => {
                                                alert("Work in Progress")
                                                }}
                                                icon={"book"}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 5,
                        paddingTop: 5,
                        borderTopWidth: 1,
                        borderColor: "#e5e5e5",
                        backgroundColor: "#fff",
                        left: 0
                    }}
                >
                    <DashboardButton
                        title="Profile"
                        iconName="ios-contact"
                        style={styles.dashboardButton}
                        onPress={() => this.props.navigation.navigate("Profile")}
                    />
                    <DashboardButton
                        title="History"
                        iconName="ios-calendar"
                        style={styles.dashboardButton}
                        onPress={() => this.props.navigation.navigate("History")}
                    />
                    <DashboardButton
                        title="FAQ"
                        iconName="md-information-circle"
                        style={styles.dashboardButton}
                        onPress={() => Linking.openURL(URL.conditions)}
                    />
                    <DashboardButton
                        title="Logout"
                        onPress={() => {
                            this.props.onLogOut(false);
                            this.props.navigation.navigate("Login");
                        }}
                        iconName="ios-unlock"
                        style={styles.dashboardButton}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        justifyContent: "space-between"
    },
    dashboardButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (statusBool) => dispatch(isLoggedIn(statusBool, null))
    }
};

export default connect(null, mapDispatchToProps)(Dashboard);
