import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import UserDetail from '../screens/UserDetail';
import Follow from '../screens/Follow';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Follow" component={Follow} />
    </Stack.Navigator>
  );
};

export default HomeStack;
