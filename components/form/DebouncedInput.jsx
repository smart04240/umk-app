import React, {useRef} from "react";
import {TextInput} from "react-native";
import useDebouncedValue from "../../hooks/useDebouncedValue";

export default function DebouncedInput({value, delay, onDebouncedChange, onChangeText, ...rest}) {
    const [innerValue, setInnerValue] = React.useState(value || '');
    const debouncedValue = useDebouncedValue(innerValue, delay || 500);
    const firstUpdate = useRef(true);

    React.useEffect(() => {
        setInnerValue(value);
    }, [value]);

    React.useEffect(() => {
        !firstUpdate.current && onDebouncedChange && onDebouncedChange(debouncedValue);
    }, [debouncedValue, onDebouncedChange]);

    const onChange = value => {
        if (firstUpdate.current)
            firstUpdate.current = false;
        setInnerValue(value);
        onChangeText && onChangeText(value);
    };

    return (
        <TextInput
            {...rest}
            value={innerValue}
            onChangeText={onChange}
        />
    );
};
