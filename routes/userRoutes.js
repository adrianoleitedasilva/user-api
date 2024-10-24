const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     description: List all users
 *     responses:
 *       200:
 *         description: Returns a list of users
 */
router.get('/users', userController.listUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: name
 *         description: Name of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Update user details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
