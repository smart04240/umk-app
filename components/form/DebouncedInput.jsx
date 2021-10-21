import React, {useRef} from "react";
import {ActivityIndicator, TextInput, TouchableOpacity} from "react-native";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import {Entypo} from "@expo/vector-icons";
import useThemeStyles from "../../hooks/useThemeStyles";

export default function DebouncedInput({
    value,
    delay,
    onDebouncedChange,
    onChangeText,
    withResetButton,
    loading,
    ...rest
}) {
    const theme = useThemeStyles();
    const [innerValue, setInnerValue] = React.useState(value || '');
    const debouncedValue = useDebouncedValue(innerValue, delay || 500);
    const firstUpdate = useRef(true);

    React.useEffect(() => {
        setInnerValue(value);
    }, [value]);

    React.useEffect(() => {
        !firstUpdate.current && onDebouncedChange && onDebouncedChange(debouncedValue);
    }, [debouncedValue]);

    const onChange = value => {
        if (firstUpdate.current)
            firstUpdate.current = false;
        setInnerValue(value);
        onChangeText && onChangeText(value);
    };

    const reset = () => onChange('');

    return (
        <>
            <TextInput
                {...rest}
                value={innerValue}
                onChangeText={onChange}
            />

            {(loading || (withResetButton && !!innerValue)) && (
                <TouchableOpacity
                    hitSlop={{
                        bottom: 20,
                        left: 20,
                        right: 20,
                        top: 50,
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        justifyContent: 'center',
                        paddingRight: 20,
                    }}
                    disabled={loading}
                    onPress={reset}
                >
                    {loading && <ActivityIndicator size={'small'} color={theme.blue_text}/>}
                    {!loading && <Entypo size={16} name={'cross'} color={theme.blue_text}/>}
                </TouchableOpacity>
            )}
        </>
    );
};
