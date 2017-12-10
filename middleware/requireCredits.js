module.exports = (req, res, next) => {
  //Next is called when you want to move to the next middleware in the chain

  if(req.user.credits < 1){
    return(res.status(403).send({error: 'Not enough credits!'}))
  }

  next();
}
