var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
// Establish connection to database
connection.connect(function(err) {
    if (err) throw err;
});

// Perform a get query to retrieve the stores items.
connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    
    // console.log("Item Id | Product -- Department -- Price -- Quantity ");
    // console.log(res)
    //Loop through all the rows and print out their column values
    for (var i=0; i<res.length; i++){
        console.log(res[i])
    	
    		console.log(" " + res[i].item_id + "     | " + res[i].product_name + " -- " + res[i].dept_name + "--" + res[i].price + "--" + res[i].stock_quantity);
    	
    	
    }

    promptUser();
});

var promptUser = function(){

    // Prompt the user with a message
	inquirer.prompt([{
		name: "Item_ID",
		message: "Enter the ID.",

        // Make sure that they typed in a number and not a letter
		validate: function(value){
            if (isNaN(value) == false) {
                return true;
            }
            else {
            	return false;
            }
		}
	},{

        // After the first prompt, do another
        name: "userQuantity",
        message: "How many would you like to buy?",

        // And validate they typed in a number
        validate: function(value){
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
        // After the series of prompts
    }]).then(function(answers){

            // Set the userinput to currentItem and currentAmount
    		var currentItem = answers.Item_ID;
    		var currentAmount = answers.userQuantity;

            //Read from database. If they requested too much, don't perform the transaction.
            //Otherwise fulfuill the request.
            connection.query('SELECT * FROM products WHERE ?',{
                item_id: answers.Item_ID
            },function(err, res){

                //If the amount requested is greater than the amount in stock.
                if (currentAmount > res[0].stock_quantity){
                    console.log("Insufficient quantity!");

                    // Back to prompt
                    promptUser();
                }
                // Otherwise they may buy it
                else { 
                    console.log("You may purchase this item!");

                    // Calculate the new quantity to update in the database
                    var newQuantity = (res[0].stock_quantity - currentAmount);
                    var totalCost = res[0].price*currentAmount;

                    // Update the quantity
                    ///////
                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ? ', [newQuantity, answers.Item_ID], function(err, res){
                        connection.query('SELECT * FROM products', function(err, res) {
                            if (err) throw err;
                            
                            // console.log("Item Id | Product -- Department -- Price -- Quantity ");
                            // console.log(res)
                            //Loop through all the rows and print out their column values
                            for (var i=0; i<res.length; i++){
                                console.log(res[i])
                                
                                    console.log(" " + res[i].item_id + "     | " + res[i].product_name + " -- " + res[i].dept_name + "--" + res[i].price + "--" + res[i].stock_quantity);
                                
                                
                            }
                        
                            promptUser();
                        });
                    })
                    //////

                    // connection.query('Updating Inventory',[{
                    //     stock_quantity: newQuantity
                    // },{
                    //     item_id: currentItem
                    // }], function(err, res){
                    //     console.log("You were charged $" + totalCost);

                    //     // Back to the prompt
                    //     promptUser();
                    // });
                }
            })
	   })
}   