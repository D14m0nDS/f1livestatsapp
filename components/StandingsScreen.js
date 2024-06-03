import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../stylesheets/styles';
import { fetchDriverStandings, fetchConstructorStandings } from '../api/ergastApi';

const TopTab = createMaterialTopTabNavigator();

const DriverStandingsHeader = () => (
    <View style={styles_standings.rowHeader}>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.rank]}>#</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.name]}>Driver</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.team]}>Team</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.points]}>Points</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.wins]}>Wins</Text>
    </View>
);

const ConstructorStandingsHeader = () => (
    <View style={styles_standings.rowHeader}>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.rank]}>#</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.team]}>Logo</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.constructor]}>Constructor</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.points]}>Points</Text>
        <Text style={[styles_standings.cell, styles_standings.header, styles_standings.wins]}>Wins</Text>
    </View>
);

const DriverStandings = () => {
    const [driverData, setDriverData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDriverStandings().then(data => {
            setDriverData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#FFFFFF" />;
    }

    return (
        <FlatList
            data={driverData}
            ListHeaderComponent={DriverStandingsHeader}
            renderItem={({ item }) => (
                <View style={styles_standings.row}>
                    <Text style={[styles_standings.cell, styles_standings.rank]}>{item.rank}</Text>
                    <Text style={[styles_standings.cell, styles_standings.name]}>{item.driver}</Text>
                    <Image source={item.teamLogo} style={styles_standings.logo} />
                    <Text style={[styles_standings.cell, styles_standings.points]}>{item.points}</Text>
                    <Text style={[styles_standings.cell, styles_standings.wins]}>{item.wins}</Text>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    );
};

const ConstructorStandings = () => {
    const [constructorData, setConstructorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConstructorStandings().then(data => {
            setConstructorData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#FFFFFF" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#332B30" }}>
            <FlatList
                data={constructorData}
                ListHeaderComponent={ConstructorStandingsHeader}
                renderItem={({ item }) => (
                    <View style={styles_standings.row}>
                        <Text style={[styles_standings.cell, styles_standings.rank]}>{item.rank}</Text>
                        <Image source={item.teamLogo} style={styles_standings.logo} />
                        <Text style={[styles_standings.cell, styles_standings.constructor]}>{item.constructor}</Text>
                        <Text style={[styles_standings.cell, styles_standings.points]}>{item.points}</Text>
                        <Text style={[styles_standings.cell, styles_standings.wins]}>{item.wins}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const StandingsScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#332B30', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
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
        width: 40,
    },
    name: {
        width: 160,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    team: {
        width: 70,
        textAlign: 'center',
    },
    logo: {
        marginTop: "auto",
        marginBottom: "auto",
        width: 70,
        height: 30,
        resizeMode: 'contain',
    },
    constructor: {
        width: 140,
    },
    points: {
        width: 70,
        textAlign: 'center'
    },
    wins: {
        width: 70,
        textAlign: 'center'
    },
});

export default StandingsScreen;
