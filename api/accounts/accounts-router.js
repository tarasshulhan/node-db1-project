const router = require('express').Router()
const Accounts = require("./accounts-model")
const{
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
}=require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id',checkAccountId, async (req, res, next) => {
  try{
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Accounts.create({name: req.name, budget: req.budget})
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.json(updated)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId,async(req, res, next) => {
  try{
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
