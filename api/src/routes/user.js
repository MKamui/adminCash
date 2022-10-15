const { Router } = require("express");
const{ User } = require('../db') 

const router = Router()

router.get('/', async (req, res) => {
  const allUsers = await User.findAll()
  res.status(200).send(allUsers)
})

router.get('/:id', async (req, res) => {
  try {
    const idUs = await User.findAll({
      where: {id: req.params.id},
    })
    if (idUs.length > 0) return res.status(200).send(idUs);
  } catch (error) {
    res.status(404).send("No user matches that ID");
  }
})

router.post('/', async (req, res) => {
  const {
    email,
    idUser   
  } = req.body

  let newUser = await User.create({
    email:email,
    idUser:idUser
  })

  res.status(200).send(newUser)
})

module.exports = router