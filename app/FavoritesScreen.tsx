import TileView from "@/components/TileView";
import ScreenHeader from "@/components/ScreenHeader";
import { View } from "react-native";

const FavoritesScreen = () => {
    return (
        <View>
            <ScreenHeader headerTitle="Favorites"/>
            <TileView favoriteScreen={true}/>
        </View>
    );
}

export default FavoritesScreen;