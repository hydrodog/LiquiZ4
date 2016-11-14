function Calendar(year, duration, holidays) {
	var days = [];
	for (var i = 0; i < duration; i++)
	  days.push({});
	this.startYear = year;
	this.startWeekday = 0; //TODO: fix this to set proper weekday.  This makes weekday calc FAST
	this.events = []; this.events.length = duration;
	for (var i = 0; i < holidays.length; i++) {
		var h = holidays[i];
		console.log(h);
		if (h.length > 4) {
			this.markHoliday(h,h[1],h[2],h[3]);
		} else {
			var numYears = int32(duration / 365);
			for (var y = this.startYear; y <= numYears; y++) {
				this.markHoliday(h,y,h[1],h[2]);
			}
		}
	}
	this.days = days;
}

Calendar.prototype.markHoliday = function(holiday, y, m, d) {
	var jd = this.julday(y, m, d);
	var day = this.days[jd - this.startJD];
	day.hol = 1;
	if (day.name)
		day.name += "|" + holiday[0];
	else
		day.name = holiday[0];
}

Calendar.monthlen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Calendar.cumulativeDays = [0, 31, 59, ];
Calendar.monthNames = [
	"January", "February", "March", "April", "May", "June", "July",
	"August", "September", "October", "November", "December"
];

// return day of the week, 0=sunday, 6 = saturday
Calendar.prototype.weekday = function(jd) {
  return (jd - this.startJD + this.startWeekday) % 7;
}

Calendar.prototype.setHoliday = function(year, month, day) {
	
}

Calendar.prototype.julday = function(year, month, day) {
	var jd = (year-this.startYear) * 365 + Calendar.cumulativeDays[month-1] + day - 1;
	if (Calendar.isLeap(year) && month > 2)
		jd++;
	return jd;
}

Calendar.prototype.setWeekend = function(day) {
	var offset = day - this.startWeekday;
	if (offset < 0)
		offset += 7;
	for (var i = offset; i < this.duration; i += 7)
		this.days[i] = 1; // set holiday for all weekend days 
}

var h = [
  ["Christmas", 12, 25], // Christmas is every year same day
  ["New Year's", 1, 1],  // same for New Year's
  ["Spring Break", 2017, 3, 12, 3, 19],
  ["Rosh Hashanah", 2016, 10, 3, 10,4], // date range
  ["President's Day", 2017, 2, 20]
];
var c = new Calendar(2016, 1250, h);
c.setHoliday();

var n = 1000000;
var d = new Date();
var t0 = d.getTime();
var a = new Array(n);
for (var i = 0; i < a.length; ++i)
	a[i] = 0;
var t1 = d.getTime();
console.log(t1-t0);
for (var i = 0; i < 10; i++)
	console.log(i);