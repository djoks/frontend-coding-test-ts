module.exports = {
    client: {
        service: {
            name: 'graphql-pokeapi',
            url: 'https://graphql-pokeapi.vercel.app/api/graphql',
        },
        includes: [
            'src/**/*.vue',
            'src/**/*.ts',
        ],
    },
}