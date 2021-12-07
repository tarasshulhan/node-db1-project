const db = require('../../data/db-config')

const getAll = async () => {
  const accounts = await db('accounts')
    .select('id', 'name', 'budget')
    .orderBy('id')
  return accounts
}

const getById = async id => {
  const [account] = await db('accounts')
    .select('id', 'name', 'budget')
    .where('id', id)
  return account
}

const create = async account => {
  const [accountId] = await db('accounts').insert(account)
  const newAccount = await getById(accountId)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts')
    .update(account)
    .where('id', id)
  const updated = await getById(id)
  return updated
}

const deleteById = async id => {
  const deleted = await getById(id)
  await db('accounts')
  .delete()
  .where('id', id)
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
