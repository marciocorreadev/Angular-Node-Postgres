"use strict";
const jwt = require("jsonwebtoken");

module.exports = {
    checkJWT(req, res, next) {
        const authToken = req.headers["authorization"];
        if (authToken != undefined) {
            const bearer = authToken.split(" ");
            const token = bearer[1];
            jwt.verify(token, process.env.JWTSecret, (error, data) => {
                if (error != null) {
                    return res.status(401).json({
                        status: "error",
                        statusCode: 401,
                        info: "Invalid token",
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).json({
                status: "error",
                statusCode: 401,
                info: "Invalid token",
            });
        }
    },

    generateJWT(password) {
        return new Promise((resolve, reject) => {
            jwt.sign({ password }, process.env.JWTSecret, { expiresIn: "365d" }, (error, token) => {
                if (error != null) {
                    reject({ status: false, error: error });
                } else {
                    resolve({ status: true, token: token });
                }
            });
        });
    },
};
