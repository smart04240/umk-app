import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";
import {useSelector} from "react-redux";
import {eventsSelectors} from "../../redux/selectors/eventsSelector";

export const CalendarEvent = props => {
    const id = props?.route?.params?.id;
    const ThemeStyles = useThemeStyles();
    const event = useSelector(state => eventsSelectors.byId(state, id));

    return (
        <MainWithNavigation>
            <ContainerWithScroll
                header={
                    <>
                        <TopBoxWithContent id={id}/>
                        {!!props.src && (
                            <Image
                                source={props.src}
                                style={{
                                    height: 200,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    top: -15,

                                    borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}
                            />
                        )}
                    </>
                }
            >
                {!!event?.description && (
                    <Text style={[
                        styles.content,
                        {color: ThemeStyles.dark_text},
                    ]}>
                        {event.description}
                    </Text>
                )}
                {!!event?.files && <Attachments attachments={event.files}/>}
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
