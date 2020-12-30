export function GetDaysFromBitmask(bitmask) {
    let days = []

    for (let i = 0; i < 7; i++) {
        if (bitmask & (1 << i)) {
            days.push(i);
        }
    }

    return days
}

export function GetNextDate(date, hour, days) {
    const weekDays = GetDaysFromBitmask(days)
    let nextDay = weekDays.filter(day => day > date.getDay())
    const hours = hour.split(":").map(hour => Number(hour))

    if (nextDay.length > 0) {
        nextDay = nextDay[0]
    } else {
        nextDay = weekDays[0]
    }

    if (nextDay > date.getDay()) {
        date.setTime(
            date.getTime() + 86400000 * (nextDay - date.getDay())
        )
    } else {
        date.setTime(
            date.getTime() + 86400000 * (7 - (date.getDay() - nextDay))
        )
    }

    date.setHours(hours[0], hours[1] - date.getTimezoneOffset(), 0, 0)

    return date
}