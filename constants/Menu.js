import Routes from "./Routes";
import Translations from "./Translations";

export default [
    {
        label: Translations.Profile,
        icon: "account-outline",
        icon_active: "account",
        bottom: true,
        screen: Routes.Profile,
		subScreens: [
			Routes.ProfileEdit,
			Routes.ProfileBadges,
			Routes.ProfileBadge,
			Routes.ProfileEvents,
		]
    },
    {
        label: Translations.MapOfStudies,
        icon: "map-outline",
        icon_active: "map",
        bottom: true,
        screen: "",
    },
    {
        label: Translations.Rankings,
        icon: "medal-outline",
        icon_active: "medal",
        bottom: true,
        screen: Routes.Rankings,
    },
    {
        label: Translations.Simulations,
        icon: "comment-question-outline",
        icon_active: "comment-question",
        bottom: true,
        screen: "",
    },
    {
        label: Translations.ToDoList,
        icon: "format-list-bulleted-type",
        screen: Routes.Tasks,
    },
    {
        label: Translations.Calendar,
        icon: "calendar-blank-outline",
        icon_active: "calendar-blank",
        bottom: true,
        screen: Routes.Calendar,
    },
    {
        label: Translations.Reminders,
        icon: "bell-outline",
        screen: Routes.Reminders,
    },
    {
        label: Translations.LocatingNCUFacilities,
        icon: "map-marker",
        screen: Routes.Map,
        subScreens: [
            Routes.MarkersList,
            Routes.Marker,
        ],
    },
    {
        label: "UOWiRO",
        icon: "handshake",
        screen: "",
    },
];