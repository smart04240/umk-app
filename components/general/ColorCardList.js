import React from 'react';
import {FlatList} from 'react-native';

export default function ColorCardList({contentContainerStyle, ...rest}) {
    return (
        <FlatList
            contentContainerStyle={[styles, contentContainerStyle]}
            {...rest}
        />
    );
}

const styles = {
    paddingVertical: 10,
};
