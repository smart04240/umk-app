import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from '../../constants/Translations';
import useThemeStyles from "../../hooks/useThemeStyles";

import API from "../../helpers/API";
import Badge from '../badge/Badge';
import BadgeWithRange from '../badge/BadgeWithRange';
import Container from "../general/Container";
import useTranslator from "../../hooks/useTranslator";
import {ScrollView} from "react-native-gesture-handler";

const ProfileInformation = props => {
    const translate = useTranslator();
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();
    const user = useSelector(state => state.user);
    const [promoted_badges, setPromotedBadges] = useState([]);
    const [started_badges, setStartedBadges] = useState([]);

    // Load badges the student promoted
    useEffect(() => {
        API.badges.getPromoted().then(response => {
            setPromotedBadges(response.data.data);
        });
        API.badges.getStartedEarning().then(response => {
            setStartedBadges(response.data.data);
        })
    }, []);

    const title_styles = [GeneralStyles.text_bold, { color: ThemeStyles.dark_text }];

    return (
        <Container>
            <View style={[GeneralStyles.row_ac, { marginBottom: 28 }]}>
                <Text style={title_styles}>{translate(Translations.IndexNumber)}</Text>
                <Text style={[GeneralStyles.text_regular, { marginLeft: 65, color: ThemeStyles.dark_text }]}>
                    {user?.index || ''}
                </Text>
            </View>
            {started_badges && !!started_badges.length && (
                <View>
                    <Text style={[...title_styles, { marginBottom: 28 }]}>
                        {translate(Translations.StartedBudges)}
                    </Text>

                    {started_badges.map((badge, i) => <BadgeWithRange key={i} badge={badge} />)}
                </View>
            )}
            {promoted_badges && !!promoted_badges.length && (
                <View>
                    <Text style={[...title_styles, { marginBottom: 28 }]}>
                        {translate(Translations.OtherBudgesToEarn)}
                    </Text>

                    <View style={[GeneralStyles.row_wrap, { justifyContent: 'space-between' }]}>
                        {promoted_badges.map(badge => <Badge key={badge?.id} badge={badge} active={true} promoted={true} />)}
                    </View>
                </View>
            )}
        </Container>
    )
}


export default ProfileInformation;
