var router= require('express').Router();


router.get('/', function(req,res,next){

  res.send("");

})


router.post('/', function(req,res,next){
  console.log(req.sessionID);
  


})



module.exports=router;
