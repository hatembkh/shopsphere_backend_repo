const multer  = require('multer')
const fs = require('fs')
const path = require('path')

const uploadDir = './frontend/public'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // Lire tous les fichiers dans le dossier
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        return cb(err)
      }

      // Filtrer les fichiers qui commencent par "hatemshop" et extraire les numéros
      const hatemshopFiles = files.filter(f => f.startsWith('hatemshop'))
      const numbers = hatemshopFiles.map(f => {
        const match = f.match(/^hatemshop(\d+)\./)
        return match ? parseInt(match[1]) : 0
      })

      // Trouver le plus grand numéro et ajouter 1
      const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0
      const nextNumber = maxNumber + 1

      // Garder l'extension d'origine du fichier
      const ext = path.extname(file.originalname)

      // Construire le nom du fichier
      const filename = `hatemshop${nextNumber}${ext}`

      cb(null, filename)
    })
  }
})

const upload = multer({ storage })

module.exports = upload
