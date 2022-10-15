const { Router } = require("express");
const { Operation } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
  const allOp = await Operation.findAll()
  res.status(200).send(allOp)
})

router.get('/:idUser', async (req, res) => {
  try {
    const idOp = await Operation.findAll({
      where: {idUser: req.params.idUser}
    })
    if (idOp.length > 0) return res.status(200).send(idOp);
  } catch (error) {
    res.status(404).send("No operation matches that ID");
  }
})

router.get('/specific/:id', async (req, res) => {
  try {
    const idOp = await Operation.findAll({
      where: {id: req.params.id}
    })
    if (idOp.length > 0) return res.status(200).send(idOp);
  } catch (error) {
    res.status(404).send("No operation matches that ID");
  }
})

router.post('/', async (req, res) => {
  const {
    amount,
    category,
    concept,
    date,
    idUser,
    type    
  } = req.body

  let newOperation = await Operation.create({
    concept: concept,
    amount: amount,
    type: type,
    category: category,
    date: date,
    idUser: idUser
  })

  res.status(200).send(newOperation)
})

router.put('/specific/:id', async (req, res) => {
  const {concept, amount, date, type, category} = req.body
  try {
   await Operation.update(
      {concept, amount, date, type, category},
      {
        where: { id: req.params.id },
      }
    )
    return res.status(200).send('Operation succesfully edited');
  } catch (error) {
    res.status(404).send("No operation matches that ID");
  }
})

router.delete('/specific/:id', async (req, res) => {
  try {
    await Operation.destroy({
      where: {id: req.params.id},
      force: true
      })
    return res.status(200).send('Succesfully deleted!');
  } catch (error) {
    res.status(404).send("No operation matches that ID");
  }
})

module.exports = router