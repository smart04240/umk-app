import React from "react";
import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Colors from "../../constants/Colors";
import UniversityLogo from "../../components/UniversityLogo";
import LocaleSwitcherBox from "../../components/locale/LocaleSwitcherBox";
import Container from "../../components/general/Container";
import Translations from "../../constants/Translations";
import Main from "../../components/general/Main";
import Routes from "../../constants/Routes";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";
import API from "../../helpers/API";
import {useDispatch} from "react-redux";
import Actions from "../../redux/Actions";
import useTranslator from "../../hooks/useTranslator";
import {makeRedirectUri} from "expo-auth-session";

export default function LoginScreen(props) {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const [authenticating, setAuthenticating] = React.useState(false);

    const loginUSOS = () => {
        if (authenticating)
            return;

        setAuthenticating(true);

        const callbackUri = makeRedirectUri({
            scheme: 'umk',
            // path: 'umk',
        });
        // TODO: make functions in API.user
        API.oauth.getURI(callbackUri).then(result => {
            dispatch(Actions.User.USOSOAuth({
                oauth_token: result?.data?.oauth_token,
                oauth_verifier: null,
                secret: result?.data?.secret,
                access_token: null,
                access_secret: null,
            }));
            props.navigation.navigate(Routes.Web, {uri: result?.data?.uri});
        }).catch(err => console.log(err)).finally(() => setAuthenticating(false));
    }

    return (
        <ScreenWithHiddenHeader>
            <Main>
                <LocaleSwitcherBox/>
                <Container>
                    <UniversityLogo/>
                    <Text style={[GeneralStyles.text_regular, {
                        fontSize: 20,
                        color: ThemeStyles.blue_text,
                        textAlign: "center"
                    }]}>
                        {translate(Translations.SignIn)}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={loginUSOS}>
                        {authenticating && <ActivityIndicator color={Colors.White} size={'large'}/>}
                        {!authenticating && (
                            <Text style={[GeneralStyles.text_semibold, {
                                textAlign: "center",
                                color: ThemeStyles.blue_text
                            }]}>
                                {translate(Translations.LoginInUsingNCU)}
                            </Text>
                        )}
                    </TouchableOpacity>
                </Container>
            </Main>
        </ScreenWithHiddenHeader>
    );
};

const styles = {
    button: {
        justifyContent: 'center',
        minHeight: 75,
        backgroundColor: Colors.Orange,
        paddingVertical: 17,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 45,
    },
};
