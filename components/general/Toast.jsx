import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import shadowGenerator from "../../helpers/shadowGenerator";
import useThemeStyles from "../../hooks/useThemeStyles";
import Constants from "expo-constants";

export const Toast = forwardRef((props, ref) => {
    const statusBarHeight = Constants.statusBarHeight;
    const theme = useThemeStyles();

    const toastContainerHeight = 150;

    const animationValue = toastContainerHeight + statusBarHeight;

    const animatedValue = useRef(new Animated.Value(-animationValue)).current;
    // for showing toast you need put toast ref like props
    // and call showToast where you need
    useImperativeHandle(ref, () => ({
        showToast,
    }));

    const showToast = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true
        }).start(() => hideToast());
    }

    const hideToast = () => {
        setTimeout(() => {
            Animated.timing(animatedValue, {
                toValue: -animationValue,
                duration: 550,
                useNativeDriver: true
            }).start();
        }, 8000);
    }

    return(
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    height: animationValue,
                    transform: [{
                        translateY: animatedValue
                    }],
                }
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.toast,
                    {
                        backgroundColor: theme.main_bg,
                        borderWidth: 5,
                        borderColor: props?.toastColor || theme.main_bg
                    }
                ]}
            >
                <View style={{flex:1}}>
                    <Text style={{
                        textAlign: 'center',
                        color: theme.dark_text
                    }}>
                        {props.message}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
});

const styles = {
    toastContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 99,
        top: -60,
        left:0,
        right:0,
        alignItems: 'flex-end',
        justifyContent:  'flex-end'
    },
    toast: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        borderRadius: 10,
        ...shadowGenerator(10)
    },
    toastElement: {
        height: 25,
        width: 25,
        borderRadius: 50,
        marginRight: 15,
    }
};
