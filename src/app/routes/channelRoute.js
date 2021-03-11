module.exports = function(app){
    const channel = require('../controllers/channelController');

    app.get('/channel/:user_id', channel.default);

    app.post('/channel', channel.createchannel);

    app.patch('/channel/:user_id/:video_id', channel.updatechannel);

    app.delete('/channel/:user_id/:video_id', channel.deletechannel);
};
