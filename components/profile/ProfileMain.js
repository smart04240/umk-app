import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Dimensions, Easing, Platform, Text, TouchableOpacity, View} from "react-native";
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
import {percentCounter, statusRules} from "../../helpers/ectsCounter";

const PROGRESS_COLORS = [
    // Matematyki i Informatyki
    { id: 1000000000, color: '#AAD23C', alternative: '#c5e99a'},
    // Fizyki, Astronomii i Informatyki Stosowanej
    { id:  800000000, color: '#AAD23C', alternative: '#c5e99a'},
    // Chemii
    { id:  600000000,  color: '#AAD23C', alternative: '#c5e99a'},

    //Sztuk Pięknych
    { id: 1400000000, color: '#FF8228', alternative: '#ffc597' },

    // Farmaceutyczny
    { id: 1700000000, color: '#FA1414', alternative: '#ffa6a6' },
    // Lekarski
    { id: 1600000000, color: '#FA1414', alternative: '#ffa6a6' },
    // Nauk o Zdrowiu
    { id: 1800000000, color: '#FA1414', alternative: '#ffa6a6' },

    // Biologii i Ochrony Środowiska (2012-2019)
    { id: 2100000000, color: '#00A550', alternative: '#abffd0' },
    // Nauk o Ziemi i Gospodarki Przestrzennej
    { id: 2800000019, color: '#00A550', alternative: '#abffd0' },
    // Nauk Biologicznych i Weterynaryjnych
    { id: 2600000019, color: '#00A550', alternative: '#abffd0' },

    // Teologiczny
    { id: 1500000000, color: '#00AFFA', alternative: '#a5e9ff' },
    // Nauk Historycznych
    { id: 1200000000, color: '#00AFFA', alternative: '#a5e9ff' },
    // Humanistyczny
    { id: 2500000019, color: '#00AFFA', alternative: '#a5e9ff' },

    // Prawa i Administracji
    { id: 1300000000, color: '#AA2896', alternative: '#ffd0f9' },
    // Filozofii i Nauk Społecznych
    { id: 2400000019, color: '#AA2896', alternative: '#ffd0f9' },
    // Nauk o Polityce i Bezpieczeństwie
    { id: 2700000019, color: '#AA2896', alternative: '#ffd0f9' },
    // Nauk Ekonomicznych i Zarządzania
    { id: 1100000000, color: '#AA2896', alternative: '#ffd0f9' },
];

const Info = ({info}) => {
    const theme = useThemeStyles();

    return(
        <View>
            {info?.map((item, index) => {
                if (!!item.value)
                    return (
                        <View key={index} style={styles.textContainer}>
                            <Text
                                style={[styles.font_family, styles.small, {color: theme.dark_blue_text}]}>{item.label}</Text>
                            <Text
                                style={[styles.font_family, styles.medium, {color: theme.dark_blue_text}]}>{item.value}</Text>
                        </View>
                    )
            })}
        </View>
    )
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
    const [selectedPath, setSelectedPath] = React.useState(user.studies?.[0]?.study?.id || null);
    const [facultyId, setFacultyId] = React.useState(null);
    const selectedData = studentData?.find(gradDate => gradDate.study_id === selectedPath);
    const progressColor = PROGRESS_COLORS.find(color => Number(color?.id) === Number(facultyId));

    React.useEffect(() => {
        let preparedStudies = [];
        let preparedStudentData = [];

        if (!!user?.studies?.length) {
            user?.studies?.forEach((study) => {
                preparedStudies.push({
                    label: study?.study?.name,
                    value: study?.study?.id
                });

                if (!!study?.ects || !!study?.graduation_dates) {
                    preparedStudentData.push({
                        date: study?.graduation_dates.find((item) => !!item?.planowana_data_ukonczenia)?.planowana_data_ukonczenia,
                        study_id: study?.study?.id,
                        ects: percentCounter(study?.study?.duration, study?.ects, study?.status),
                        status: study?.status
                    });
                    setFacultyId(study?.study?.faculty?.usos_id);
                }
            });

            setStudies(preparedStudies);
            setStudentData(preparedStudentData);
        }
    }, [user]);

    const info = React.useMemo(() => {
        return [
            {label: translate(Translations.ECTSEarned), value: !!selectedData?.ects ? (selectedData?.ects + ' %') : '0 %'},
            {label: translate(Translations.EndOfStudies), value: !!selectedData?.date ? moment.duration(moment().diff(selectedData?.date)).humanize(false,{M: 99999}) : statusRules.includes(selectedData?.status) ? null : 'N/A'}
        ]
    },[user, selectedData, selectedPath, locale]);

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
            }).catch(() => {
                dispatch(Actions.Toasts.Warning(Translations.FileError))
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
                            fill={Number(selectedData?.ects) || 0}
                            duration={900}
                            rotation={0}
                            easing={Easing.out(Easing.ease)}
                            tintColor={progressColor?.color}
                            backgroundColor={progressColor?.alternative}
                            lineCap={'round'}
                            children={() => <ProfileAvatar imageSrc={user?.avatar_url} size={avatar_size > 132 ? 132 : avatar_size}/>}
                        />
                    </TouchableOpacity>
                    <View style={{
                        width: (Dimensions.get('window').width / 2) - Layout.paddingHorizontal,
                    }}>
                        <Text style={[styles.font_family, styles.big, {color: ThemeStyles.dark_blue_text}]}>{user?.nick_name}</Text>
                        {studies.length === 1 ? (
                            <View style={{
                                width: Layout.width / 2
                            }}>
                                <Text style={[styles.font_family, styles.small, {color: ThemeStyles.dark_blue_text}]}>{studies[0]?.label}</Text>
                            </View>
                        ) : (
                            <Dropdown
                                init_value={selectedPath}
                                name="study_path"
                                options={studies}
                                onChange={e => setSelectedPath(e.value)}
                            />
                        )}
                        <Info info={info}/>
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


export default React.memo(ProfileMain);
