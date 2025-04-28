const { body } = require('express-validator');

exports.validateEvent = [
    body('FirstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must only contain letters')
        .escape(),

    body('LastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must only contain letters')
        .escape(),

    body('Email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),

    body('PhoneNumber')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number'),

    body('Country')
        .trim()
        .notEmpty().withMessage('Country is required')
        .escape(),

    body('EventType')
        .trim()
        .notEmpty().withMessage('Event type is required')
        .escape(),

    body('EventDate')
        .notEmpty().withMessage('Event date is required')
        .isISO8601().withMessage('Event date must be a valid date'),

    body('GuestCount')
        .notEmpty().withMessage('Guest count is required')
        .isInt({ min: 1 }).withMessage('Guest count must be at least 1'),

    body('SpecialRequests')
        .optional()
        .trim()
        .escape()
];
