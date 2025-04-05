import { Text, View, Modal, TouchableOpacity, useWindowDimensions, Button } from "react-native";
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

const InfoScreen = ({gameName, gamePath, iconName, iconColor, tileColor, modalVisible, setModalVisible, theme, description, switchType}) => {
    const w = useWindowDimensions().width;
    const isLargeScreen = (w >=768) ? true : false
    const h = useWindowDimensions().height;
    const router = useRouter();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            {/* View for background shading when info pop-up opens */}
            <View className="bg-black bg-opacity-30"
                style={{height:h, width:w, justifyContent:"center", alignItems:"center"}}
            >
                {/* View for white info pop-up box */}
                <View
                    className="bg-white flex-row flex-wrap justify-center content-center my-5 rounded-[10]"
                    style={{height: (isLargeScreen) ? h*0.8 : h*0.5, width: w*0.8}}
                >
                    {/* View for items inside pop up window (icon, text, buttons)*/}
                    <View className="flex-col justify-center items-center content-center">
                        {(isLargeScreen)? <MaterialCommunityIcons
                                            className="align-center"
                                            name={iconName}
                                            size={(isLargeScreen)? h*0.2 : w*0.2}
                                            color={iconColor}/>
                        : null}
                        <Text className="font-dp_bold text-2xl md:text-5xl my-3">{gameName}</Text>
                        {/* Game Info Details (theme, description, switch type) */}
                        {/* <GameInfoItem itemIcon="lightbulb" itemName="theme: " itemContent={theme}/>
                        <GameInfoItem itemIcon="format-list-bulleted" itemName="description: " itemContent={description}/>
                        <GameInfoItem itemIcon="gesture-tap-button" itemName="switch: " itemContent={switchType}/> */}
                        {gameInfoItem("lightbulb", "theme: ", theme)}
                        {gameInfoItem("format-list-bulleted", "description: ", description)}
                        {gameInfoItem("gesture-tap-button", "switch: ", switchType)}
                        {/* Play game and favorite buttons */}
                        <View className="flex-row justify-around py-10" style={{width: w*0.8}}>
                            {infoScreenButton("Favorite", tileColor, () => {}, "star-outline", isLargeScreen)}
                            {infoScreenButton("Play", tileColor, () => {setModalVisible(false); router.navigate(gamePath);}, "play-circle", isLargeScreen)}
                        </View>
                    </View>
                    {/* Exit window button */}
                    <TouchableOpacity className="absolute top-5 right-5" onPress={() => setModalVisible(false)}>
                            <MaterialCommunityIcons name={"close-circle"} size={(isLargeScreen)? h*0.1 : w*0.1} color={"red"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const gameInfoItem = (itemIcon, itemName, itemContent) => {
    const w = useWindowDimensions().width;
    return (
        <View className="flex-row justify-center mt-1" style={{width: w*0.8}}>
            <MaterialCommunityIcons className="mx-1 ml-5" name={itemIcon} size={20}/>
            <Text className="font-dp_semibold text-sm md:text-lg">{itemName}</Text>
            <Text className="text-wrap mr-5 font-dp_reg text-sm md:text-lg">{itemContent}</Text>
        </View>
    );
}

const infoScreenButton = (title, tileColor, pressFunc, buttonIcon, showIcon) => {
    return (
        <TouchableOpacity
            onPress={pressFunc}
            className="flex-row justify-center items-center rounded-[10] md:w-[230] md:h-[100] w-[115] h-[50]"
            style={{backgroundColor: tileColor}}
        >
            {(showIcon)? <MaterialCommunityIcons className="mr-2 color-white size-[30]" name={buttonIcon} size={30}/> : null}
            <Text className="text-white text-2xl font-dp_reg">{title}</Text>
        </TouchableOpacity>
    );
}

export default InfoScreen;