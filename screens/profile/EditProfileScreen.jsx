import React from "react";
import {Alert, Platform, Text, TouchableOpacity, View} from "react-native";
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
import * as ImagePicker from 'expo-image-picker';
import makeFormData from "../../helpers/makeFormData";
import * as FileSystem from 'expo-file-system';

export default function EditProfileScreen() {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [nickName, setNickName] = React.useState(user?.nick_name || '');
    const [image, setImage] = React.useState(user?.avatar_url || '');

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

        let selectedImage = await FileSystem.getInfoAsync(image);

        API.user.update(makeFormData({nick_name: nickName, avatar: {
                name: selectedImage?.uri?.split('/')[11],
                size: selectedImage?.size,
                uri: selectedImage?.uri,
            }})).then(response => {
                dispatch(Actions.User.Update({user_name: nickName, avatar: response?.data?.avatar}));
                navigation.navigate(Routes.Profile);
        }).catch(() => Alert.alert(
            'Cant save',
            'User with the same nick already exist'
        ))
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
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
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
            setImage(result?.uri);
        }
    };

    return (
        <MainWithNavigation>
            <TopBox style={{alignItems: "center"}}>
                <ProfileAvatar size={132} imageSrc={image || ''}/>
                <TouchableOpacity onPress={() => pickImage()}>
                    <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text, marginTop: 20}]}>
                        {translate(Translations.EditAvatar)}
                    </Text>
                </TouchableOpacity>
            </TopBox>
            <ContainerWithScroll>
                <Input
                    style={{marginBottom: 20}}
                    label={translate(Translations.ChangeYouNick)}
                    defaultValue={nickName}
                    onChangeText={name => setNickName(name)}
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
