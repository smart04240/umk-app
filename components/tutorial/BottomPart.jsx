import React from 'react';
import shadowGenerator from "../../helpers/shadowGenerator";
import {Text, TouchableOpacity, View} from "react-native";
import useThemeStyles from "../../hooks/useThemeStyles";
import InfoCardsStackDots from "../info-card/InfoCardsStackDots";

export default function BottomPart({items, currentIndex, leftButtonOnPress, rightButtonOnPress, leftButtonLabel, rightButtonLabel}) {
    const theme = useThemeStyles();

    return(
        <View
            style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                flex: 0.5,
                padding: 20,
                justifyContent: 'center',
                backgroundColor: theme.box_bg,
                flexDirection: 'column',
                ...shadowGenerator(5)
            }}
        >
            <View
                style={{
                    flex: 0.9,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flex: 0.7,
                        paddingTop: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 19,
                            marginBottom: 20,
                            textAlign: 'center',
                            color: theme.dark_blue_text
                        }}
                    >
                        Twój profil
                    </Text>
                    <Text
                        style={{
                            width: 300,
                            textAlign: 'center',
                            color: theme.dark_blue_text
                        }}
                    >
                        W zakładce „Twój profil” znajdziesz informacje zarówno o swoich statystykach, jak i zdobytych
                        odznakach.
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.3
                    }}
                >
                    <InfoCardsStackDots
                        total_amount={items.length}
                        active_index={currentIndex}
                    />
                </View>
            </View>
            <View
                style={{
                    flex: 0.1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    onPress={leftButtonOnPress}
                    style={{
                        opacity: 0.7
                    }}
                >
                    <Text
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.blue_text,
                            color: theme.blue_text
                        }}
                    >
                        {leftButtonLabel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={rightButtonOnPress}
                    style={{
                        opacity: 0.7
                    }}
                >
                    <Text
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.blue_text,
                            color: theme.blue_text
                        }}
                    >
                        {rightButtonLabel}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}