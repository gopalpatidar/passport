var db=require('../model/localschema');
module.exports={
    adduser:(data)=>{
        return new Promise((resolve,reject)=>{
        db.create(data ,function(err,result){
            if(err)
            reject(err);
          else 
             resolve(result);
        })
    })
    },
    showuser:(Gmail,pass)=>{
        return new Promise((resolve,reject)=>{
            db.find({'Gmail':Gmail,'passWord':pass},(err,result)=>{
                if(err)
                  reject(err);
                else 
                   resolve(result);
            })
        })
    },
    checkuser:(Gmail)=>{
        return new Promise((resolve,reject)=>{
            db.find({'Gmail':Gmail},(err,result)=>{
                if(result.length==0)
                resolve(result);
                else 
                   reject(err)
            })
        })
    }
}