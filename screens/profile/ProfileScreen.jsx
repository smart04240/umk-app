import React, {useMemo} from "react";
import ProfileMain from "../../components/profile/ProfileMain";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ProfileStatistics from "../../components/profile/ProfileStatistics";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileInformation from "../../components/profile/ProfileInformation";
import useThemeStyles from "../../hooks/useThemeStyles";
import Translations from "../../constants/Translations";
import shadowGenerator from "../../helpers/shadowGenerator";
import Swiper from "react-native-screens-swiper/components/Swiper";
import GeneralStyles from "../../constants/GeneralStyles";
import useTranslator from "../../hooks/useTranslator";
import Fonts from "../../constants/Fonts";


export default function ProfileScreen(props) {
    const translate = useTranslator();
    const theme = useThemeStyles();

    const screens = [
        {
            tabLabel: translate(Translations.Information),
            component: ProfileInformation
        },
        {
            tabLabel: translate(Translations.Statistics),
            component: ProfileStatistics
        },
        {
            tabLabel: translate(Translations.EarnedBadges),
            component: ProfileBadges
        },
    ];

    const style = useMemo(() => ({
        pillsOverflow: {
            overflow: 'hidden',
            height: 70
        },
        pillContainer: {
            ...shadowGenerator(5),
            ...GeneralStyles.bottom_border_radius,
            zIndex: 10,
            backgroundColor: theme.box_bg,
        },
        staticPillsContainer: {
            height: 35,
        },
        pillLabel: {
            textTransform: 'uppercase',
            ...GeneralStyles.text_regular,
            color: theme.blue_text,
        },
        activeLabel: {
            fontFamily: Fonts.ProximaNova.Bold,
            color: theme.blue_text,
        },
        borderActive: {
            borderColor: theme.blue_text,
        },
    }), [theme]);

    return (
        <MainWithNavigation>
            <Swiper
                data={screens}
                style={style}
                scrollableContainer={true}
                stickyHeaderEnabled
                isStaticPills={true}
            >
                <ProfileMain/>
            </Swiper>
        </MainWithNavigation>
    );
};
