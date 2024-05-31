const racePhotos = {
    'bahrain': require('../assets/Race Photos/Bahrain.jpg'),
    'jeddah': require('../assets/Race Photos/Saudi Arabia.jpg'),
    'albert_park': require('../assets/Race Photos/Australia.jpg'),
    'suzuka': require('../assets/Race Photos/Japan.jpg'),
    'shanghai': require('../assets/Race Photos/China.jpg'),
    'miami': require('../assets/Race Photos/Miami.jpg'),
    'imola': require('../assets/Race Photos/Imola.jpg'),
    'monaco': require('../assets/Race Photos/Monaco.png'),
    'villeneuve': require('../assets/Race Photos/Villeneuve.jpg'),
    'catalunya': require('../assets/Race Photos/Catalunya.jpg'),
    'red_bull_ring': require('../assets/Race Photos/Red_bull_ring.jpg'),
    'silverstone': require('../assets/Race Photos/Silverstone.jpg'),
};

export async function fetchCurrentSeasonSchedule() {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return transformRaceData(data);
    } catch (error) {
        console.error('Failed to fetch race data:', error);
        return [];
    }
}


function transformRaceData(response) {
    return response.MRData.RaceTable.Races.map(race => {
        const raceDate = new Date(`${race.date}T${race.time}`);
        const cetDate = new Date(raceDate.getTime() - (raceDate.getTimezoneOffset() * 60000)); // Adjust for CET

        return {
            id: race.Circuit.circuitId,
            name: `FORMULA 1 ${race.raceName.toUpperCase()} ${race.season}`,
            date: cetDate.toISOString(),
            image: racePhotos[race.Circuit.circuitId] || null,
            finished: false,
            results: [],
        };
    });
}
export async function fetchRaceResults(raceId) {
    try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${raceId}/results.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();
        return results.MRData.RaceTable.Races[0].Results.map(result => result.Driver.familyName); // Example
    } catch (error) {
        console.error('Failed to fetch race results:', error);
        return [];
    }
}