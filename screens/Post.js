import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Post = ({ route, navigation }) => {
	const { userId, id } = route.params;
	return (
		<View>
			<Text>userId: {JSON.stringify(userId)}</Text>
			<Text>id: {JSON.stringify(id)}</Text>
		</View>
	);
};

export default Post;

const styles = StyleSheet.create({});
