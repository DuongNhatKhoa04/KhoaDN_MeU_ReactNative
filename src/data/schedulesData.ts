export interface IFlight {
    flightNumber: string;
    reportingTime: string;
    debriefingTime: string;
    deliveryExpectedTime: string;
    arrivalExpectedTime: string;
    from: string;
    to: string;
    note?: string;
    deliveryNextDay?: boolean;
    arrivalNextDay?: boolean;
    landed: boolean;
}

export interface ILayover {
    hotelName: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    restTime: string;
    note?: string;
}

export interface IDayOff {
    location: string;
}

export interface IStandBy {
    reportingTime: string;
    debriefingTime: string;
    startTime: string;
    endTime: string;
    location: string;
    deliveryNextDay?: boolean;
    arrivalNextDay?: boolean;
}

export interface ISchedulesData {
    id: string;
    date: string;
    type: string;
    flights?: IFlight[];
    layovers?: ILayover[];
    dayOff?: IDayOff[];
    standBy?: IStandBy[];
}


const schedulesData: ISchedulesData[] = [
    {
        id: "Khoa27-1",
        date: "20/09/2025",
        type: "SBY",
        standBy: [
            {
                reportingTime: "11:00:00",
                debriefingTime: "17:00:00",
                startTime: "11:00:00",
                endTime: "17:00:00",
                location: "SGN",
                deliveryNextDay: false,
                arrivalNextDay: false,
            }
        ],
    },
    {
        id: "Khoa27-2",
        date: "21/09/2025",
        type: "OFF",
        dayOff: [
            {
                location: "SGN",
            }
        ],
    },
    {
        id: "Khoa27-3",
        date: "22/09/2025",
        type: "Duty",
        flights: [
            {
                flightNumber: "1805",
                reportingTime: "18:10:00",
                debriefingTime: "07:34:00",
                deliveryExpectedTime: "19:00:00",
                arrivalExpectedTime: "00:15:00",
                from: "SGN",
                to: "AMD",
                note: "DHD",
                deliveryNextDay: false,
                arrivalNextDay: true,
                landed: false
            },
            {
                flightNumber: "1806",
                reportingTime: "18:10:00",
                debriefingTime: "07:34:00",
                deliveryExpectedTime: "01:00:00",
                arrivalExpectedTime: "06:15:00",
                from: "AMD",
                to: "SGN",
                note: "",
                deliveryNextDay: true,
                arrivalNextDay: true,
                landed: false
            },
        ],
    },
    {
        id: "Khoa27-4",
        date: "22/09/2025",
        type: "Layover",
        layovers: [
            {
                hotelName: "Greenlife Village",
                checkInTime: "10:35:00",
                checkOutDate: "22/09/2025",
                checkOutTime: "21:45:00",
                restTime: "11:40:00",
                note: "FLT"
            }
        ],
    },
];

export default schedulesData;