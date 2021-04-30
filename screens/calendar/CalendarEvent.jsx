import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";

export const CalendarEvent = () => {
    const ThemeStyles = useThemeStyles();

    const id = 1;
    const title = "Tytuł zadania na dwie linijki tekstu";
    const category = 2;
    const address = "Aula 12";
    const date_time = "12.03.2021, 14:00";

    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";


    const attachments = [
        {name: "Załącznik 1", link: "link"},
        {name: "Załącznik 2", link: "link 2"}
    ];

    const task_info = {id, title, category, address, date_time};
    return (
        <MainWithNavigation>
            <ContainerWithScroll
                header={
                    <>
                        <TopBoxWithContent {...task_info}/>
                        <Image
                            source={require('../../assets/stockimage.png')}
                            style={{
                                height: 200,
                                width: '100%',
                                backgroundColor: 'white',
                                top: -15,

                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                            }}
                        />
                    </>
                }
            >
                {content && (
                    <Text style={[
                        styles.content,
                        {color: ThemeStyles.dark_text},
                    ]}>
                        {content}
                    </Text>
                )}
                <Attachments attachments={attachments}/>
            </ContainerWithScroll>
        </MainWithNavigation>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9
    },
    bottom_button: {
        flexGrow: 1,
        flexShrink: 1,
        marginHorizontal: 5
    },
    content: {
        ...GeneralStyles.text_regular,
        marginBottom: 20
    },
});
