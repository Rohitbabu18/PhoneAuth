import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';
import FirebaseApp, { firebaseConfig } from '../Firebase';

import auth from '@react-native-firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
export default function Splace(props) {
    const { navigate } = props.navigation;
    const recaptchaVerifier = useRef();
    const [phone, setPhone] = useState()
    const [code, setcode] = useState()
    const SendCode = async () => {

        try {
            const number = "+91 " + phone
            console.log(number)
            // const phoneProvider = new firebase.auth.PhoneAuthProvider();//auth().signInWithPhoneNumber(number)
            // phoneProvider
            //     .verifyPhoneNumber(number, recaptchaVerifier.current)
            //     .then((code = 9) => { setcode(code) });
            await auth(FirebaseApp)
                .signInWithPhoneNumber(number)
                .then(confirmation => {
                    setcode(confirmation)
                })
        } catch (err) {
            console.log('err=', err)
        }
        finally {
            console.log(code)
        }
        navigate('Otp', { confirmCode: code })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'gray'} />
            <FirebaseRecaptchaVerifierModal

                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <View>
                <Text>Enter 10 Digits Phone Number To Verify</Text>
                <TextInput
                    placeholder='Phone Number'
                    focusable={true}
                    keyboardType='number-pad'
                    onChangeText={(value) => { setPhone(value) }}
                    style={{ marginTop: 20, padding: 20, }}
                    maxLength={10}
                    underlineColorAndroid={phone ? '#33bc79' : 'gray'}

                />
            </View>
            <Button
                title='Send OTP'
                disabled={!phone}
                onPress={() => {
                    SendCode();
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
