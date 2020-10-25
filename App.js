import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const App = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const renderItem = ({ item }) => {
		return (
			<View style={styles.itemRow}>
				<Text>{item.title}</Text>
			</View>
		);
	};

	const getPosts = async () => {
		const rawnetApi = "https://cors-anywhere.herokuapp.com/https://rawnet-react-native-test.glitch.me/posts.json";
		fetch(rawnetApi, {
			// mode: "no-cors"
		})
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

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5fcff",
	},
	itemRow: { borderBottomColor: "#eee", padding: 10, borderBottomWidth: 1 },
});
