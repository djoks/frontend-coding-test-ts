const statColors: Record<string, string> = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    speed: '#FA92B2',
};

const getStatColor = (stat: string): string => {
    return statColors[stat] || '#FFFFFF';
};

export default getStatColor;