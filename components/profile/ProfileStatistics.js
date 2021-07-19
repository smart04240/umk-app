import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/core';
import {Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';

import Actions from "../../redux/Actions";
import API from "../../helpers/API";
import GeneralStyles from '../../constants/GeneralStyles';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';

import Range from '../form/Range';
import Container from "../general/Container";

const ProfileStatistics = props => {
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const user = useSelector(state => state.user);
    const [statistics, setStatistics] = React.useState([]);

    React.useEffect(() => {
        const preparedData = [];

        API.badges.All().then(async response => {
            let data = response.data.data;

            preparedData.push({
                heading: null,
                items: [
                    {
                        label: "Zdobyte odznaki",
                        color: 'orange',
                        data: {
                            type: 'percent',
                            value: `${data?.percentage ?? 0} %`,
                        },
                        link: {screen: Routes.ProfileBadges, label: "Zobacz wszystkie odznaki"}
                    }
                ],
            });

            user?.studies?.forEach(study => {
                const studyPaths = study?.student?.student_grades?.filter(grade => String(grade?.course?.faculty_id) === String(study?.study?.faculty_id));
                const passedPaths = studyPaths?.filter(path => !!path.passes)?.length;
                // const notPassedPaths = studyPaths?.filter(path => !path.passes)?.length;
                const totalPercentForCourses = (passedPaths / studyPaths.length) * 100;

                console.log(study?.study?.id, passedPaths, totalPercentForCourses)

                // ToDo ask przem about courses, means that I ned to take all courses and if yes where I can find them

                preparedData.push({
                    heading: study?.study?.faculty?.name + ' ' + study?.study?.level_of_study_short ?? '',
                    items: [
                        {
                            label: "Zaliczone semestry",
                            color: "purple",
                            data: {type: "range", value: 3, total: 6}
                        },
                        {
                            label: "Zaliczone kursy",
                            data: {type: "percent", value: `${totalPercentForCourses} %`}
                        }
                    ]
                });

                study?.student?.student_grades.forEach(grade => {

                });
            });
            console.log(preparedData)
            dispatch(Actions.Badges.All(data?.badges));
        });

        setStatistics(preparedData)
    }, []);

    return (
        <Container>
            <Text>
                {JSON.stringify(user?.studies[1], null, 4)}
            </Text>
            {statistics?.map(({heading, items}, index) => (
                <View key={index} style={{marginBottom: 7}}>
                    {heading &&
                    <Text style={[GeneralStyles.text_bold, {color: ThemeStyles.dark_text, marginBottom: 22}]}>
                        {heading}
                    </Text>
                    }

                    {items && !!items.length &&
                    items.map((range, index) => (
                        <View key={index}>
                            <Range {...range} />
                            {range?.link &&
                            <TouchableOpacity style={{top: -10}} onPress={() => navigation.navigate(range.link.screen)}>
                                <Text style={[GeneralStyles.text_bold, {
                                    color: ThemeStyles.blue_text,
                                    textAlign: "right"
                                }]}>
                                    {range.link.label}
                                </Text>
                            </TouchableOpacity>
                            }
                        </View>
                    ))
                    }
                </View>
            ))}
        </Container>
    )
}


export default ProfileStatistics;
