import React, {useMemo} from 'react';
import {View} from 'react-native';

import InfoCardsStackDot from "./InfoCardsStackDot";
import GeneralStyles from '../../constants/GeneralStyles';

const InfoCardsStackDots = props => {
    const {total_amount, active_index} = props;
    const dots_amount = useMemo(() => total_amount === 2 ? 2 : 4, [total_amount]);

    const dots = useMemo(() => {

        const dots = [];
        for (let i = 0; i < dots_amount; i++) dots.push(i);
        return dots;

    }, [dots_amount]);

    if (!total_amount) return null;

    return (
        <View style={[GeneralStyles.row_ac, {marginTop: 30, justifyContent: "center"}]}>
            {dots.map(dot => <InfoCardsStackDot key={dot} active={dot === active_index}/>)}
        </View>
    )
}


export default InfoCardsStackDots;