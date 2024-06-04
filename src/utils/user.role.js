const role = {
    USER: 'user'
}

export const userRole = (req, res, next) => {
    req.body.role = role.USER;
    next();
}