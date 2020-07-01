const Authenticate = require('../middlewares/Authenticate');

module.exports = {
    index(req, res) {
        const { password } = req.body;
        if (password == process.env.SECRET) {
            Authenticate.generateJWT(password)
                .then(token => {
                    return res.status(200).json({
                        info: 'success',
                        statusCode: '200',
                        token: token.token,
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        info: 'Internal error',
                        statusCode: '500',
                        erros: error,
                    });
                });
        } else {
            return res.status(200).json({
                info: 'invalid password',
                statusCode: '401',
            });
        }
    },
};
