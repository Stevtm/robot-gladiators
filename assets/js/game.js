// initialize the player's robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerHealth, playerAttack);


// initialize the enemy robot
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

// compute the robot fight
var fight = function() {
    // alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators");

    // subtract the value of "playerAttack" from the value of "enemyHealth" and use that result to update the value in the "enemyHealth" variable
    enemyHealth = enemyHealth - playerAttack;

    // log a resulting message to the console so we know that it worked
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // subtract the value of "enemyAttack" from the value of "playerHealth" and use that results to update the value in the "playerHealth" variable
    playerHealth = playerHealth - enemyAttack;

    // log a resulting message to the console so we know that it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    )
};

fight();