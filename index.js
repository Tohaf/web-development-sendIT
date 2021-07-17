let express = require('express');

let app = express();

let parcelRepo = require('./repo/parcelRepo');

let router = express.Router();

app.use(express.json());

router.get('/v1', function(req, res, next){
    parcelRepo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "ok",
            "message": "All details received",
            "data": data
        });
    },
        function(err){
            next(err);
    });
});

router.get('/search', function(req, res, next){
    let searchObject = {
        "user": req.query.user
    };

    parcelRepo.search(searchObject, function (data){
        res.status(200).json({
            "status": 200,
            "statusText": "ok",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.get('/:id', function(req, res, next){
    parcelRepo.getById(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "ok",
                "message": "single parcel retrieved.",
                "data": data
            });    
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "not found",
                "message": "the parcel '" + req.params.id + "'could not be found.",
                "error":{
                    "code": "NOT FOUND",
                    "Message": "The parcel '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err){
        next(err);
    });
});

router.post('/', function(req,res,next){
    parcelRepo.insert(req.body, function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "created",
            "message": "new pie added",
            "data": data
        });
    },    
        function(err){
            next(err);
        });
});

router.delete('/:id', function(req, res, next){
    parcelRepo.getById(req.params.id, function(data){
        if(data){
            parcelRepo.delete(req.params.id, function(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": 'ok',
                    "message": "the parcel ' " + req.params.id + " ' is deleted",
                    "data": "parcel '" + req.params.id + "' deleted"
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "not found",
                "message": "the parcel '" + req.params.id + " ' could not be deleted",
                "error":{
                    "code": "not found",
                    "message": "the parcel '" + req.params.id + "' could not delete"
                } 
            });
        }
    },  function(err){
        next(err);
    });
});

router.post('/', function(req,res,next){
    parcelRepo.insert(req.body, function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "created",
            "message": "new pie added",
            "data": data
        });
    },    
        function(err){
            next(err);
        });
});

router.delete('/:id', function(req, res, next){
    parcelRepo.getById(req.params.id, function(data){
        if(data){
            parcelRepo.delete(req.params.id, function(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": 'ok',
                    "message": "the parcel ' " + req.params.id + " ' is deleted",
                    "data": "parcel '" + req.params.id + "' deleted"
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "not found",
                "message": "the parcel '" + req.params.id + " ' could not be deleted",
                "error":{
                    "code": "not found",
                    "message": "the parcel '" + req.params.id + "' could not delete"
                } 
            });
        }
    },  function(err){
        next(err);
    });
});


app.use('/api/', router);

var server = app.listen(3000, function(){
    console.log("server is running on http://localhost:3000..");
});