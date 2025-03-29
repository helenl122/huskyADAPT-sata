import {Text} from "react-native";

const ScreenHeader = (props: any) => {
    return (
        <Text className="text-5xl font-dp_bold">{props.headerTitle}</Text>
    );
}

export default ScreenHeader;