import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";
import Actions from "../../redux/Actions";
import API from "../../helpers/API";
import useThemeStyles from "../../hooks/useThemeStyles";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ProfileUsosEvents from "../../components/profile-events/ProfileUsosEvents";
import Button from "../../components/form/Button";
import ProfileEventsTab from "../../components/profile-events/ProfileEventsTab";
import ProfileCollegeGraduationTab from "../../components/profile-events/ProfileCollegeGraduationTab";
import ProfileOtherTab from "../../components/profile-events/ProfileOtherTab";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import useTranslator from "../../hooks/useTranslator";
import Swiper from "react-native-screens-swiper";
import Container from "../../components/general/Container";
import Fonts from "../../constants/Fonts";

const ProfileEventsScreen = props => {
	const dispatch = useDispatch();
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const locale = useSelector(state => state.app.locale);
	const [ active_tab, setActiveTab ] = useState( 0 );
	const [data, setData] = useState(null);
	const TabContent = useMemo(() => [ ProfileEventsTab, ProfileOtherTab, ProfileCollegeGraduationTab ][ active_tab ], [ active_tab ]);
	const statuses = {
		X: {
			status: { pl: 'w trakcie', en: 'during'},
			description: {pl: 'Znow stałeś się aktywnym studentem, a wcześniej miałeś jakiś semestr nie zaliczony', en: 'You have become an active student again, and previously you had a semester missed'}
		},
		Z: {
			status: { pl: 'zaliczony ręcznie', en: 'credited manually'},
			description: {pl: 'Zaliczyłeś rok manualnie', en: 'You did a year manually'}
		},
		N: {
			status: { pl: 'niezaliczony ręcznie', en: 'manually failed'},
			description: {pl: 'Zostałeś skreślony z listy studentów (manualnie)', en: 'You have been removed from the list of students (manually)'}
		},
		W: {
			status: { pl: 'zaliczony warunkowo (w trakcie)', en: 'conditionally credited (in progress)'},
			description: {pl: 'Jesteś w trkacie obdywania warunku', en: 'You are in the process of making a condition'}
		},
		A: {
			status: { pl: 'zaliczony automatycznie', en: 'credited automatically'},
			description: {pl: 'Zaliczyłeś rok automatycznie', en: 'You did a year automatically'}
		},
		R: {
			status: { pl: 'niezaliczony automatycznie', en: 'automatically failed'},
			description: {pl: 'Zostałeś skreślony z listy studentów (automatycznie)', en: 'You have been removed from the list of students (automatically)'}
		},
		D: {
			status: { pl: 'urlop (w trakcie)', en: 'vacation (in progress)'},
			description: {pl: 'urlop długoterminowy (tzw. dziekański) w trkacie trwania', en: 'long-term leave (so-called dean\'s) during the period'}
		},
		E: {
			status: { pl: 'zakończony urlop', en: 'completed vacation'},
			description: {pl: 'urlop długoterminowy (tzw. dziekański) zakończony', en: 'long-term leave (so-called dean\'s leave) completed'}
		},
		S: {
			status: { pl: 'zaliczenie warunku', en: 'passing the condition'},
			description: {pl: 'Zaliczyłeś rok warunkowo', en: 'You made a conditional one year'}
		},
		T: {
			status: { pl: 'niezaliczenie warunku', en: 'failure of the condition'},
			description: {pl: 'Nie zaliczyłeś warunku, zost\le\s skierowany do powtarznia semestru', en: 'You have not passed the condition, you will be assigned to a re-semester'}
		},
	}
	const tabs = [
		{
			tabLabel: translate( Translations.Events ),
			component: ProfileEventsTab
		},
		{
			tabLabel: translate( Translations.Other ),
			component: ProfileOtherTab
		},
		{
			tabLabel: translate( Translations.CollegeGraduation ),
			component: ProfileCollegeGraduationTab
		}
	];

	// Load zdarzenia(profile events)
	useEffect(() => {
		API.fetch().then(response => {
			let studentId = response.data.profile.id;
			API.zdarzenia.getAll(studentId).then(response => {
				setData(response.data.data.list);
			})
		});
	}, []);

	useEffect(() => {
		let _data = {
			affectList: data?.affectList.map(item => (formatData(item))),
			notAffectList: data?.notAffectList.map(item => (formatData(item))),
			others: data?.others.map(item => (formatData(item))),
			graduation: data?.graduation.map(item => (formatData(item))),
			usosEvents: data?.usosEvents?.map(item => (formatUsosEvents(item))),
		}
		dispatch(Actions.Zdarzenia.All(_data));
	}, [data, locale]);
	
	const formatData = item => ({label: translate(item.name), text: translate(item.description)});
	const formatUsosEvents = item => {
		let status = translate(statuses[item.status_zaliczenia_etapu_osoby].status);
		let text = translate(statuses[item.status_zaliczenia_etapu_osoby].description);
		return {label: `${status} (${item.cykl_realizacji_etapu_osoby})`, text, eye: true};
	}

	const styles = useMemo(() => (
		{
			pillContainer: {
				zIndex: 10,
				backgroundColor: ThemeStyles.main_bg,
			},
			pillLabel: {
				textTransform: 'uppercase',
				...GeneralStyles.text_regular,
				color: ThemeStyles.blue_text,
				textAlign: 'center'
			},
			activeLabel: {
				fontFamily: Fonts.ProximaNova.Bold,
				color: ThemeStyles.blue_text,
				textAlign: 'center'
			},
			borderActive: {
				borderColor: ThemeStyles.blue_text,
			},
		}
	), [ThemeStyles]);

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<Swiper
					data={tabs}
					isStaticPills={true}
					scrollableContainer={true}
					stickyHeaderEnabled={true}
					stickyHeaderIndex={1}
					style={styles}
				>
					<Container>
						<ProfileUsosEvents/>

						<Text style={{ ...GeneralStyles.text_regular, marginBottom: 13, color: ThemeStyles.dark_text }}>
							Dowiedz się więcej o innych zdarzeniach
						</Text>
					</Container>
				</Swiper>

				<View style={{marginVertical: 20, marginHorizontal: 20}}>
					<Button onPress={() => navigation.navigate(Routes.ProfileEdit)}>
						{translate(Translations.ReturnToProfileEdit)}
					</Button>
				</View>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
};


export default ProfileEventsScreen;
