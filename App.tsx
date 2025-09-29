import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import { useState, useMemo } from "react";
import schedulesData, { ISchedulesData } from "./src/data/schedulesData";
import ScheduleCard from "./src/components/molecules/ScheduleCard/ScheduleCard";
import CustomText from "./src/components/atoms/CustomText";
import {formatDate} from "./src/extensions/extension";

export default function App() {
    const [crewSchedule] = useState<ISchedulesData[]>(schedulesData);
    
    const groupedSchedules = useMemo(() => {
        const groups: Record<string, ISchedulesData[]> = {};
        crewSchedule.forEach((item) => {
            if (!groups[item.date]) {
                groups[item.date] = [];
            }
            groups[item.date].push(item);
        });
        return Object.entries(groups).map(([date, schedules]) => ({
            date,
            schedules,
        }));
    }, [crewSchedule]);

    return (
        <View style={styles.container}>
            <FlatList
                data={groupedSchedules}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.dayBlock}>
                        <CustomText variant="title" isBold textColor="white">
                            {formatDate(item.date, false)}
                        </CustomText>
                        
                        {item.schedules.map((schedule, idx) => (
                            <View style={styles.cardBlock} key={schedule.id + idx}>
                                {schedule.type === "Duty" && schedule.flights && (
                                    <ScheduleCard
                                        type={schedule.type}
                                        date={schedule.date}
                                        item={schedule.flights}
                                    />
                                )}

                                {schedule.type === "Layover" &&
                                    schedule.layovers?.map((layover, lIdx) => (
                                        <ScheduleCard
                                            key={lIdx}
                                            type={schedule.type}
                                            date={schedule.date}
                                            item={layover}
                                        />
                                    ))}

                                {schedule.type === "OFF" &&
                                    schedule.dayOff?.map((off, oIdx) => (
                                        <ScheduleCard
                                            key={oIdx}
                                            type={schedule.type}
                                            date={schedule.date}
                                            item={off}
                                        />
                                    ))}

                                {(schedule.type === "SBY" || schedule.type === "XSBY") &&
                                    schedule.standBy?.map((s, sIdx) => (
                                        <ScheduleCard
                                            key={sIdx}
                                            type={schedule.type}
                                            date={schedule.date}
                                            item={s}
                                        />
                                    ))}
                            </View>
                        ))}
                    </View>
                )}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    dayBlock: {
        marginBottom: 4,
        marginHorizontal: 12,
        //borderWidth: 1,
        borderColor: "red",
    },
    cardBlock: {
        marginTop: 4,
        //borderWidth: 1,
        borderColor: "white",
    },
});
