import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";
import TopBox from "../../components/general/TopBox";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import useTranslator from "../../hooks/useTranslator";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";

export default function EditProfileScreen() {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [name, setName] = React.useState('');

    const message = {
        title: translate(Translations.DeleteConfirmTitle),
        description: translate(Translations.DeleteConfirmDescription) + ' ' + translate(Translations.Account) + ' ?',
    };

    const updateUserData = () => {
        API.user.update({nick_name: name}).then(() => {
            dispatch(Actions.User.Update(name));
            navigation.navigate(Routes.Profile);
        })
    }

    const deleteAccount = () => Alert.alert(
        message.title,
        message.description,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                },
            },
        ],
    );

    return (
        <MainWithNavigation>
            <TopBox style={{alignItems: "center"}}>
                <ProfileAvatar size={132}/>
                <TouchableOpacity>
                    <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text, marginTop: 20}]}>
                        {translate(Translations.EditAvatar)}
                    </Text>
                </TouchableOpacity>
            </TopBox>
            <ContainerWithScroll>
                <Input
                    style={{marginBottom: 20}}
                    label={translate(Translations.ChangeYouNick)}
                    defaultValue={user?.user_name}
                    onChangeText={name => setName(name)}
                />
                <View style={{marginTop: 50}}>
                    <Button onPress={() => navigation.navigate(Routes.ProfileEvents)} transparent_bg={true}>
                        {translate(Translations.YourEvents)}
                    </Button>
                    <Button onPress={() => updateUserData()}>
                        {translate(Translations.SaveChanges)}
                    </Button>
                    <TouchableOpacity onPress={() => deleteAccount()}>
                        <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text}]}>
                            {translate(Translations.DeleteAccount)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ContainerWithScroll>
        </MainWithNavigation>
    );
};
