const Sentry = require('@sentry/node');
const ResponseTemplate = require('../helper/response.helper');

function Send(req, res) {
  try {
    const io = req.io;
    const { body } = req;

    // Emit pesan ke semua klien yang terhubung
    io.emit(body.receiverPhoneNumber, body);

    return res.status(200).json(ResponseTemplate(body, 'sent', null, 200));
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Send };
