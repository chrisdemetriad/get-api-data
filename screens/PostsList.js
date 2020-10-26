import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { CORS_PROXY, CORS_ANYWHERE_PROXY } from "./../utils/constants";

const PostsList = ({ navigation }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const renderItem = ({ item }) => {
		return (
			<View style={styles.itemRow}>
				<Text
					onPress={() =>
						navigation.navigate("Post", {
							userId: item.userId,
							title: item.title,
							body: item.body,
							postId: item.id,
						})
					}
				>
					{item.title}
				</Text>
			</View>
		);
	};

	const getPosts = async () => {
		// switch to CORS_ANYWHERE_PROX, if slow or not responding
		const rawnetPostsApi = CORS_PROXY + "https://rawnet-react-native-test.glitch.me/posts.json";
		fetch(rawnetPostsApi)
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return <FlatList style={styles.container} data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />;
};

export default PostsList;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f5fcff",
	},
	itemRow: { borderBottomColor: "#eee", padding: 10, borderBottomWidth: 1 },
});
