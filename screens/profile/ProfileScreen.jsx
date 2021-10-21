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

    const styles = useMemo(() => {
        return (
            {
                pillContainer: {
                    backgroundColor: theme.box_bg,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    ...shadowGenerator(5),
                },
                borderActive: {
                    borderColor: theme.blue_text
                },
                pillLabel: {
                    ...GeneralStyles.text_regular,
                    textAlign: 'center',
                    textTransform: "uppercase",
                    color: theme.blue_text
                },
                activeLabel: {
                    ...GeneralStyles.text_bold,
                    textTransform: "uppercase",
                    color: theme.blue_text
                },
                pillsOverflow: {
                    overflow: 'hidden',
                    height: 70
                }
            }
        )
    }, [theme]);

    return (
        <MainWithNavigation>
            <Swiper
                data={screens}
                style={styles}
                scrollableContainer={true}
                stickyHeaderEnabled={true}
                isStaticPills={true}
                stickyHeaderIndex={1}
            >
                <ProfileMain/>
            </Swiper>
        </MainWithNavigation>
    );
};
