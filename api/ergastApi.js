export const teamLogos = {
    'red_bull': require('../assets/Team Logos/Red Bull.png'),
    'ferrari': require('../assets/Team Logos/Ferrari.png'),
    'mclaren': require('../assets/Team Logos/McLaren.png'),
    'alpine': require('../assets/Team Logos/Alpine.png'),
    'rb': require('../assets/Team Logos/RB.png'),
    'mercedes': require('../assets/Team Logos/Mercedes.png'),
    'haas': require('../assets/Team Logos/Haas.png'),
    'williams': require('../assets/Team Logos/Williams.png'),
    'aston_martin': require('../assets/Team Logos/Aston Martin.png'),
    'sauber': require('../assets/Team Logos/Kick.png'),
};


export async function fetchDriverStandings() {
    try {
        const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const json = await response.json();
        return json.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
            id: driver.Driver.driverId,
            rank: driver.position,
            nationality: driver.Driver.nationality,
            driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            team: driver.Constructors[0].name,
            teamLogo: teamLogos[driver.Constructors[0].constructorId.toLowerCase()] || null,
            points: driver.points,
            wins: driver.wins,
        }));
    } catch (error) {
        console.error('Failed to fetch driver standings:', error);
        return [];
    }
}

export async function fetchConstructorStandings() {
    try {
        const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
        const json = await response.json();
        return json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(constructor => ({
            id: constructor.Constructor.constructorId,
            rank: constructor.position,
            constructor: constructor.Constructor.name,
            teamLogo: teamLogos[constructor.Constructor.constructorId.toLowerCase()] || null,
            points: constructor.points,
            wins: constructor.wins,
        }));
    } catch (error) {
        console.error('Failed to fetch constructor standings:', error);
        return [];
    }
}
