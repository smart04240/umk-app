import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Main from "../../components/general/Main";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";
import useTranslator from "../../hooks/useTranslator";
import Translations from "../../constants/Translations";
import Button from "../../components/form/Button";
import {useDispatch} from "react-redux";
import Actions from "../../redux/Actions";
import Fonts from "../../constants/Fonts";

export default function PrivacyPolicyScreen() {
    const dispatch = useDispatch();
    const translate = useTranslator();

    return (
        <ScreenWithHiddenHeader>
            <Main style={{justifyContent: 'center', alignItems: 'center'}}>
                <ScrollView style={{flex: 0.9}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20}}>
                    <View>
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 19, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.description)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p1.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p1.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p2.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p2.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p3.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p3.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p4.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p4.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p5.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p5.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p6.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p6.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p7.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p7.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p8.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p8.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p9.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p9.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p10.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p10.list)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Bold, fontSize: 18, textAlign: 'center'}}>{translate(Translations.PrivacyPolicy.p11.title)}</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <Text style={{color: 'black', fontFamily: Fonts.ProximaNova.Regular, fontSize: 18, lineHeight: 25}}>{translate(Translations.PrivacyPolicy.p11.list)}</Text>
                    </View>
                </ScrollView>
                <View
                    style={{
                        flex: 0.1,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                    }}
                >
                    <Button style={{width: '100%', height: 45}} onPress={() => dispatch(Actions.User.Apply())}>{translate(Translations.Confirm)}</Button>
                </View>
            </Main>
        </ScreenWithHiddenHeader>
    )
}