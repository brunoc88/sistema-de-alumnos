const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.token; // Obtén el token de las cookies

    if (!token) {
        return res.status(401).redirect('/home/login'); // Redirige al login si no hay token
    }

    try {
        const decoded = jwt.verify(token, 'mi clave secreta'); // Verifica y decodifica el token
        req.user = decoded; // Guarda los datos del token decodificado en `req.user`
        next(); // Continúa con la siguiente función de middleware o controlador
    } catch (error) {
        console.error('Token inválido o expirado', error);
        return res.status(403).redirect('/home/login'); // Redirige al login si el token es inválido
    }
}

function verifyRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.rol === role) {
            next(); // Si el usuario tiene el rol requerido, continúa
        } else {
            return res.status(404).send(`
                <h1>404 - Not found!</h1>
            `);
        }
    };
}

module.exports = { verifyToken, verifyRole };
