import React, {useMemo, useState} from 'react';
import {Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import {isFunction} from '../../helpers/functions';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import useTranslator from "../../hooks/useTranslator";
import shadowGenerator from "../../helpers/shadowGenerator";

const Dropdown = ({init_value, label, name, options, error_message, onChange, ...props}) => {
    const ThemeStyles = useThemeStyles();
    const translate = useTranslator();
    const placeholder = props.placeholder || translate(Translations.ChooseOneOption);
    const [value, setValue] = useState(init_value || null);
    const [open, setOpen] = useState(false);

    const value_label = useMemo(() => (options?.find?.(item => item.value === value)?.label || placeholder), [value, options]);

    const onOptionPress = value => {
        setValue(value);
        isFunction(onChange) && onChange({name, value});
        setOpen(false);
    };

    return (
        <>
            <View style={[
                {marginBottom: 8},
                props.container_style,
            ]}>
                {label && (
                    <Text style={[
                        GeneralStyles.text_regular,
                        {color: ThemeStyles.dark_text, marginBottom: 8}
                    ]}>
                        {label}
                    </Text>
                )}
                <View style={[
                    styles.box,
                    {borderColor: ThemeStyles.blue_text},
                    props.box_style,
                ]}>
                    <TouchableOpacity onPress={() => setOpen(!open)}>
                        <View style={[GeneralStyles.row_ac]}>
                            <Text style={[
                                GeneralStyles.text_regular,
                                styles.value_label,
                                {color: ThemeStyles.dark_text},
                                props.value_label_style,
                            ]}>
                                {value_label}
                            </Text>
                            <FontAwesome
                                style={{marginLeft: 8}}
                                name={"angle-down"}
                                size={24}
                                color={ThemeStyles.icon_color}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {!!error_message && (
                    <Text style={styles.error_message}>
                        {error_message}
                    </Text>
                )}
            </View>

            <Modal
                visible={open}
                transparent
                animationType={"fade"}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            backgroundColor: ThemeStyles.main_bg,
                            borderRadius: 10,
                            minHeight: 50,
                            maxHeight: 300,
                            width: Dimensions.get('window').width - 100,
                            ...shadowGenerator(3)
                        }}
                    >
                        <View
                            style={styles.buttonContainer}
                        >
                            <TouchableOpacity
                                onPress={() => setOpen(false)}
                                style={styles.button}
                            >
                                <MaterialCommunityIcons
                                    name={'close-circle'}
                                    size={22}
                                    color={ThemeStyles.icon_color}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={{
                                padding: 20,
                            }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 30
                            }}
                        >
                            {(options && !!options.length && !!open) && options.map((opt, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onOptionPress(opt.value)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: ThemeStyles.blue_text,
                                        borderRadius: 5,
                                        marginVertical: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        width: '100%'
                                    }}
                                >
                                    {!!opt.color && (
                                        <View
                                            style={{
                                                height: 10,
                                                width: 10,
                                                marginRight: 10,
                                                borderRadius: 20,
                                                backgroundColor: opt?.color
                                            }}
                                        />
                                    )}
                                    <Text style={[
                                        GeneralStyles.text_regular,
                                        styles.option_text,
                                        {color: ThemeStyles.blue_text},
                                        props.option_text_style,
                                    ]}>
                                        {opt.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1
    },
    box_open: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomColor: Colors.BlueRgba(0),
    },
    value_label: {
        flexWrap: "wrap",
        flex: 1
    },
    error_message: {
        ...GeneralStyles.text_regular,
        color: Colors.Red,
        marginTop: 7
    },
    options_box: {
        maxHeight: 120,
        position: "absolute",
        zIndex: 10,
        elevation: 8,
        left: 0,
        top: "100%",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderTopWidth: 0.4,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    option_text: {
        paddingVertical: 5,
        fontSize: 19,
    },
    buttonContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    button: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }
})


export default Dropdown;
