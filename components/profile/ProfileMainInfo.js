import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useSelector} from 'react-redux';

import Fonts from '../../constants/Fonts';
import Translations from '../../constants/Translations';

import useThemeStyles from '../../hooks/useThemeStyles';

import Dropdown from "../form/Dropdown";
import useTranslator from "../../hooks/useTranslator";
import moment from "moment";

const ProfileMainInfo = () => {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const user = useSelector(state => state.user);
    const locale = useSelector(state => state.app.locale);
    const [studies, setStudies] = React.useState([]);
    const [studentData, setStudentData] = React.useState([]);
    const [selectedPath, setSelectedPath] = React.useState(null);

    const name = `${user?.first_name || ''} ${user?.last_name || ''}`;

    React.useEffect(() => {
        if (!!user?.studies?.length) {
            user?.studies?.forEach((study) => {
                setStudies(oldVal => [...oldVal, {
                    label: study?.study?.name,
                    value: study?.study?.id
                }]);

                if (!!study?.graduation_dates) {
                    study.graduation_dates.forEach((item) => {
                        setStudentData(oldVal => [...oldVal, {
                            date: item?.planowana_data_ukonczenia,
                            study_id: study?.study?.id,
                            ects: study?.ects,
                            id: item?.id
                        }]);
                    });
                }
            });
        }
    }, [user]);

    const info = React.useMemo(() => {
        const selectedData = studentData?.find(gradDate => gradDate.study_id === selectedPath);

        return [
            {label: translate(Translations.ECTSEarned), value: !!selectedData?.ects ? (selectedData?.ects + ' %') : 'N/A'},
            {label: translate(Translations.EndOfStudies), value: !!selectedData?.date ? moment.duration(moment().diff(selectedData?.date)).humanize(false, {M: 99999}) : 'N/A'}
        ]
    },[selectedPath, locale]);

    return (
        <View style={{flexGrow: 1}}>
            <Text style={[styles.font_family, styles.big, {color: ThemeStyles.dark_blue_text}]}>{name}</Text>
            {studies.length === 1 ? (
                <Text style={[styles.font_family, styles.big, {color: ThemeStyles.dark_blue_text}]}>{studies[0]?.label}</Text>
            ) : (
                <Dropdown
                    name="study_path"
                    options={studies}
                    onChange={e => setSelectedPath(e.value)}
                />
            )}
            <View>
                {info.map((item, index) => {
                    if (!!item.value)
                        return (
                            <View key={index} style={styles.textContainer}>
                                <Text
                                    style={[styles.font_family, styles.small, {color: ThemeStyles.dark_blue_text}]}>{item.label}</Text>
                                <Text
                                    style={[styles.font_family, styles.medium, {color: ThemeStyles.dark_blue_text}]}>{item.value}</Text>
                            </View>
                        )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    font_family: {
        fontFamily: Fonts.ProximaNova.Regular
    },
    big: {
        fontSize: 20,
        marginBottom: 19
    },
    medium: {
        fontSize: 18
    },
    small: {
        fontSize: 14
    },
    textContainer: {
        marginVertical: 5,
    }
});


export default ProfileMainInfo;
