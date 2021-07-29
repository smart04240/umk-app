import React from 'react';
import {Image, Text} from 'react-native';
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";
import {useSelector} from "react-redux";
import {eventsSelectors} from "../../redux/selectors/eventsSelector";
import useTranslator from "../../hooks/useTranslator";
import {HtmlParser} from "../../components/general/HtmlParser";
import Translations from "../../constants/Translations";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export const CalendarEvent = props => {
    const propsEvent = props?.route?.params;
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const remoteEvent = useSelector(state => eventsSelectors.byId(state, propsEvent.id));

    const event = propsEvent?.isSystemEvent ? propsEvent : remoteEvent;

    return (
        <MainWithNavigation>
            <ContainerWithScroll
                header={
                    <>
                        <TopBoxWithContent id={event?.id} event={event}/>
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
                    <HtmlParser
                        html={translate(event.description)}
                    />
                )}
                {!event?.description && (
                    <Text style={[
                        GeneralStyles.text_regular,
                        {
                            color: ThemeStyles.dark_text,
                            marginBottom: 8,
                            textAlign: 'center'
                        }
                    ]}>
                        {translate(Translations.CalendarEmptyEventException)}
                    </Text>
                )}
                {!!event?.files && <Attachments attachments={event.files}/>}
            </ContainerWithScroll>
        </MainWithNavigation>
    );
}
