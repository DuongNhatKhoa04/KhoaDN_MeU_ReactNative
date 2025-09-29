import {View} from "react-native";

interface ISpacerProps {
    size?: number,
    horizontal?: boolean,
}

export default function CustomSpacer({ size = 5, horizontal = false }: ISpacerProps) {
    return (
        <View style={horizontal ? { width: size } : { height: size }} />
    );
}