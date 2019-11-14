
const DateUtils = {
  dateFormat1: (dateString) => {
    let date = new Date(dateString);
    return `${DateUtils.days[date.getDay()].fullName} ${DateUtils.months[date.getMonth()].shortName} ${date.getDate()}, ${date.getFullYear()}`
  },
  days: [
    {fullName: "Sunday", shortName: "Sun"},
    {fullName: "Monday", shortName: "Mon"},
    {fullName: "Tuesday", shortName: "Tue"},
    {fullName: "Wednesday", shortName: "Wed"},
    {fullName: "Thursday", shortName: "Thu"},
    {fullName: "Friday", shortName: "Fri"},
    {fullName: "Saturday", shortName: "Sat"}
  ],
  months: [
    {fullName: "January", shortName: "Jan"},
    {fullName: "February", shortName: "Feb"},
    {fullName: "March", shortName: "Mar"},
    {fullName: "April", shortName: "Apr"},
    {fullName: "May", shortName: "May"},
    {fullName: "June", shortName: "Jun"},
    {fullName: "July", shortName: "Jul"},
    {fullName: "August", shortName: "Aug"},
    {fullName: "September", shortName: "Sep"},
    {fullName: "October", shortName: "Oct"},
    {fullName: "November", shortName: "Nov"},
    {fullName: "December", shortName: "Dec"}
  ]
}
module.exports = DateUtils;