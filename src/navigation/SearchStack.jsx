import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail}  options={{animation: "slide_from_right"}} />
    </Stack.Navigator>
  );
};

export default SearchStack;
