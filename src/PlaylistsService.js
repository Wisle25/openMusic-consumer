const { Pool } = require('pg')

class PlaylistsService {
    constructor () {
        this._pool = new Pool()
    }

    async getPlaylists (playlistId) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer FROM playlists
            INNER JOIN playlistsongs ON playlistsongs.playlist_id = playlists.id
            INNER JOIN songs ON songs.id = playlistsongs.song_id
            WHERE playlists.id = $1`,
            values: [playlistId]
        }

        const result = await this._pool.query(query)
        return result.rows
    }
}

module.exports = PlaylistsService
