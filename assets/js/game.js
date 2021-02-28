// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's healh is zero or less

// initialize the player's robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// initialize the enemy robots
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// compute the robot fight
var fight = function(enemyName) {

    // repeat and execute as long as the enemy-robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {

        // ask the player if they would like to fight or skip the round
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if the player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight 
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        } 
            
        // subtract the value of "playerAttack" from the value of "enemyHealth" and use that result to update the value in the "enemyHealth" variable
        enemyHealth = enemyHealth - playerAttack;

        // log a resulting message to the console so we know that it worked
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // subtract the value of "enemyAttack" from the value of "playerHealth" and use that results to update the value in the "playerHealth" variable
        playerHealth = playerHealth - enemyAttack;

        // log a resulting message to the console so we know that it worked
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else { 
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // let the player know what round they are in
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

        // pick new enemy to fight based on index of enemyNames array
        var pickedEnemyName = enemyNames[i];

        // reset enemyHealth before starting new fight
        enemyHealth = 50;

        // pass the pickedEnemyName variable's value into the fight function
        fight(enemyNames[i]);
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}