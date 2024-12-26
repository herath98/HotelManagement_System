// validationMiddleware.js
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        role: Joi.string().valid('admin', 'manager', 'staff').required(),
        mobile: Joi.string().required(),
        address: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    next();
};

export const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    next();
};

export const verifyUser = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return sendResponse(res, ResponseStatus.UNAUTHORIZED, 'No token provided');
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
        return sendResponse(res, ResponseStatus.UNAUTHORIZED, 'Invalid token format');
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request object
        req.userId = decoded.id;
        req.userRole = decoded.role;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return sendResponse(res, ResponseStatus.UNAUTHORIZED, 'Token has expired');
        }
        return sendResponse(res, ResponseStatus.FORBIDDEN, 'Invalid token');
    }
};

// Role-based middleware
export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ 
                message: 'Access denied: insufficient permissions' 
            });
        }
        next();
    };
};

export const validateUpdate = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().required(), // ID is required
        username: Joi.string().min(3),
        role: Joi.string().valid('admin', 'manager', 'staff'),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        mobile: Joi.string(),
        address: Joi.string()
    }).min(2); // At least one field besides `id` must be provided

    const { error } = schema.validate(req.body);
    if (error) {
        return sendResponse(
            res,
            ResponseStatus.BAD_REQUEST,
            error.details[0].message
        );
    }
    next();
};
