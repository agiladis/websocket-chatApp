const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Sentry = require('@sentry/node');

const ResponseTemplate = require('../helper/response.helper');
const { activatedMailer } = require('../lib/mailer');

async function activateAccount(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json(
          ResponseTemplate(null, 'bad request', 'account does not exist', 404)
        );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });

    if (!updatedUser.isVerified) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'bad request', 'activation failed', 400));
    }

    await activatedMailer(updatedUser.email);

    return res.status(200).json(ResponseTemplate(null, 'success', null, 200));
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = activateAccount;
