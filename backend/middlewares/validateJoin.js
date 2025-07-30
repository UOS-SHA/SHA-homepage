const { body, validationResult } = require('express-validator');


/*

exports.validateJoin = {
    body('name').notEmpty().withMessage('이름은 필수'),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array()});
        } 
        next();
    };
}

*/