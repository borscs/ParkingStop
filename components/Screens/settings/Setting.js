import {StyleSheet, Text, View} from "react-native";

const Setting = () => {
    return (
        <View style={styles.container}>
            <Text>This is Page 1</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Setting;