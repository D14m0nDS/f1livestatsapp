import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Platform, StatusBar, ImageBackground, Button, StyleSheet } from 'react-native';
import { fetchCurrentSeasonSchedule } from '../api/ergastApi'; // Make sure to create this service

const parseRaceDateTime = (date, time) => new Date(`${date}T${time}`);

const RaceItem = ({ race, showSpoilers }) => (
    <ImageBackground source={race.image} style={race.isFeatured ? styles.featuredRace : styles.raceItem}>
        <Text style={styles.raceTitle}>{race.name}</Text>
        <Text style={styles.raceDate}>{race.date.split('T')[0]}</Text>
        {showSpoilers && race.finished && (
            <View style={styles.spoilerContent}>
                <Text>1st: {race.results[0]}</Text>
                <Text>2nd: {race.results[1]}</Text>
                <Text>3rd: {race.results[2]}</Text>
            </View>
        )}
    </ImageBackground>
);

function HomeScreen() {
    const [spoiler, setSpoiler] = useState(false);
    const [sortedRaces, setSortedRaces] = useState([]);

    useEffect(() => {
        const loadRaces = async () => {
            const racesData = await fetchCurrentSeasonSchedule();
            const upcomingRaceIndex = racesData.findIndex(race => parseRaceDateTime(race.date, race.time) >= new Date());

            if (upcomingRaceIndex > -1) {
                const upcomingRace = racesData.splice(upcomingRaceIndex, 1)[0];
                upcomingRace.isFeatured = true;
                racesData.unshift(upcomingRace);
            }

            setSortedRaces([...racesData]);
        };

        loadRaces();
    }, []);

    const toggleSpoiler = () => setSpoiler(!spoiler);

    return (
        <View style={styles.screen}>
            <TextInput
                placeholder="Search driver, team, etc"
                placeholderTextColor="#CCCCCC"
                style={styles.searchBar}
            />
            <Button title={spoiler ? "Hide Spoilers" : "Show Spoilers"} onPress={toggleSpoiler} />

            <FlatList
                data={sortedRaces}
                renderItem={({ item }) => <RaceItem race={item} showSpoilers={spoiler} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#332B30',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    searchBar: {
        backgroundColor: '#231E24',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        color: '#CCCCCC',
    },
    featuredRace: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    raceItem: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    raceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    raceDate: {
        fontSize: 18,
        color: 'white',
    },
    spoilerContent: {
        color: '#cccccc',
    },
});

export default HomeScreen;