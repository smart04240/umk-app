import { addZeroIfNeeded } from "./functions";

export const now = new Date();
export const now_day_index = now.getDay() === 0 ? 6 : now.getDay() - 1;
export const now_date = now.getDate() <= 9 ? "0" + now.getDate() : now.getDate();
export const now_month = now.getMonth() + 1 <= 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
export const now_year = now.getFullYear();
export const now_dd_mm_yyyy = `${now_date}-${now_month}-${now_year}`;
export const now_yyyy_mm_dd = `${now_year}-${now_month}-${now_date}`;

export const month_names = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export const month_names_short = ['Stycz', 'Lut', 'Mar', 'Kwie', 'Maj', 'Czerw', 'Lip', 'Sierp', 'Wrzes', 'Pardz', 'List', 'Grud'];
export const day_names = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
export const day_names_short = ['pon', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'];
export const now_day_name = day_names[now_day_index];


export const isDate = obj => toString.call( obj ) === "[object Date]";

export const getLocalDateString = date_obj => {
	if ( isDate( date_obj )) {
		const year = date_obj.getFullYear();
		const month = addZeroIfNeeded( date_obj.getMonth() + 1 );
		const date = addZeroIfNeeded( date_obj.getDate() );

		return `${date}.${month}.${year}`;
	}
}


export const getLocalDateAndTimeFromISOString = date_str => {
	
	if ( !date_str ) return { date: "", time: "" };

	const [ iso_date, full_time ] = date_str.split(" ");

	const iso_date_divider = /-/.test( iso_date ) ? "-" : "/";
	const [ year, month, date_num ] = iso_date.split( iso_date_divider );

	const date = `${ date_num }.${ month }.${ year }`;
	const time = full_time && full_time.length === 8 ? full_time.slice( 0, 5 ) : full_time;

	return { date, time };
}


export const getDateObjFromLocalDateSting = ( date_local, divider = "." ) => {
	if ( date_local ){
		const [ date, month, year ] = date_local.split( divider );
		return new Date( getFullDateISO( year, month, date) );
	}
}


export const getFullDateISO = ( year, month, date, divider = "-" ) => {
	if ( year && month && date ) {
		return `${year}${divider}${addZeroIfNeeded(month)}${divider}${addZeroIfNeeded(date)}`;
	}
}


export const getFullDateISOFromDateObj = ( date_obj, divider = "-" ) => {
	if ( isDate( date_obj )) {
		const year = date_obj.getFullYear();
		const month = addZeroIfNeeded(date_obj.getMonth() + 1);
		const date =  addZeroIfNeeded(date_obj.getDate());

		return getFullDateISO( year, month, date, divider );
	}
}


export const getDaysAmountInMonth = ( year = new Date().getFullYear(), month = new Date().getMonth() + 1 ) => {
	const next_month = month + 1 !== 13 ? month + 1 : 1;
	const next_year = next_month === 1 ? year + 1 : year; 
		
	const current_month_start = new Date(`${year}/${month}/01 00:00:00`);
	const next_month_start = new Date(`${next_year}/${next_month}/01 00:00:00`);
	const days_amount = (( next_month_start - current_month_start ) / 1000 / 60 / 60 / 24 );

	return Math.round( days_amount );
}


export const getDayProperIndex = date_obj => {
	if ( isDate( date_obj )) {
		return date_obj.getDay() === 0 ? 6 : date_obj.getDay() - 1;
	}
}


export const getDayName = date_obj => { 
	if ( isDate( date_obj )) {
		return day_names[ getDayProperIndex(date_obj) ];
	}
}


export const getUTCTime = date_obj => {
	if ( isDate( date_obj )) {
		return `${addZeroIfNeeded ( date_obj.getUTCHours() )}:${addZeroIfNeeded( date_obj.getUTCMinutes() )}`
	}
}


export const getAllFromDateObject = ( date_obj, UTC = false ) => {

	if ( isDate( date_obj )) {

		const day_num = addZeroIfNeeded ( UTC ? date_obj.getUTCDate() : date_obj.getDate() );
		const month_num = addZeroIfNeeded( UTC ? date_obj.getUTCMonth() + 1 : date_obj.getMonth() + 1 );
		const month_name = month_names[ +month_num - 1];
		const month_name_short = month_names_short[ +month_num - 1 ];

		const utc_day = date_obj.getUTCDay();
		const normal_day = date_obj.getDay();

		const day_index = 
			UTC 
			? utc_day === 0 ? 6 : utc_day - 1
			: normal_day === 0 ? 6 : normal_day - 1;

		const day_name = day_names[ day_index ];
		const day_name_short = day_names_short[ day_index ];

		const year = date_obj.getFullYear();
		const dd_mm_yyyy = `${day_num}.${month_num}.${year}`;

		return {
			day_num,
			month_num,
			month_name,
			month_name_short,
			day_name,
			day_name_short,
			year,
			dd_mm_yyyy
		}
	}
}
