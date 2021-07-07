import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from '../../constants/Translations';
import useThemeStyles from "../../hooks/useThemeStyles";

import API from "../../helpers/API";
import Badge from '../badge/Badge';
import BadgeWithRange from '../badge/BadgeWithRange';
import Container from "../general/Container";
import useTranslator from "../../hooks/useTranslator";

const ProfileInformation = props => {
    const translate = useTranslator();
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();
    const user = useSelector(state => state.user);
    const [promoted_badges, setPromotedBadges] = useState([]);

    const started_badges = [
        {
            id: 114,
            name: "Odznaka srebrna",
            range_props: {
                label: "zaliczone 3 z 6 przedmiotów!",
                color: "purple",
                hide_value_label: true,
                data: {type: "range", value: 3, total: 6}
            }
        },
        {
            id: 221,
            name: "Odznaka złota",
            range_props: {
                label: "zaliczone 5 z 6 przedmiotów!",
                color: "purple",
                hide_value_label: true,
                data: {type: "range", value: 5, total: 6}
            }
        },
        {
            id: 212,
            name: "Odznaka złota",
            range_props: {
                label: "zaliczone 5 z 6 przedmiotów!",
                color: "purple",
                hide_value_label: true,
                data: {type: "range", value: 5, total: 6}
            }
        },
    ];

    // Load badges the student has earned
    useEffect(() => {
        API.badges.getPromoted().then(response => {
            const badges = response.data.data;
            setPromotedBadges(badges);
        });
    }, []);

    const title_styles = [GeneralStyles.text_bold, {color: ThemeStyles.dark_text}];

    return (
        <Container>
            <View style={[GeneralStyles.row_ac, {marginBottom: 28}]}>
                <Text style={title_styles}>{translate(Translations.IndexNumber)}</Text>
                <Text style={[GeneralStyles.text_regular, {marginLeft: 65, color: ThemeStyles.dark_text}]}>
                    {user?.index || ''}
                </Text>
            </View>
            {started_badges && !!started_badges.length && (
                <View>
                    <Text style={[...title_styles, {marginBottom: 28}]}>
                        {translate(Translations.StartedBudges)}
                    </Text>

                    {started_badges.map(badge => <BadgeWithRange key={badge.id} {...badge} />)}
                </View>
            )}
            {promoted_badges && !!promoted_badges.length && (
                <View>
                    <Text style={[...title_styles, {marginBottom: 28}]}>
                        {translate(Translations.OtherBudgesToEarn)}
                    </Text>

                    <View style={[GeneralStyles.row_wrap, {justifyContent: 'space-between'}]}>
                        {promoted_badges.map(badge => <Badge key={badge?.id} badge={badge} active={true} promoted={true}/>)}
                    </View>
                </View>
            )}
        </Container>
    )
}


export default ProfileInformation;
