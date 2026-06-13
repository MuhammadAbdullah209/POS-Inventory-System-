import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token" });
        }
        const rawToken = token.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
            console.log(decoded)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token Expired!" })
            }
            return res.status(400).json({
                error: "Token Error",
                success: false,
                message: "Access Token is missing or invalid!"
            })
        }
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}


export const isAdmin = (req, res, next) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user found"
            });
        }


        if (req.user.role === "admin") {
            console.log(req.user.role)
            return next();
        }


        return res.status(403).json({
            success: false,
            message: "Access Denied: You are not an admin!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const isStaff = (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user found"
            });
        }

        if (req.user.role === "staff") {
            console.log(req.user.role);
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access Denied: You are not a staff member!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};