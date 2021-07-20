import React from 'react';
import {useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/core';
import {Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import GeneralStyles from '../../constants/GeneralStyles';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';

import Range from '../form/Range';
import Container from "../general/Container";
import {percentCounter} from "../../helpers/ectsCounter";
import useTranslator from "../../hooks/useTranslator";
import Translations from "../../constants/Translations";

const PROGRAMS_PALETTE = [
    {
        id: 0,
        semester: '#AA2869',
        semesterAlternative: '#ffb6d9',
        course: '#0050AA',
        courseAlternative: '#b4d6ff',
    },
    {
        id: 1,
        semester: '#00A550',
        semesterAlternative: '#c7ffe0',
        course: '#FA1414',
        courseAlternative: '#ffb0b0',
    },
    {
        id: 2,
        semester: '#FF8228',
        semesterAlternative: '#ffd9ba',
        course: '#AAD23C',
        courseAlternative: '#efffbf',
    },
];

const ProfileStatistics = () => {
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const translate = useTranslator();
    const user = useSelector(state => state.user);
    const badges = useSelector(state => state.badges);
    const [statistics, setStatistics] = React.useState([]);

    React.useEffect(() => {
        const preparedData = [];

        preparedData.push({
            heading: null,
            items: [
                {
                    label: translate(Translations.EarnedBadges),
                    color: 'orange',
                    data: {
                        type: 'percent',
                        value: `${badges?.percentage ?? 0} %`,
                    },
                    link: {
                        screen: Routes.ProfileBadges,
                        label: translate(Translations.ViewAllBadges)
                    }
                }
            ],
        });

        user?.studies?.forEach?.((study, index) => {
            const progressColor = PROGRAMS_PALETTE[index];
            const totalSemesters = Number(study?.study?.duration?.charAt(0)) * 2;

            preparedData.push({
                heading: study?.study?.faculty?.name + ' ' + study?.study?.level_of_study_short ?? '',
                items: [
                    {
                        label: translate(Translations.EndedSemesters),
                        color: progressColor.semester,
                        colorAlternative: progressColor.semesterAlternative,
                        data: {
                            type: "range",
                            value: study?.graduation_dates?.filter(gradDate => gradDate?.is_passes === true)?.length,
                            total: totalSemesters
                        }
                    },
                    {
                        label: translate(Translations.PassedCourses),
                        color: progressColor.course,
                        colorAlternative: progressColor.courseAlternative,
                        data: {
                            type: "percent",
                            value: `${percentCounter(study?.study?.duration, study?.ects, study?.status)} %`
                        }
                    }
                ]
            });
        });

        setStatistics(preparedData);
    }, [translate]);

    return (
        <Container>
            {statistics?.map(({heading, items}, index) => (
                <View key={index} style={{marginBottom: 7}}>
                    {heading && (
                        <Text style={[GeneralStyles.text_bold, {color: ThemeStyles.dark_text, marginBottom: 22}]}>
                            {heading}
                        </Text>
                    )}
                    {items && !!items.length && items.map((range, index) => (
                        <View key={index}>
                            <Range {...range} />
                            {range?.link && (
                                <TouchableOpacity style={{top: -10}} onPress={() => navigation.navigate(range.link.screen)}>
                                    <Text style={[GeneralStyles.text_bold, {
                                        color: ThemeStyles.blue_text,
                                        textAlign: "right"
                                    }]}>
                                        {range.link.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </Container>
    )
}


export default ProfileStatistics;
