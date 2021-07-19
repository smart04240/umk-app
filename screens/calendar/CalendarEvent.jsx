import React from 'react';
import {Image} from 'react-native';
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";
import {useSelector} from "react-redux";
import {eventsSelectors} from "../../redux/selectors/eventsSelector";
import useTranslator from "../../hooks/useTranslator";
import {HtmlParser} from "../../components/general/HtmlParser";

export const CalendarEvent = props => {
    const propsEvent = props?.route?.params;
    const translate = useTranslator();
    const remoteEvent = useSelector(state => eventsSelectors.byId(state, propsEvent.id));

    const event = propsEvent?.isSystemEvent ? propsEvent : remoteEvent;

    return (
        <MainWithNavigation>
            <ContainerWithScroll
                header={
                    <>
                        <TopBoxWithContent id={event.id} event={event}/>
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
                {!!event?.files && <Attachments attachments={event.files}/>}
            </ContainerWithScroll>
        </MainWithNavigation>
    );
}
