import React from 'react';
import {TouchableOpacity} from 'react-native';

// const magnifier = require('../../assets/images/magnifier.png');

export default function (props) {
    return (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => props.navigation.navigate('map_search')}>
            {/* <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={magnifier} /> */}
        </TouchableOpacity>
    );
};
