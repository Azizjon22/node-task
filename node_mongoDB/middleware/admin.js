module.exports = function (req, res, next) {
    try {
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).send("Murojaat rad etildi: admin huquqlari talab qilinadi");
      }
      next();
    } catch (err) {
      console.error("Admin tekshiruvida xatolik:", err.message);
      res.status(500).send("Server xatosi");
    }
  };
  