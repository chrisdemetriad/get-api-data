import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Post = ({ route, navigation }) => {
	const { userId, title, body, postId } = route.params;

	const [author, setAuthor] = useState("");
	const [email, setEmail] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		// const rawnetUsersApi = "https://cors-anywhere.herokuapp.com/https://rawnet-react-native-test.glitch.me/users.json";
		// fetch(rawnetUsersApi)
		// 	.then((response) => response.json())
		// 	.then((json) => {
		// 		setUsers(json);
		// 		console.log(json);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	})
		// 	.finally(() => {
		// 		console.log("FINALLY!");
		// 	});

		const rawnetUsersApi = "https://cors-anywhere.herokuapp.com/https://rawnet-react-native-test.glitch.me/users.json";
		const rawnetCommentsApi = "https://cors-anywhere.herokuapp.com/https://rawnet-react-native-test.glitch.me/comments.json";

		Promise.all([fetch(rawnetUsersApi), fetch(rawnetCommentsApi)])
			.then(function (responses) {
				// Get a JSON object both responses
				return Promise.all(
					responses.map(function (response) {
						return response.json();
					})
				);
			})
			.then(function (data) {
				const commentsArray = data[1];
				const name = data[0][userId - 1].name;
				const email = data[0][userId - 1].email;
				setAuthor(name);
				setEmail(email);
				console.log(data[0][userId - 1]);
				console.log(commentsArray);

				const comments = commentsArray.filter((comment) => {
					return comment.postId === postId;
				});

				setComments(comments);
				console.log(comments);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<View>
			<Text>Post id: {JSON.stringify(postId)}</Text>
			<Text>User id: {JSON.stringify(userId)}</Text>

			<Text>Title: {JSON.stringify(title)}</Text>
			<Text>Body: {JSON.stringify(body)}</Text>

			<Text>Author: {author}</Text>

			<Text>Email: {email}</Text>
			<Text>Comments: </Text>
			{comments.map((comment) => {
				return <Text key={comment.id}>{comment.name}</Text>;
			})}
		</View>
	);
};

export default Post;

const styles = StyleSheet.create({});
