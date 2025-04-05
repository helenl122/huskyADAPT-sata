import { Text, View, Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
const gameData = require('../assets/gamesData');

const InfoScreen = ({gameName, gamePath, iconName, iconColor, tileColor, modalVisible,
        setModalVisible, theme, description, switchType, starShow, setStarShow}) => {
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
                        {gameInfoItem("lightbulb", "theme: ", theme)}
                        {gameInfoItem("format-list-bulleted", "description: ", description)}
                        {gameInfoItem("gesture-tap-button", "switch: ", switchType)}
                        {/* Play game and favorite buttons */}
                        <View className="flex-row justify-around py-10" style={{width: w*0.8}}>
                            {infoScreenButton("Favorite", tileColor, ()=>{favoriteGame(gameName); setStarShow(starShow+1); setModalVisible(false);}, "star-outline", isLargeScreen)}
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

// helper function for each line of detail of game info
const gameInfoItem = (itemIcon, itemName, itemContent) => {
    const w = useWindowDimensions().width;
    return (
        <View className="flex-row justify-center mt-1" style={{width: w*0.8}}>
            <MaterialCommunityIcons className=" mx-1 md:my-1 md:mx-2" name={itemIcon} size={20}/>
            <Text className="font-dp_semibold text-sm md:text-lg">{itemName}</Text>
            <Text className="text-wrap mr-5 font-dp_reg text-sm md:text-lg">{itemContent}</Text>
        </View>
    );
}

// helper function for creating the buttons on info screen
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

// helper function for favoriting a game
const favoriteGame = (gameName) => {
    // get the game data by game name
    const game = gameData.find(item => item.gameName === gameName);
    game.favorite = !game.favorite // toggle favorite boolean
    // overwrite game data for this game with new data
    gameData.map(item => game.gameName === game.gameName ? game : item);
    // save these udpates
    localStorage.setItem("../assets/gamesData.json",
                            JSON.stringify(gameData, null, 2));
}

export default InfoScreen;