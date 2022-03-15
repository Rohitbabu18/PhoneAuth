
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import { firebaseAuth } from '../Firebase';
export default function Otp(props) {

    const [otp, setOtp] = useState()
    const { confirmCode } = props.route.params;
    console.log("PROPS" + confirmCode);
    return (
        <View style={styles.container}>
            <View>
                <Text>Verify Number with OTP</Text>
                <TextInput
                    placeholder='OTP'
                    focusable={true}
                    editable={!!confirmCode}
                    keyboardType='number-pad'
                    onChangeText={(value) => { setOtp(value) }}
                    style={{ marginTop: 20, padding: 20, }}
                    maxLength={6}
                    underlineColorAndroid={otp ? 'green' : 'gray'}

                />
            </View>
            <Button
                title='Submit'

                disabled={!otp}
                onPress={() => {
                    if (confirmCode == otp) {
                        props.navigation.replace('HomeStack')
                    }
                    else {
                        alert("Invalid Confirmation Code Please Enter Valid Code")
                    }
                }}
                color='#33bc79'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

});
