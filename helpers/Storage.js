import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    Keys: {},
    get: async function (key) {
        let value = await AsyncStorage.getItem(key);

        if (value)
            value = JSON.parse(value);

        return value;
    },
    set: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
};
