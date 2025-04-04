import { Text, View, Modal, TouchableOpacity, useWindowDimensions, Button } from "react-native";
import { useRouter } from 'expo-router';
import {useState, useEffect} from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';
// import app design colors
const tailwindConfig = require('@/tailwind.config.js'); 
const colors = tailwindConfig.theme.extend.colors;
import * as FileSystem from 'expo-file-system';

// Define path to the JSON file
const filePath = FileSystem.documentDirectory + 'gamesData.json'; 

const InfoScreen = ({gameName, gamePath, iconName, modalVisible, setModalVisible, theme, description, switchType}) => {
    const w = useWindowDimensions().width;
    const isLargeScreen = (w >=768) ? true : false
    const h = useWindowDimensions().height;
    const router = useRouter();
    const [gameData, setGameData] = useState(null);

    async function ensureFileExists() {
    const fileInfo = await FileSystem.getInfoAsync(filePath);

    if (!fileInfo.exists) {
        console.log("Copying gamesData.json to document directory...");

        const asset = Asset.fromModule(require('../assets/gamesData.json'));
        await FileSystem.downloadAsync(asset.uri, filePath);
        console.log("File copied successfully!");
    }
    }


    // Load data when component mounts
    useEffect(() => {
        ensureFileExists();
        loadGameData();
    }, []);
        // Function to read the JSON file
        async function loadGameData() {
            try {
            const file = await FileSystem.readAsStringAsync(filePath);
            const data = JSON.parse(file);
            setGameData(data); // set state with newly loaded data
            console.log("successfully loaded data");
            } catch (error) {
            console.error("Error reading JSON:", error);
            }
        }
    
    
        async function updateFavorite(gameName) {
            if (!gameData) return;
    
            // Find the game object & update its score
            const updatedData = gameData.map(game => 
                game.gameName === gameName ? { ...game, favorite: true } : game
            );
            setGameData(updatedData); // Update state
            // Write the updated JSON back to file
            try {
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                console.log("favorite udpated");
            } catch (error) {
                console.error("Error saving JSON:", error);
            }
        }    

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                height: h,
                width: w,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View class
                    className="flex-row flex-wrap bg-white justify-center content-center, m-5 rounded-md"
                    style={{height: (isLargeScreen) ? h*0.8 : h*0.5, width: (isLargeScreen) ? w*0.7 : w*0.9}}
                >
                    <View className="flex-wrap justify-center items-center">
                        <MaterialCommunityIcons className="align-center" name={iconName} size={Math.floor(w/10)} color={colors.selectedTabFontColor}/>
                        <Text className="font-dp_bold text-4xl my-3">{gameName}</Text>
                        <View className="flex-row">
                            <Text>Theme: </Text>
                            <Text>{theme}</Text>
                        </View>
                        <View className="flex-row">
                            <Text>Description: </Text>
                            <Text>{description}</Text>
                        </View>
                        <View className="flex-row">
                            <Text>Switch: </Text>
                            <Text>{switchType}</Text>
                        </View>
                        <View className="flex-row">
                            <Button title="Play" onPress={() => {setModalVisible(false); router.navigate(gamePath);}}/>
                            <Button title="Favorite" onPress={(gamePath) => updateFavorite(gameName)}/>
                        </View>
                    </View>
                    <TouchableOpacity className="absolute top-5 right-5" onPress={() => setModalVisible(false)}>
                            <MaterialCommunityIcons name={"close-circle"} size={(isLargeScreen)? h*0.1 : w*0.1} color={"red"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

// const updateFavorite = ({gamePath}) => {
//     if 
//     return (
//         <Text></Text>
//     );
// }


export default InfoScreen;