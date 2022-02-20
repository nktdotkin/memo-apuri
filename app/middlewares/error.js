const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err);
    next(err);
}

const errorResponder = (err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).send(JSON.stringify(err, null, 4));
    } else {
        next(err);
    }
}

const errorSafeResponder = (error, req, res, next) => {
    res.status(500).send(error);
}

module.exports = {errorLogger, errorResponder, errorSafeResponder}