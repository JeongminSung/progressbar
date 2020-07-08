import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import Skeleton from "./Skeleton";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import styled from "styled-components/native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(movies && movies.length * Math.random())
  );

  const getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    setLoading(false);
    setMovies(movies);
  };

  useEffect(getMovies, []);

  const onPress = () => {
    setRandomNumber(Math.floor(movies && movies.length * Math.random()));
  };

  return (
    <View style={styles.container}>
      <Title> 랜덤 영화추천 😎 </Title>
      {loading ? (
        <Skeleton
          style={{ marginBottom: 10 }}
          width={280}
          height={24}
        ></Skeleton>
      ) : (
        <Name>{movies && movies[randomNumber].title}</Name>
      )}
      {loading ? (
        <Skeleton variant="rect" style={{ marginBottom: 10 }}>
          <Image
            style={{ height: 400, width: 300 }}
            source={movies && { uri: movies[randomNumber].medium_cover_image }}
          ></Image>
        </Skeleton>
      ) : (
        <Image
          style={{ height: 400, width: 300, marginBottom: 10 }}
          source={movies && { uri: movies[randomNumber].medium_cover_image }}
        ></Image>
      )}
      {loading ? (
        <Skeleton style={{ marginBottom: 10 }} width={100}></Skeleton>
      ) : (
        <Desc style={{ marginBottom: 10 }}>
          The Rating is {movies && movies[randomNumber].rating}
        </Desc>
      )}
      {loading ? (
        <Skeleton style={{ marginBottom: 10 }} width={200}></Skeleton>
      ) : (
        <Desc style={{ marginBottom: 10 }}>
          The Genres is {movies && movies[randomNumber].genres}
        </Desc>
      )}
      <TouchableOpacity onPress={onPress}>
        <More>ONE MORE</More>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383e56",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Title = styled.Text`
  font-size: 36px;
  font-weight: 600;
  color: #383e56;
  margin-bottom: 20px;
  background-color: #f69e7b;
`;

const More = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #383e56;
  padding: 10px;
  margin: 10px;
  background-color: #d4b5b0;
  border-radius: 10px;
`;

const Desc = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #f3e1e1;
  /* text-transform: uppercase; */
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #f3e1e1;
`;
