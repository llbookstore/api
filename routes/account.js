const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const accountService = require('../services/account-service');
const { upload, errHandling } = require('../middleware/upload');
router
    .get('/happy-lunar-new-year', (req, res) => {
        res.json({
            success: true,
            err: 'none',
            msg: 'happy lunar new year------ be strong like a bull'
        })
    })
    .post('/account', auth, accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .get('/account/:id', accountService.getAccountById)
    .put('/account/:id', auth, upload.single('avatar'), errHandling, accountService.updateAccount)
    .put('/account/:id/change-password', auth, accountService.changePassword)
    .post('/login', accountService.login)

module.exports = router