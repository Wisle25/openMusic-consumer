const autoBind = require('auto-bind')

class Listener {
    constructor (playlistsService, mailSender) {
        this._playlistsService = playlistsService
        this._mailSender = mailSender

        autoBind(this)
    }

    async listen (message) {
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString())

            const playlists = await this._playlistsService.getPlaylists(userId)
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists))
            console.log(result)
        } catch (err) {
            console.error()
        }
    }
}

module.exports = Listener
