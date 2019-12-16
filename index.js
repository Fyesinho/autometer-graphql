const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');
const app = express();

//data
const {songs} = require('./data.json');

//schema
const schema = buildSchema(`
    type Query {
        song(id: String!): Song
        songs(type: String): [Song]
    }
    
    type Song {
        id: String
        title: String
        author: String
        bpm: Int
        type: String
    }
    
`);

//getters
const getSong = args => {
    const {id} = args;
    return songs.find(song => id === song.id)
};

const getSongs = args => {
    const {type} = args;
    return songs.filter(song => type === song.type)
};

const root = {
    song: getSong,
    songs: getSongs
};

app.use('/graphql', express_graphql({
    schema,
    rootValue: root,
    graphiql: true
}));
app.listen(2000, () => console.log('server on port 2000'));