const cardsController = {};

cardsController.findCard = async (req, res, next) => {
  const cardName = req.query;
  try {
    const cardData = await fetch('');
    res.locals.cardData = cardData;
  } catch (err) {
    return next({
      log: 'Error in mtgController findCard middleware',
      message: { err: 'Error, unable to find card' },
    });
  }
};

module.exports = cardsController;
