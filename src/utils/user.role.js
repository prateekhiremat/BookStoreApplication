const role = {
    USER: 'customer',
    ADMIN: 'admin'
}

export const userRole = (req, res, next) => {
    req.body.role = role.USER;
    next();
}

export const adminRole = (req, res, next) => {
    req.body.role = role.ADMIN;
    next();
}