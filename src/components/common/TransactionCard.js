import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}} >
                <Text style={styles.name}>{props.name}</Text>
                <Text style={[{marginTop: 7}, props.deleteIcon && {marginTop: 15}]}>{props.subname}</Text>
            </View>
            <View>
                {props.deleteIcon &&  (<Icon color="#000" name="delete" size={30} style={{alignSelf: "center"}} />)  }
                {props.amount && (   <Text style={styles.amount}>{props.amount}</Text>   )}
                {props.subamount && (   <Text style={[{marginTop: 7}, props.deleteIcon && {marginTop: 0} ]}>{props.subamount}</Text>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        padding: 20,
        justifyContent:"space-between",
        marginHorizontal: 10,
        backgroundColor: "#f5f5f5",
        marginTop: 10,
        borderRadius: 7
    },
    name: {
        fontWeight: "bold"
    },
    amount: {
        color: "green"
    }

})

export default TransactionCard
