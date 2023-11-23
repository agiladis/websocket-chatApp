async function Chat(req, res) {
  return res.status(200).json({ data: 'berhasil masuk chat' });
  // decode token to get source phone nummber
  // get destination phone nummber
  // generate room chat
}

module.exports = Chat;
