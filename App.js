import React from "react";

import PostsList from "./screens/PostsList";
import Post from "./screens/Post";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="PostsList" component={PostsList} options={{ title: "Posts List" }} />
				<Stack.Screen name="Post" component={Post} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
