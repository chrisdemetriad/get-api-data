import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import PostsList from "./screens/PostsList";
import Post from "./screens/Post";

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
