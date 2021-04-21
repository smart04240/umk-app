import React from "react";
import Main from "../../components/general/Main";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";
import {useHeaderHeight} from '@react-navigation/stack';
import useThemeStyles from "../../hooks/useThemeStyles";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import GeneralStyles from "../../constants/GeneralStyles";
import Layout from "../../constants/Layout";
import shadowGenerator from "../../helpers/shadowGenerator";
import {LinearGradient} from "expo-linear-gradient";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import RoundedPhoneButton from "../../components/buttons/RoundedPhoneButton";
import RoundedMailButton from "../../components/buttons/RoundedMailButton";
import RoundedLocationButton from "../../components/buttons/RoundedLocationButton";

const image = require('../../assets/stockimage.png');

const ImageHeight = Layout.height / 2.5;
const ButtonHeight = 50;

export default function MarkerScreen({route}) {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const headerHeight = useHeaderHeight();

    const marker = route.params;

    return (
        <WithHeaderConfig semitransparent={true}>
            <Main>
                <ScrollView
                    style={{marginTop: headerHeight - GeneralStyles.bottom_border_radius.borderBottomLeftRadius}}>
                    <Image style={styles.image} source={image}/>
                    <View style={styles.container}>
                        <View style={{paddingBottom: ButtonHeight}}>
                            <View style={[styles.card.body, {backgroundColor: theme.box_bg}]}>
                                <Text style={[styles.card.title, {color: theme.blue_text}]}>
                                    Wydział Filozofii i Nauk Społecznych
                                </Text>
                                <Text style={[styles.card.text, {color: theme.blue_text}]}>
                                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.card.button} onPress={() => console.log('hsjbhjsc')}>
                                <LinearGradient style={styles.card.buttonGradient} colors={['#1E69BF', '#034EA2']}>
                                    <MaterialCommunityIcons name="google-maps" size={24} color={'white'}/>
                                    <Text style={styles.card.buttonText}>
                                        {translate(Translations.ShowRoute)}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.text, {color: theme.dark_text}]}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </Text>

                        <Text style={[styles.section, {color: theme.dark_text}]}>
                            Dziekanat
                        </Text>
                        <Text style={[styles.text, {color: theme.dark_text}]}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </Text>

                        <Text style={[styles.section, {color: theme.dark_text}]}>
                            Kontakt
                        </Text>
                        <Text style={[styles.text, {color: theme.dark_text}]}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </Text>

                        <RoundedPhoneButton phone={'+48 777 888 999'}/>
                        <RoundedMailButton email={'mail@mail.pl'}/>
                        <RoundedLocationButton
                            address={marker.address}
                            latitude={marker.latitude}
                            longitude={marker.longitude}
                        />
                    </View>
                </ScrollView>
            </Main>
        </WithHeaderConfig>
    );
}

const styles = {
    image: {
        width: '100%',
        height: ImageHeight,
        ...GeneralStyles.bottom_border_radius,
    },
    container: {
        top: -(ImageHeight / 5),
        left: 0,
        right: 0,
        paddingHorizontal: Layout.paddingHorizontal,
    },
    card: {
        body: {
            borderRadius: GeneralStyles.bottom_border_radius.borderBottomLeftRadius,
            padding: 25,
            ...shadowGenerator(5),
            paddingBottom: ButtonHeight * 0.8,
        },
        title: {
            ...GeneralStyles.text_bold,
        },
        text: {
            ...GeneralStyles.text_regular,
        },
        button: {
            position: 'absolute',
            bottom: (ButtonHeight / 2),
            alignSelf: 'center',
            height: ButtonHeight,
            borderRadius: GeneralStyles.bottom_border_radius.borderBottomLeftRadius / 2,
            overflow: 'hidden',
            ...shadowGenerator(10),
        },
        buttonGradient: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingHorizontal: 40,
        },
        buttonText: {
            color: 'white',
            ...GeneralStyles.text_regular,
        },
    },
    section: {
        ...GeneralStyles.text_bold,
        marginBottom: 5,
    },
    text: {
        ...GeneralStyles.text_regular,
        marginBottom: 40,
    },
};
