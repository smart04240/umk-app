import Routes from "./Routes";
import Translations from "./Translations";

export default [
	{ 
		label: Translations.Profile,
		icon: "account-outline", 
		icon_active: "account",
		bottom: true,
		screen: Routes.Profile 
	},
	{ 
		label: Translations.MapOfStudies,
		icon: "map-outline", 
		icon_active: "map",
		bottom: true,
		screen: Routes.Map 
	},
	{ 
		label: Translations.Rankings,
		icon: "medal-outline",
		icon_active: "medal",
		bottom: true,
		screen: Routes.Rankings
	},
	{ 
		label: Translations.Simulations,
		icon: "comment-question-outline",
		icon_active: "comment-question",
		bottom: true,
		screen: "" 
	},
	{ 
		label: Translations.ToDoList, 
		icon: "format-list-bulleted-type",
		screen: ""
	},
	{ 
		label: Translations.Calendar, 
		icon: "calendar-blank-outline",
		icon_active: "calendar-blank",
		bottom: true,
		screen: "" 
	},
	{
		label: Translations.Reminders,
		icon: "bell-outline",
		screen: ""
	},
	{ 
		label: Translations.LocatingNCUFacilities, 
		icon: "map-marker",
		screen: "" 
	},
	{ 
		label: "UOWiRO",
		icon: "handshake",
		screen: "" 
	}
];