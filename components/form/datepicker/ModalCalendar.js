import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import shadowGenerator from "../../../helpers/shadowGenerator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useThemeStyles from "../../../hooks/useThemeStyles";
import DatePickerCalendar from "./DatePickerCalendar";
import GeneralStyles from "../../../constants/GeneralStyles";

export const ModalCalendar = ({show, setClose, modalTitle, calendarOnChange, initialCalendarDate}) => {
    const theme = useThemeStyles();

    return(
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
        >
            <View
                style={styles.modalInner}
            >
                <View
                    style={[
                        styles.modal,
                        {
                            backgroundColor: theme.main_bg,
                        }
                    ]}
                >
                    <View
                        style={styles.modalHeader}
                    >
                        <View
                            style={styles.title}
                        >
                            <Text
                                style={[
                                    GeneralStyles.text_regular,
                                    {
                                        left: 15,
                                        color: theme.dark_text,
                                    }
                                ]}
                            >
                                {modalTitle}
                            </Text>
                        </View>
                        <View
                            style={styles.buttonContainer}
                        >
                            <TouchableOpacity
                                onPress={setClose}
                                style={styles.button}
                            >
                                <MaterialCommunityIcons
                                    name={'close-circle'}
                                    size={22}
                                    color={theme.icon_color}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <DatePickerCalendar
                        init_iso_date={initialCalendarDate}
                        onChange={calendarOnChange}
                        container={{
                            position: 'relative',
                            top: 0,
                            marginTop: 10,
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
};

const styles = {
    modalInner: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        padding: 8,
        position: 'absolute',
        borderRadius: 10,
        ...shadowGenerator(5),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.1,
    },
    button: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }
};
