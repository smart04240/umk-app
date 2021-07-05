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
    const [gradDates, setGradDates] = React.useState([]);
    const [selectedPath, setSelectedPath] = React.useState(null);

    const ECTS = "59%";

    React.useEffect(() => {
        user?.studies?.forEach((study) => {
            setStudies(oldVal => [...oldVal, {
                label: study?.study?.name,
                value: study?.study?.id
            }]);

            if (!!study?.graduation_date) {
                setGradDates(oldVal => [...oldVal, {
                    date: study?.graduation_date?.planowana_data_ukonczenia,
                    study_id: study?.study?.id,
                    id: study?.graduation_date?.id
                }]);
            }
        });
    }, [user]);

    const info = React.useMemo(() => {
        const endDate = gradDates?.find(gradDate => gradDate.study_id === selectedPath)?.date;

        return [
            {label: translate(Translations.ECTSEarned), value: ECTS},
            {label: translate(Translations.EndOfStudies), value: !!endDate && moment.duration(moment().diff(endDate)).humanize(false, {M: 99999})}
        ]
    },[selectedPath, locale]);

    return (
        <View style={{flexGrow: 1}}>
            <Text style={[styles.font_family, styles.big, {color: ThemeStyles.dark_blue_text}]}>{user?.nick_name}</Text>
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
