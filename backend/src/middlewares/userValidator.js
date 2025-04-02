import { body } from 'express-validator';
import { usersCollection } from '../db.js';

export const SignupValidator = [

    // Username validation
    body('username')
        .notEmpty().withMessage('Username is required')
        .custom(async (username) => {
            // Check if username already exists
            const userExists = await usersCollection.findOne({ username });
            if (userExists) {
                throw new Error('Username is already taken');
            }
            return true;
        }),

    // Password validation 1 digit, 1 uppercase, minimum 6 chars
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one digit'),
    async (req, res) => {
        // Access the validation erros
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    }
]

export const UpdateValidator = [
    body('username').notEmpty().withMessage('Username is required')
        .custom(async (username) => {
        // Check if username already exists
        const userExists = await usersCollection.findOne({ username });
        if (userExists) {
          throw new Error('Username is already taken');
        }
        return true;
      }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one digit')
]

