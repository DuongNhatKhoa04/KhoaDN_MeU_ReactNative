import {StyleSheet, View} from "react-native";
import CustomText from "../../atoms/Text/CustomText";

export default function FlightInfo({ date, flight }: { date: string; flight: string }) {
    return (
        <View style={styles.container}>
            <CustomText variant="subtitle" isBold={false} textColor="white">{`${date} `}</CustomText>
            <CustomText variant="subtitle" isBold={true} textColor="white">{`| ${flight}`}</CustomText>
        </View>
    );
}

function FormatDate(dateInput: string): string {
    const date = new Date(dateInput);
    const day = date.getDate();
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} ${weekday}`;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
})