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
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './../components/common/footer'
import Header from './../components/common/header';
import TransactionCard from '../components/common/TransactionCard';
import {addToTransactions, fetchTransaction} from "../components/Urls/Urls";
import {ERROR_OCCURRED} from "../Errors";
import ProgressModal from "../components/common/ProgressModal";


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
        isProgressModalVisible: false,
        modalText: "",
        transactions: []
    };

    fetchTransactionList = async () => {
        this.setState({isProgressModalVisible: true, modalText: "Fetching your transactions..."});
        try{
            const response = await fetch(`${fetchTransaction}?name=Airtime&email=${this.props.userEmail}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if(!responseJson.bool){
                alert(ERROR_OCCURRED);
                return;
            }
            responseJson.data.map((value)=>{
                this.setState({transactions: [...this.state.transactions, value]});
            });
        }
        catch (e) {
            this.setState({isProgressModalVisible: false});
            alert(e.message);
        }

    };

    componentDidMount() {
        this.fetchTransactionList();
    }

    render() {

        const transactionList = this.state.transactions.map((trans, index) => {

            const date = new Date(parseInt(trans.time)/1000);
            const day = date.getDay();
            const month = date.getUTCMonth();
            const year = date.getFullYear();
            const hour = date.getHours();
            const mins = date.getMinutes();
            return <TransactionCard key={index} name={trans.phone} subname={`${day} ${month}, ${year} - ${hour}: ${mins}`} amount={trans.amount}
                             subamount={trans.type}/>


    });

        return (
            <View style={{flex: 1}}>

                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>

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

const mapState = (state) => {
    return {
        userEmail: state.auth.email,
    }
};
export default connect(mapState)(Profile);
