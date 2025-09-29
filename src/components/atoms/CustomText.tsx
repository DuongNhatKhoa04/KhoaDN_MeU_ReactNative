import {Text, StyleSheet, TextProps} from "react-native";

type Variant = "title" | "body" | "subtitle" | "note"

interface ITextProps extends TextProps {
    variant: Variant,
    isBold?: boolean,
    textColor?: string,
}

export default function CustomText({ variant = "body", isBold = false, textColor = "white", style, children, ...props }: ITextProps) {
    return (
        <Text style={[styles[variant], 
            { fontWeight: isBold ? 'bold' : 'normal' }, 
            { color: textColor }, 
            style]} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 18,
    },
    body: {
        fontSize: 16,
    },
    note: {
        fontSize: 12,
    }
});