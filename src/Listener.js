const autoBind = require('auto-bind')

class Listener {
    constructor (playlistsService, mailSender) {
        this._playlistsService = playlistsService
        this._mailSender = mailSender

        autoBind(this)
    }

    async listen (message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString())

            const playlistsongs = await this._playlistsService.getSongsFromPlaylist(playlistId)
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistsongs))
            console.log(result)
        } catch (err) {
            console.error()
        }
    }
}

module.exports = Listener
