import { Text, View, Modal, TouchableOpacity, useWindowDimensions, Button } from "react-native";
import { useRouter } from 'expo-router';

const InfoScreen = ({modalVisible, setModalVisible}) => {
    const w = useWindowDimensions().width;
    const h = useWindowDimensions().height;
    const router = useRouter();
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
                <View
                    className="flex-col bg-white justify-center align-center, p-5 rounded-md"
                    style={{height: (w>=768) ? h*0.8 : h*0.5, width: (w>= 768) ? w*0.7 : w*0.9}}
                >
                    <Text>Game Info</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <Button title="Play" onPress={() => {setModalVisible(false); router.navigate('/RoadGame');}}/>
                    {/* <Button title="Favorite" onPress={() => }/> */}
                </View>
            </View>
        </Modal>
    );
}

export default InfoScreen;