const Model = require('./model')
const subsController = require('../subscriptions/controller')
const newslettersController = require('../newsletters/controller')
const nodemailer = require('nodemailer')

const { mapNewsletter } = require('../newsletters/controller')
const buildEmail = require('./buildEmail')

function mapEmail (email) {
  if (!email) return null
  const { _id: id, sent_date: sentDate, emails, newsletter } = email
  return { id, sent_date: sentDate, emails, newsletter: mapNewsletter(newsletter) }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',

  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
})

async function sendEmail (newsletterId) {
  // get all the subscription emails
  const subs = await subsController.getSubscriptions()
  const newsLetterData = await newslettersController.getNewsLetterById(newsletterId)
  const emails = subs.map((sub) => sub.email)

  // build the model payload using the newsletter id and the emails
  const modelResult = new Model({
    newsletter: newsletterId,
    sent_date: new Date(),
    emails
  })

  // save the sent email on the DB
  const result = await modelResult.save()

  const emailOptions = {
    from: '"Newsletter" <newsletter@gmail.com>',
    subject: newsLetterData.subject,
    attachments: newsLetterData.file
      ? [{
          filename: newsLetterData.file_key,
          path: newsLetterData.file
        }]
      : []
  }

  for (const sub of subs) {
    // build and send the newsletter email to all the subscribers
    const info = await transporter.sendMail({
      ...emailOptions,
      to: sub.email,
      html: buildEmail(newsLetterData.body, sub.id)
    })
    console.log('Message sent: %s', info.messageId)
  }

  return mapEmail(result)
}

async function getEmails () {
  const modelResult = await Model.find().populate('newsletter')
  return modelResult.map(mapEmail)
}

module.exports = { sendEmail, getEmails }
