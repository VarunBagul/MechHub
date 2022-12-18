const catchAsync = require('./../utils/CatchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home');
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('register', {
    title: 'Create your account',
  });
};
