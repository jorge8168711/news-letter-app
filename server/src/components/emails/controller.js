const Model = require('./model')
const subsController = require('../subscriptions/controller')
const { mapNewsletter } = require('../newsletters/controller')

function mapEmail (email) {
  if (!email) return null
  const { _id: id, sent_date: sentDate, emails, newsletter } = email
  return { id, sent_date: sentDate, emails, newsletter: mapNewsletter(newsletter) }
}

async function sendEmail (newsletterId) {
  const subs = await subsController.getSubscriptions()
  const modelResult = new Model({
    newsletter: newsletterId,
    sent_date: new Date(),
    emails: subs.map(sub => sub.email)
  })

  const result = await modelResult.save()
  return mapEmail(result)
}

async function getEmails () {
  const modelResult = await Model.find().populate('newsletter')
  return modelResult.map(mapEmail)
}

module.exports = { sendEmail, getEmails }
