import React from 'react';
import {View, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useSelector} from 'react-redux';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';
import ProfileAvatar from '../profile/ProfileAvatar';
import useTranslator from "../../hooks/useTranslator";

export default function SidebarUserInfo({navigation}) {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const user = useSelector(state => state.user); // may *not* exist when no user is logged in

    const navigateToProfile = () => navigation.navigate(Routes.ProfileEdit);

    return (
        <View style={[GeneralStyles.row_ac, {flexShrink: 1}]}>
            <ProfileAvatar/>
            <View>
                <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.dark_blue_text, fontSize: 18}]}>
                    {user?.nick_name}
                </Text>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text}]}>
                        {translate(Translations.EditProfile)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
