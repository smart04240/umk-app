import {NativeModules, Platform} from "react-native";

export const setDeviceLang = () => {
    const deviceLanguage = Platform.OS === 'ios'
        ? (NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] /* iOS 13 */)
        : NativeModules.I18nManager.localeIdentifier;

    return String(deviceLanguage).includes('pl') ? 'pl' : 'en';
}