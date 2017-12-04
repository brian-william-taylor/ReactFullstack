module.exports = (req, res, next) => {
  //Next is called when you want to move to the next middleware in the chain

  if(!req.user){
    return(res.status(401).send({error: 'You must be logged in!'}))
  }

  next();
}
