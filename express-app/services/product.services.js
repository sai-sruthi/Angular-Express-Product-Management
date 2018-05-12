//let users = [];

var sql = require('mssql');
var path  = require('path');
var pc = {};

/**
 * Return users
 */
//const getUsers = () => users;
function getProducts(key,routeConfig,res){
	//	console.log(key);
        pc.config = routeConfig.dbConfig;
       return  sql.connect(pc.config).then(function () {
            new sql.Request()
		    .query("SELECT ProductId,Name, Type,Cost,Discount,HasOffer, InStock FROM dbo.Products WHERE Name LIKE '%"+key+"%' ORDER BY Name;").then(function (recordsets) {
		        sql.close();
		        var products = recordsets.recordset;
		        //  console.log("searched");
		        var toSendProducts = products.map(function (product, idx) {
		            // console.log(employee);
		            return {
		                ProductId: product.ProductId,
		                Name: product.Name,
		                Type: product.Type,
		                Cost: product.Cost,
		                Discount: product.Discount,
		                HasOffer: product.HasOffer,
                        InStock: product.InStock
		            };
		        });
		        res.send(toSendProducts);
		    }).catch(function (err) {
		        console.log(err);
		    });
        }).catch(function (err) {
            console.log(err);
        });
}

/**
 * Add user to the list
 */
function addProduct(product,routeConfig,res){
   		 pc.config = routeConfig.dbConfig

        var Name = product.Name;
		var Type = product.Type;
		var Cost = product.Cost;
		var Discount = product.Discount;
		var HasOffer = (product.HasOffer==true)?'true':'false';
        var InStock='true';

  return sql.connect(pc.config).then(function(){
			new sql.Request()
		    .input('Name', sql.VARCHAR(40), Name)
		    .input('Type', sql.VARCHAR(40), Type)
		    .input('Cost', sql.Int, Cost)
		    .input('Discount', sql.Int, Discount)
            .input('HasOffer',sql.Bit,HasOffer)
		    .input('InStock', sql.Bit, InStock)
		    .query("INSERT INTO dbo.Products (Name, Type, Cost, Discount, HasOffer, InStock) VALUES (@Name, @Type, @Cost, @Discount, @HasOffer,@InStock);" + 
		    	"SELECT SCOPE_IDENTITY() AS ProductId;").then(function(recordsets) {
        		
        		sql.close();
        		//console.log("R : " + recordsets.recordset[0].NoticeID);
        		res.send({ 
        			ProductId : recordsets.recordset[0].ProductId,
		        	Name : Name,
		        	Type : Type
		        });
			}).catch(function(err) {
		    	console.log(err);
		    });
		}).catch(function(err) {
		    console.log(err);
		});

}

/**
 * Update user 
 */
function updateProduct(product,routeConfig,res){
 pc.config = routeConfig.dbConfig
        var ProductId = parseInt(product.ProductId,10);
        var Name = product.Name;
		var Type = product.Type;
		var Cost = product.Cost;
		var Discount = product.Discount;
		var HasOffer = (product.HasOffer==true)?'true':'false';
        var InStock=(product.InStock==true)?'true':'false';
 return sql.connect(pc.config).then(function(){
			new sql.Request()
            .input('ProductId',sql.Int, ProductId)
		    .input('Name', sql.VARCHAR(40), Name)
		    .input('Type', sql.VARCHAR(40), Type)
		    .input('Cost', sql.Int, Cost)
		    .input('Discount', sql.Int, Discount)
            .input('HasOffer',sql.Bit,HasOffer)
		    .input('InStock', sql.Bit, InStock)
		    .query("UPDATE dbo.Products SET Name=@Name,Type=@Type, Cost=@Cost, Discount=@Discount, HasOffer=@HasOffer, InStock=@InStock WHERE ProductId=@ProductId;").then(function(recordsets){
        	    sql.close();
        		//console.log("R : " + recordsets.recordset[0].NoticeID);
        		res.send({ProductId : ProductId });
			}).catch(function(err){
		    	console.log(err);
		    });
		}).catch(function(err){
		    console.log(err);
		});
}


function deleteProduct(id,routeConfig,res){
    pc.config = routeConfig.dbConfig;
    //console.log(id);

    var ProductId = parseInt(id, 10);
	return 	sql.connect(pc.config).then(function(){
			new sql.Request()
		    .input('ProductId', sql.Int, ProductId)
		    .query('DELETE FROM dbo.Products WHERE ProductId = @ProductId;').then(function(recordsets) {
		        sql.close();
		        res.send({ ProductId : ProductId});
		    }).catch(function(err) {
		    	console.log(err);
		    });
		}).catch(function(err) {
		    console.log(err);
		});
   
}

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}