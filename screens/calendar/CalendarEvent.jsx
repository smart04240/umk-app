import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";

export const CalendarEvent = props => {
    const id = props?.route?.params?.id;
    const ThemeStyles = useThemeStyles();
    const [data, setData] = React.useState({});

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
                {!!data?.description && (
                    <Text style={[
                        styles.content,
                        {color: ThemeStyles.dark_text},
                    ]}>
                        {data.description}
                    </Text>
                )}
                {!!data?.files && <Attachments attachments={data.files}/>}
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
