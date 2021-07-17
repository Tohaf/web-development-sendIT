let fs = require ('fs');

let FILE_NAME = './assets/parcel.json';


let parcelRepo = {
    get: function(resolve, reject){
       fs.readFile(FILE_NAME, function(err,data){
           if(err){
               reject(err);
           }
           else{
               resolve(JSON.parse(data));
           }
       });
    },
    
    search: function (searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else {
                let parcel = JSON.parse(data);
                //perform search
                if(searchObject) {
                    // Example search object
                    // let searchObject = {
                    //    "id": 1,
                    //    "name": 'A'    
                    //  };
                    parcel = parcel.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                        (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
    
    
                }
    
                resolve(parcel);
            }
        });

    },

    getById: function (id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let parcel = JSON.parse(data).find(p => p.id == id);
                resolve(parcel);
            }
        });
    },

    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let parcel = JSON.parse(data);
                parcel.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(parcel), function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(newData);
                    }
                });
            }
        });
    },

    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let parcel = JSON.parse(data);
                let index = parcel.findIndex(p => p.id == id);
                if(index != -1){
                    parcel.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(parcel),function(data){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(index);
                        }
                    });
                }
            }

        });
    }
};




module.exports = parcelRepo;