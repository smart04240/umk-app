export const statusRules = [
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
export const percentCounter = (years, userEcts, status) => {
    const totalPercent = userEcts / (60 * years.charAt(0)) * 100;

    if (totalPercent > 99 && statusRules.includes(status))
        return "99";

    if (statusRules.includes(status))
        return "100"

    return Math.floor(Number(totalPercent));
}
