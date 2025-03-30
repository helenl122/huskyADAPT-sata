import {Text} from "react-native";

const ScreenHeader = (props: any) => {
    return (
        <Text className="text-5xl font-dp_bold mt-2 ml-6">{props.headerTitle}</Text>
    );
}

export default ScreenHeader;