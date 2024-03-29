import React from "react";
import {Alert, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
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
import useTranslator from "../../hooks/useTranslator";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import * as ImagePicker from 'expo-image-picker';
import makeFormData from "../../helpers/makeFormData";
import * as FileSystem from 'expo-file-system';
import Container from "../../components/general/Container";

export default function EditProfileScreen() {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [nickName, setNickName] = React.useState(user?.nick_name || '');
    const [image, setImage] = React.useState(null);

    const message = {
        title: translate(Translations.DeleteConfirmTitle),
        description: translate(Translations.DeleteConfirmDescription) + ' ' + translate(Translations.Account) + ' ?',
    };

    const updateUserData = async () => {
        if (!nickName) {
            Alert.alert(
                'Cant save',
                'Please provide the user name'
            )
            return;
        }

        const data = {
            nick_name: nickName,
        };

        API.user.update(makeFormData(data)).then(response => {
            dispatch(Actions.User.Update({user_name: nickName, avatar: user?.avatar_url}));
            navigation.navigate(Routes.Profile);
        }).catch(error => {
            if (error?.response?.status === 422 && error?.response?.data?.nick_name) {
                Alert.alert(
                    'Cant save',
                    'User with the same nick already exist'
                );
            }
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
                    API.user.delete().then(() => {
                        dispatch(Actions.User.Logout());
                    })
                },
            },
        ],
    );

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (res.status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let selectedImage = await FileSystem.getInfoAsync(result?.uri);

            API.user.update(makeFormData({avatar: {
                    name: selectedImage?.uri?.split('/').pop(),
                    size: selectedImage?.size,
                    uri: selectedImage?.uri,
                }})).then(response => {dispatch(Actions.User.Update({user_name: user?.nick_name, avatar: response?.data?.avatar}));
            }).catch(() => {
                dispatch(Actions.Toasts.Warning(Translations.FileError))
            });
        }
    };

    return (
        <MainWithNavigation>
            <ScrollView>
                <TopBox style={{alignItems: "center"}}>
                    <ProfileAvatar size={132} imageSrc={user?.avatar_url || ''}/>
                    <TouchableOpacity onPress={() => pickImage()}>
                        <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text, marginTop: 20}]}>
                            {translate(Translations.EditAvatar)}
                        </Text>
                    </TouchableOpacity>
                </TopBox>
                <Container>
                    <Input
                        style={{marginBottom: 20}}
                        label={translate(Translations.ChangeYouNick)}
                        defaultValue={nickName}
                        onChangeText={name => setNickName(name)}
                        maxLength={20}
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
                </Container>
            </ScrollView>
        </MainWithNavigation>
    );
};
