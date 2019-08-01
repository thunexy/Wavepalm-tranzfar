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
import Footer from './../components/common/footer'
import Header from './../components/common/header';
import TransactionCard from '../components/common/TransactionCard';



class SendMoneyBeneficiaries extends Component {
    render() {
        const transactions = [
            {
                name: "John Doe",
                date: "Acct Number: 012345678",
                country: "Nigeria"
            },
            {
                name: "John Doe",
                date: "Acct Number: 012345678",
                country: "Nigeria"
            },
            {
                name: "John Doe",
                date: "Acct Number: 012345678",
                country: "Nigeria"
            },
            {
                name: "John Doe",
                date: "Acct Number: 012345678",
                country: "Nigeria"
            },



        ]

        const transactionList = transactions.map((trans, index) => (
            <TransactionCard key={index} name={trans.name} subname={trans.date} deleteIcon
                             subamount={trans.country}/>

        ))


        return (
            <View style={{flex: 1}}>
                <ScrollView>

                    <View style={styles.container}>
                        <Header icon="md-contact" />
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


export default SendMoneyBeneficiaries;
