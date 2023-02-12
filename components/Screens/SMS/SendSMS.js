import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as SMS from 'expo-sms';


const SendSMS = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSendSMS = async () => {
            const isAvailable = await SMS.isAvailableAsync();
            if (isAvailable) {
                console.log('+++++++++++++Is available');
                await SMS.sendSMSAsync(
                    await SMS.sendSMSAsync(phoneNumber, message));
            } else {
                console.log('+++++++++++++++++++++++++++++Is not available');
                // misfortune... there's no SMS available on this device
            }
        };

    return (
        <View>
            <TextInput
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="number-pad"
                style={{ margin: 10 }}
            />
            <TextInput
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
                style={{ margin: 10 }}
            />
            <TouchableOpacity onPress={handleSendSMS}>
                <Text>Send SMS</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SendSMS;