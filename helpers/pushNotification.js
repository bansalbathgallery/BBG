const FCM = require('fcm-push');

const userId = (token) => {
    const decoded = jwt.verify(token, configDev.jwtToken);
    return decoded.id;
}

const timestamp = () => {
	return time = moment.utc().format('X');
}

module.exports = {
    timestamp,
    userId
}