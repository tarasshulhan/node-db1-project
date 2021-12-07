const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.name.trim() || !req.body.budget) {
    next({ status: 400, message: "name and budget are required" })
  } else if(typeof req.body.name != 'string'){
    next({ status: 400, message: "name of account must be a string" })
  } else if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else if(typeof req.body.budget != 'number'){
    next({ status: 400, message: "budget of account must be a number" })
  } else if(req.body.budget < 0 || req.body.budget > 1000000){
    next({ status: 400, message: "budget of account is too large or too small" })
  }else{
    req.name = req.body.name.trim()
    req.budget = req.body.budget
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    if(accounts.some(account => account.name === req.body.name.trim())){
      next({ status: 400, message: "that name is taken" })
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    if(account){
      req.account = account;
      next()
    }else{
      next({ status: 404, message: "account not found" })
    }
  }catch(err){
    next(err)
  }
}
