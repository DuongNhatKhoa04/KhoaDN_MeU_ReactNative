export const formatTime = (time: string): string => {
    if (!time) return "";
    
    const [hh, mm] = time.split(":");
    return `${hh}${mm}`;
};

export const formatNextDayTime = (
    time: string,
    nextDay: boolean
): string => {
    const base = formatTime(time);
    return nextDay ? `${base}\u207A\u00B9` : base;
};

export const formatTimeWithColon = (time: string): string => {
    if (!time) return "";
    
    const [hh, mm] = time.split(":");
    return `${hh}:${mm}`;
};

export const formatDate = (
    date: string, getMonth: boolean
): string => {
    if (!date) return "";
    
    const [dd, mm, yyyy] = date.split("/");
    const jsDate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

    if (getMonth) {
        return new Intl.DateTimeFormat("en-US", { month: "short" }).format(jsDate);
    } else {
        const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(jsDate);
        return `${dd} ${weekday}`;
    }
};
