import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer'
import Header from './../components/common/header';
import TransactionCard from '../components/common/TransactionCard';

const {width, height} = Dimensions.get("window");

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

    render() {

        const transactions = [
            {
                name: "John Doe",
                date: "01 Apr 2019 1:05pm",
                amount: "$1000",
                transaction_type: "Airtime"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            },
            {
                name: "Christiana Jon",
                date: "01 Apr 2019 1:05pm",
                amount: "$5000",
                transaction_type: "Outgoing"
            }
        ]

        const transactionList = transactions.map((trans, index) => (
            <TransactionCard key={index} name={trans.name} subname={trans.date} amount={trans.amount}
                             subamount={trans.transaction_type}/>

        ))


        return (
            <View style={{flex: 1}}>
                <ScrollView>

                    <View style={styles.container}>
                        <Header icon="md-contact" headerText="Transactions"
                        />
                        {transactionList}


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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start",
        marginBottom: 60,
    },
    footer: {
        paddingTop: 10,
        paddingBottom: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff"
    }
});


export default Profile;
