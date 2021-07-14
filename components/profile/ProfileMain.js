import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Easing, Platform, Text, TouchableOpacity, View} from "react-native";
import Translations from '../../constants/Translations';
import Layout from "../../constants/Layout";
import Routes from "../../constants/Routes";
import Button from '../form/Button';
import ProfileAvatar from './ProfileAvatar';
import WithHeaderConfig from "../layout/WithHeaderConfig";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslator from "../../hooks/useTranslator";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import Dropdown from "../form/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import Fonts from "../../constants/Fonts";
import * as ImagePicker from "expo-image-picker";
import API from "../../helpers/API";
import makeFormData from "../../helpers/makeFormData";
import Actions from "../../redux/Actions";
import * as FileSystem from "expo-file-system";

const EMPTY_COLOR = '#fddaf8';
const PROGRESS_COLOR = '#A92895';

const statusRules = [
    'graduated_end_of_study',
    'graduated_diploma'
];
// Function for counting ects points in percents
/*
* years(string with duration to end of studies)
* userEcts(current user ects points)
* max ects points per year is 60
* depending on status rules and user study status we display to user 99 or 100 percent of ects
* */
const percentCounter = (years, userEcts, status) => {
    if (!years || !userEcts)
        return;

    const totalPercent = userEcts / (60 * years.charAt(0)) * 100;

    if (totalPercent > 99 && statusRules.includes(status))
        return "99";

    return Math.floor(Number(totalPercent));
}

const ProfileMain = () => {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const avatar_size = Math.floor(Layout.width * 0.308);
    const ThemeStyles = useThemeStyles();
    const user = useSelector(state => state.user);
    const locale = useSelector(state => state.app.locale);
    const [studies, setStudies] = React.useState([]);
    const [studentData, setStudentData] = React.useState([]);
    const [selectedPath, setSelectedPath] = React.useState(null);
    const selectedData = studentData?.find(gradDate => gradDate.study_id === selectedPath);

    React.useEffect(() => {
        let preparedStudies = [];
        let preparedStudentData = [];

        if (!!user?.studies?.length) {
            user?.studies?.forEach((study) => {
                preparedStudies.push({
                    label: study?.study?.name,
                    value: study?.study?.id
                });

                if (!study?.ects && !!study?.graduation_dates) {
                    study.graduation_dates.forEach((item) => {
                        preparedStudentData.push({
                            date: item?.planowana_data_ukonczenia,
                            study_id: study?.study?.id,
                        });
                    });
                }

                if (!!study?.graduation_dates && !!study?.ects) {
                    study.graduation_dates.forEach((item) => {
                        preparedStudentData.push({
                            date: item?.planowana_data_ukonczenia,
                            study_id: study?.study?.id,
                            ects: percentCounter(study?.study?.duration, study?.ects, study?.status),
                        });
                    });
                }

                if (!!study?.ects && !study?.graduation_dates) {
                    preparedStudentData.push({
                        study_id: study?.study?.id,
                        ects: percentCounter(study?.study?.duration, study?.ects, study?.status),
                    })
                }
            });

            setStudies(preparedStudies);
            setStudentData(preparedStudentData);
        }
    }, [user]);

    const info = React.useMemo(() => {
        return [
            {label: translate(Translations.ECTSEarned), value: !!selectedData?.ects ? (selectedData?.ects + ' %') : '0 %'},
            {label: translate(Translations.EndOfStudies), value: !!selectedData?.date ? moment.duration(moment().diff(selectedData?.date)).humanize(false, {M: 99999}) : 'N/A'}
        ]
    },[selectedPath, locale]);

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let selectedImage = await FileSystem.getInfoAsync(result?.uri);

            API.user.update(makeFormData({avatar: {
                    name: selectedImage?.uri?.split('/')[11],
                    size: selectedImage?.size,
                    uri: selectedImage?.uri,
                }})).then(response => {
                dispatch(Actions.User.Update({user_name: user?.nick_name, avatar: response?.data?.avatar}));
            });
        }
    };


    return (
        <WithHeaderConfig borderless={true}>
            <View style={{padding: 15, backgroundColor: theme.box_bg}}>
                <View style={{flexDirection: "row", marginBottom: 18}}>
                    <TouchableOpacity onPress={() => pickImage()} style={{flexGrow: 0.5}}>
                        <AnimatedCircularProgress
                            size={160}
                            width={9}
                            fill={selectedData?.ects || 0}
                            duration={900}
                            rotation={0}
                            easing={Easing.out(Easing.ease)}
                            tintColor={PROGRESS_COLOR}
                            backgroundColor={EMPTY_COLOR}
                            lineCap={'round'}
                            children={() => <ProfileAvatar imageSrc={user?.avatar_url} size={avatar_size > 132 ? 132 : avatar_size}/>}
                        />
                    </TouchableOpacity>
                    <View style={{flexGrow: 0.7}}>
                        <Text style={[styles.font_family, styles.big, {color: ThemeStyles.dark_blue_text}]}>{user?.nick_name}</Text>
                        {studies.length === 1 ? (
                            <View style={{
                                width: Layout.width / 2
                            }}>
                                <Text style={[styles.font_family, styles.small, {color: ThemeStyles.dark_blue_text}]}>hasfghjhafjhdjsahjfdshahfjdshfjksahdjsahfjdshajfhjsd</Text>
                            </View>
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
                </View>
                <Button onPress={() => navigation.navigate(Routes.ProfileEdit)} transparent_bg={true}>
                    {translate(Translations.EditProfile)}
                </Button>
            </View>
        </WithHeaderConfig>
    )
}

const styles = {
    circleProgressBar: {
        borderWidth: 8,
        borderRadius: 160,
        height: 160,
        width: 160,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyPart: {
        borderColor: EMPTY_COLOR,
        borderWidth: 8,
        borderRadius: 160,
        height: 160,
        width: 160,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressPart: {
        borderColor: PROGRESS_COLOR,
        borderWidth: 8,
        borderRadius: 160,
        height: 160,
        width: 160,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
};


export default ProfileMain;
