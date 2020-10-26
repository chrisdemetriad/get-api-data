import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CORS_PROXY, CORS_ANYWHERE_PROXY } from "./../utils/constants";

const Post = ({ route }) => {
	const { userId, title, body, postId } = route.params;

	const [author, setAuthor] = useState("");
	const [email, setEmail] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		// switch to CORS_ANYWHERE_PROX, if slow or not responding
		const rawnetUsersApi = CORS_PROXY + "https://rawnet-react-native-test.glitch.me/users.json";
		const rawnetCommentsApi = CORS_PROXY + "https://rawnet-react-native-test.glitch.me/comments.json";

		Promise.all([fetch(rawnetUsersApi), fetch(rawnetCommentsApi)])
			.then(function (responses) {
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

				const comments = commentsArray.filter((comment) => {
					return comment.postId === postId;
				});

				setComments(comments);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Title: {JSON.stringify(title)}</Text>
			<Text style={styles.text}>Post: {JSON.stringify(body)}</Text>
			<Text style={styles.text}>Author: {author}</Text>
			<Text style={styles.text}>Email: {email}</Text>
			<Text style={styles.text}>Comments: </Text>
			{comments.map((comment) => {
				return (
					<View key={comment.id} style={styles.text}>
						<Text style={styles.comment}>From: {comment.email}</Text>
						<Text style={[styles.comment, styles.separator]}>Title: {comment.name}</Text>
						<Text style={styles.comment}>Comment: {comment.body}</Text>
					</View>
				);
			})}
		</View>
	);
};

export default Post;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f5fcff",
	},
	text: { borderBottomColor: "#eee", padding: 10, borderBottomWidth: 1 },
	separator: { marginBottom: 10 },
	commentsContainer: {
		borderBottomColor: "#eee",
		borderBottomWidth: 1,
		padding: 10,
	},
	comment: {
		paddingLeft: 20,
	},
});
