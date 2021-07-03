import React, {useEffect, useState} from "react";
import {Animated, Dimensions, KeyboardAvoidingView, Platform, View} from "react-native";

export const BottomModal = ({children, show, onStartShouldSetResponder, backdropStyles, modalStyles, hasButtonOutside, ...restButtonsProps}) => {
    const [animationDriver] = useState(new Animated.Value(0));

    useEffect(() => {
        if(show) {
            Animated.timing(animationDriver, {
                toValue: 1,
                duration: 400
            }).start();
        } else {
            Animated.timing(animationDriver, {
                toValue: 0,
                duration: 400
            }).start();
        }
    }, [show])

    const backdropOpacity = animationDriver.interpolate({
        inputRange: [0, 1,],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        useNativeDriver: true
    });

    const modalPosition = animationDriver.interpolate({
        inputRange: [0, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
        outputRange: [Dimensions.get('window').height, 105, 75, 50, 30, 15, 5, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    return (
        show && (
            <Animated.View
                onStartShouldSetResponder={onStartShouldSetResponder}
                style={[styles.backdrop, backdropStyles ? backdropStyles : '', {opacity: backdropOpacity}]}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View
                        style={{
                            marginBottom: 30
                        }}
                    >
                        <Animated.View style={[styles.modal, modalStyles ? modalStyles : '', {
                            transform: [
                                {
                                    translateY: modalPosition,
                                }
                            ]
                        }]}
                        >
                            {children}
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
        )
    )
}

const styles = {
    backdrop: {
        flex: 1,
        zIndex: 10,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.35)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 8,
        marginBottom: 50,
    }
}
