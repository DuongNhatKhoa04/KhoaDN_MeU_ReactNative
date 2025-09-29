import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../atoms/CustomText";
import {formatNextDayTime, formatTime, formatTimeWithColon} from "../../../extensions/extension";
import {IFlight, ILayover, IDayOff, IStandBy, ISchedulesData} from "../../../data/schedulesData";

const typeColors: Record<string, string> = {
    Duty: "#3F86FB",
    Layover: "#FD9801",
    SBY: "#00C0D8",
    XSBY: "#00C0D8",
    OFF: "#8CC34B",
    DHD: "#71AFEA",
};

interface ScheduleCardProps {
    type: string;
    date: string;
    item: IFlight[] | ILayover | IDayOff | IStandBy;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ type, date, item }) => {
    const statusColor = typeColors[type] || "#999";

    if (type === "Duty") {
        const flights = item as IFlight[];

        if (flights.length === 0) return null;

        const rows: React.ReactNode[] = [];
        
        rows.push(
            <CustomText key="reporting" variant="body" isBold textColor="white">
                Reporting time: {formatTime(flights[0].reportingTime)}
            </CustomText>
        );

        flights.forEach((flight, idx) => {
            rows.push(
                <View key={`flight-${idx}`} style={{ flexDirection: "row", maxWidth: 450 }}>
                    <CustomText variant="body" textColor={statusColor} 
                                style={{ letterSpacing: -1, minWidth: 70, textAlign: "left" }}>
                        {flight.note ? `${flight.note}` : ""}{flight.flightNumber}
                    </CustomText>
                    <CustomText variant="body" 
                                textColor={flight.landed ? "#A11E2B" : "white"} 
                                style={{ letterSpacing: -1, minWidth: 55, textAlign: "right" }}>
                        {flight.landed ? "A" : ""}{formatNextDayTime(flight.deliveryExpectedTime, flight.deliveryNextDay ?? false)}
                    </CustomText>
                    <CustomText variant="body" isBold 
                                style={{ flex: 1, maxWidth: 90, textAlign: "center" }}>
                        {" "}{flight.from} {flight.to}{" "}
                    </CustomText>
                    <CustomText variant="body" 
                                textColor={flight.landed ? "#A11E2B" : "white"} 
                                style={{ letterSpacing: -1, minWidth: 55 }}>
                        {flight.landed ? "A" : ""}
                        {formatNextDayTime(
                            flight.arrivalExpectedTime,
                            flight.arrivalNextDay ?? false
                        )}
                    </CustomText>
                    {flight.note && (
                        <CustomText variant="body" textColor={statusColor} 
                                    style={{ letterSpacing: -1, textAlign: "left" }}>
                            {flight.note}
                        </CustomText>
                    )}
                </View>
            );
        });
        
        const lastFlight = flights[flights.length - 1];
        rows.push(
            <CustomText key="debriefing" variant="body" isBold textColor="white">
                Debriefing time: {formatNextDayTime(lastFlight.debriefingTime, lastFlight.arrivalNextDay ?? false
            )}
            </CustomText>
        );

        return (
            <View style={styles.wrapper}>
                <View style={styles.dutyCard}>{rows}</View>
                <View style={[styles.sideBar, { backgroundColor: statusColor }]} />
            </View>
        );
    }

    if (type === "Layover") {
        const layover = item as ILayover;
        return (
            <View style={[styles.wrapper]}>
                <View style={styles.layoverCard}>
                    <CustomText variant="body" textColor={statusColor}>
                        {layover.note ? `[${layover.note}] ` : ""}
                        {layover.hotelName}
                    </CustomText>
                    <CustomText variant="note">
                        {date} {formatTimeWithColon(layover.checkInTime)}
                    </CustomText>
                    <CustomText variant="note" style={{ textAlign: "right" }}>
                        Rest : {formatTimeWithColon(layover.restTime)} (
                        {layover.checkOutDate} {formatTimeWithColon(layover.checkOutTime)})
                    </CustomText>
                </View>
                <View style={[styles.sideBar, { backgroundColor: statusColor }]} />
            </View>
        );
    }

    if (type === "OFF") {
        const dayOff = item as IDayOff;
        return (
            <View style={[styles.wrapper]}>
                <View style={styles.dayOffCard}>
                    <CustomText variant="body" textColor={statusColor}>
                        OFF - Rest Period
                    </CustomText>
                    <View>
                        <CustomText variant="note">
                            Location: {dayOff.location}
                        </CustomText>
                    </View>
                </View>

                <View style={[styles.sideBar, { backgroundColor: statusColor }]} />
            </View>
        );
    }

    if (type === "SBY" || type === "XSBY") {
        const standby = item as IStandBy;
        return (
            <View style={styles.wrapper}>
                <View style={styles.standByCard}>
                    <CustomText variant="body" isBold textColor="white">
                        Reporting time: {formatTime(standby.reportingTime)}
                    </CustomText>
                    <View style={{ flexDirection: "row" }}>
                        <CustomText variant="body" textColor={statusColor}>
                            {type}{"  "}
                        </CustomText>
                        <CustomText variant="body">
                            {formatNextDayTime(standby.startTime, standby.deliveryNextDay ?? false)}
                        </CustomText>
                        <CustomText variant="body" isBold>
                            {" "}{standby.location} {standby.location}{" "}
                        </CustomText>
                        <CustomText variant="body">
                            {formatNextDayTime(standby.endTime, standby.arrivalNextDay ?? false)}
                        </CustomText>
                    </View>
                    <CustomText variant="body" isBold textColor="white">
                        Debriefing time: {formatNextDayTime(standby.debriefingTime, standby.arrivalNextDay ?? false)}
                    </CustomText>
                </View>
                <View style={[styles.sideBar, { backgroundColor: statusColor }]} />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    sideBar: {
        width: 8,
        alignSelf: "stretch",
    },
    wrapper: {
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: "#353535",
        //padding: 6,
        //borderWidth: 1,
        borderColor: "orange",
        minHeight: 55,
    },
    dutyCard: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 6,
        //borderWidth: 1,
        borderColor: "white",
    },
    layoverCard: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 6,
        //borderWidth: 1,
        borderColor: "white",
    },
    dayOffCard: {
        flex: 1,
        padding: 8,
        //borderWidth: 1,
        borderColor: "white",
    },
    standByCard: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 6,
        //borderWidth: 1,
        borderColor: "white",
    }
});

export default ScheduleCard;