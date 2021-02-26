let utility = [];
const mgUserLib = require('../databaseLib/user.lib');
const global = require("../../global");

utility.validateUser = async (userId, accessToken) => {

    let user = await mgUserLib.getUserDetails(userId);

    if (!user) {
        return {
            success: false,
            responseCode: "INVALID_USER"
        }
    }
    if (user.status == global.BLOCKED) {
        return {
            success: false,
            responseCode: "USER_IS_BANNED"
        }
    }
    if (user.accessToken !== accessToken) {
        return {
            success: false,
            responseCode: "INVALID_ACCESS_TOKEN"
        }
    }
    return {
        success: true,
        responseData: user
    }
}

module.exports = utility;
