import {Text, View} from "react-native";

const ScreenHeader = (props : any) => {
    return (
        <View className="bg-white">
            <Text className="text-5xl font-dp_bold mt-2 ml-6 p-2">{props.headerTitle}</Text>
        </View>
    );
}

export default ScreenHeader;