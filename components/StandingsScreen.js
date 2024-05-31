import * as React from 'react';
import {View, Text, TextInput, FlatList, Image, StyleSheet, Platform, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../stylesheets/styles';



const teamLogos = {
    'Red Bull': require('../assets/Team Logos/Red Bull.png'),
    'Ferrari': require('../assets/Team Logos/Ferrari.png'),
    'McLaren': require('../assets/Team Logos/McLaren.png'),
    'Alpine': require('../assets/Team Logos/Alpine.png'),
    'RB': require('../assets/Team Logos/RB.png'),
    'Mercedes': require('../assets/Team Logos/Mercedes.png'),
    'Haas': require('../assets/Team Logos/Haas.png'),
    'Williams': require('../assets/Team Logos/Williams.png'),
    'Aston Martin': require('../assets/Team Logos/Aston Martin.png'),
    'Kick': require('../assets/Team Logos/Kick.png'),
};

const driverData = [
    { id: '1', rank: '1', nationality: 'Netherlands', driver: 'M. Verstappen', team: 'Red Bull', teamLogo: teamLogos['Red Bull'], points: '110', wins: '4', podiums: '4' },
    { id: '2', rank: '2', nationality: 'Mexico', driver: 'S. Pérez', team: 'Red Bull', teamLogo: teamLogos['Red Bull'], points: '85', wins: '0', podiums: '4' },
    { id: '4', rank: '4', nationality: 'Monaco', driver: 'C. Leclerc', team: 'Ferrari', teamLogo: teamLogos['Ferrari'], points: '76', wins: '0', podiums: '2' },
    { id: '3', rank: '3', nationality: 'Spain', driver: 'C. Sainz Jr.', team: 'Ferrari', teamLogo: teamLogos['Ferrari'], points: '69', wins: '1', podiums: '3' },
    { id: '5', rank: '5', nationality: 'UK', driver: 'L. Norris', team: 'McLaren', teamLogo: teamLogos['McLaren'], points: '58', wins: '1', podiums: '2' },
    { id: '6', rank: '6', nationality: 'Australia', driver: 'O. Piastri', team: 'McLaren', teamLogo: teamLogos['McLaren'], points: '38', wins: '0', podiums: '0' },
    { id: '7', rank: '7', nationality: 'UK', driver: 'G. Russell', team: 'Mercedes', teamLogo: teamLogos['Mercedes'], points: '33', wins: '0', podiums: '0' },
    { id: '8', rank: '8', nationality: 'Spain', driver: 'F. Alonso', team: 'Aston Martin', teamLogo: teamLogos['Aston Martin'], points: '31', wins: '0', podiums: '0' },
    { id: '9', rank: '9', nationality: 'UK', driver: 'L. Hamilton', team: 'Mercedes', teamLogo: teamLogos['Mercedes'], points: '19', wins: '0', podiums: '0' },
    { id: '10', rank: '10', nationality: 'Canada', driver: 'L. Stroll', team: 'Aston Martin', teamLogo: teamLogos['Aston Martin'], points: '9', wins: '0', podiums: '0' },
    { id: '11', rank: '11', nationality: 'Japan', driver: 'Y. Tsunoda', team: 'RB', teamLogo: teamLogos['RB'], points: '7', wins: '0', podiums: '0' },
    { id: '12', rank: '12', nationality: 'UK', driver: 'O. Bearman', team: 'Ferrari', teamLogo: teamLogos['Ferrari'], points: '6', wins: '0', podiums: '0' },
    { id: '13', rank: '13', nationality: 'Germany', driver: 'N. Hülkenberg', team: 'Haas', teamLogo: teamLogos['Haas'], points: '4', wins: '0', podiums: '0' },
    { id: '14', rank: '14', nationality: 'Denmark', driver: 'K. Magnussen', team: 'Haas', teamLogo: teamLogos['Haas'], points: '1', wins: '0', podiums: '0' },
    { id: '15', rank: '15', nationality: 'Thailand', driver: 'A. Albon', team: 'Williams', teamLogo: teamLogos['Williams'], points: '0', wins: '0', podiums: '0' },
    { id: '16', rank: '16', nationality: 'France', driver: 'E. Ocon', team: 'Alpine', teamLogo: teamLogos['Alpine'], points: '0', wins: '0', podiums: '0' },
    { id: '17', rank: '17', nationality: 'China', driver: 'G.Y. Zhou', team: 'Kick', teamLogo: teamLogos['Kick'], points: '0', wins: '0', podiums: '0' },
    { id: '18', rank: '18', nationality: 'Australia', driver: 'D. Ricciardo', team: 'RB', teamLogo: teamLogos['RB'], points: '0', wins: '0', podiums: '0' },
    { id: '19', rank: '19', nationality: 'France', driver: 'P. Gasly', team: 'Alpine', teamLogo: teamLogos['Alpine'], points: '0', wins: '0', podiums: '0' },
    { id: '20', rank: '20', nationality: 'Finland', driver: 'V. Bottas', team: 'Kick', teamLogo: teamLogos['Kick'], points: '0', wins: '0', podiums: '0' },
    { id: '21', rank: '21', nationality: 'USA', driver: 'L. Sargeant', team: 'Williams', teamLogo: teamLogos['Williams'], points: '0', wins: '0', podiums: '0' },
];

const constructorData = [
    { id: '1', rank: '1', constructor: 'Red Bull', teamLogo: teamLogos['Red Bull'], points: '195', wins: '4', podiums: '8' },
    { id: '2', rank: '2', constructor: 'Ferrari', teamLogo: teamLogos['Ferrari'], points: '151', wins: '1', podiums: '5' },
    { id: '3', rank: '3', constructor: 'McLaren', teamLogo: teamLogos['McLaren'], points: '96', wins: '0', podiums: '2' },
    { id: '4', rank: '4', constructor: 'Mercedes', teamLogo: teamLogos['Mercedes'], points: '52', wins: '0', podiums: '0' },
    { id: '5', rank: '5', constructor: 'Aston Martin', teamLogo: teamLogos['Aston Martin'], points: '40', wins: '0', podiums: '0' },
    { id: '6', rank: '6', constructor: 'RB', teamLogo: teamLogos['RB'], points: '7', wins: '0', podiums: '0' },
    { id: '7', rank: '7', constructor: 'Haas', teamLogo: teamLogos['Haas'], points: '5', wins: '0', podiums: '0' },
    { id: '8', rank: '8', constructor: 'Williams', teamLogo: teamLogos['Williams'], points: '0', wins: '0', podiums: '0' },
    { id: '9', rank: '9', constructor: 'Alpine', teamLogo: teamLogos['Alpine'], points: '0', wins: '0', podiums: '0' },
    { id: '10', rank: '10', constructor: 'Kick', teamLogo: teamLogos['Kick'], points: '0', wins: '0', podiums: '0' },
];

const TopTab = createMaterialTopTabNavigator();

const DriverStandingsHeader = () => (
    <View style={styles_standings.rowHeader}>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.rank]}>#</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.name]}>Driver</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.team]}>Team</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.points]}>Points</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.wins]}>Wins</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.podiums]}>Podiums</Text>
    </View>
);

const ConstructorStandingsHeader = () => (
    <View style={styles_standings.rowHeader}>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.rank]}>#</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.team]}>Logo</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.constructor]}>Constructor</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.points]}>Points</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.wins]}>Wins</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.podiums]}>Podiums</Text>
    </View>
);

const DriverStandings = () => {
    return (
        <FlatList
            data={driverData}
            ListHeaderComponent={DriverStandingsHeader}
            renderItem={({ item }) => (
                <View style={styles_standings.row}>
                    <Text style={[styles_standings.cell, styles_standings.rank]}>{item.rank}</Text>
                    <Text style={[styles_standings.cell, styles_standings.name]}>{item.driver}</Text>
                    <Image source={teamLogos[item.team]} style={styles_standings.logo} />
                    <Text style={[styles_standings.cell, styles_standings.points]}>{item.points}</Text>
                    <Text style={[styles_standings.cell, styles_standings.wins, ]}>{item.wins}</Text>
                    <Text style={[styles_standings.cell, styles_standings.podiums]}>{item.podiums}</Text>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    );
};

const ConstructorStandings = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#332B30"}}>
            <FlatList
                data={constructorData}
                ListHeaderComponent={ConstructorStandingsHeader}
                renderItem={({ item }) => (
                    <View style={styles_standings.row}>
                        <Text style={[styles_standings.cell, styles_standings.rank]}>{item.rank}</Text>
                        <Image source={teamLogos[item.constructor]} style={styles_standings.logo} />
                        <Text style={[styles_standings.cell, styles_standings.constructor]}>{item.constructor}</Text>
                        <Text style={[styles_standings.cell, styles_standings.points]}>{item.points}</Text>
                        <Text style={[styles_standings.cell, styles_standings.wins]}>{item.wins}</Text>
                        <Text style={[styles_standings.cell, styles_standings.podiums]}>{item.podiums}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>

    );
};
const StandingsScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#332B30' , paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
            <TextInput
                placeholder="Search driver, team, etc"
                placeholderTextColor="#CCCCCC"
                style={{
                    backgroundColor: '#231E24',
                    padding: 10,
                    margin: 10,
                    borderRadius: 20,
                }}
            />
            <TopTab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#CCCCCC',
                    tabBarIndicatorStyle: { backgroundColor: '#FFFFFF' },
                    tabBarStyle: { backgroundColor: '#332B30' },
                    tabBarLabelStyle: { textTransform: 'none', fontSize: 16 },
                }}
            >
                <TopTab.Screen name="Drivers" component={DriverStandings} />
                <TopTab.Screen name="Constructors" component={ConstructorStandings} />
            </TopTab.Navigator>
        </View>
    );
};


const styles_standings = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#332B30',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#332B30',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        color: '#FFFFFF',
    },
    header: {
        fontWeight: 'bold',
        color: '#FFFFFF',

    },
    rowHeader: {
        flexDirection: 'row',
        backgroundColor: '#332B30',
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',

    },
    rank: {
        width: 36,
    },
    name: {
        width: 112,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    team: {
        width: 56,
    },
    logo: {
        marginTop: "auto",
        marginBottom: "auto",
        width: 56,
        height: 30,
        resizeMode: 'contain',
    },
    constructor: {
        width: 112,
    },
    points: {
        width: 61,
        textAlign: 'center'
    },
    wins: {
        width: 51,
        textAlign: 'center'
    },
    podiums: {
        width: 80,
        textAlign: 'center'
    },
});
export default StandingsScreen;
