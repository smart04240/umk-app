import React from "react";
import {TextInput} from "react-native";
import useDebouncedValue from "../../hooks/useDebouncedValue";

export default function DebouncedInput({value, delay, onDebouncedChange, onChangeText, ...rest}) {
    const [innerValue, setInnerValue] = React.useState(value || '');
    const debouncedValue = useDebouncedValue(innerValue, delay || 500);

    React.useEffect(() => {
        setInnerValue(value);
    }, [value]);

    React.useEffect(() => {
        onDebouncedChange && onDebouncedChange(debouncedValue);
    }, [debouncedValue, onDebouncedChange]);

    const onChange = React.useCallback(value => {
        setInnerValue(value);
        onChangeText && onChangeText(value);
    }, [value, onChangeText]);

    return (
        <TextInput
            {...rest}
            value={innerValue}
            onChangeText={onChange}
        />
    );
};
