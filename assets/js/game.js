// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's healh is zero or less

// function to start a new game
var startGame = function () {
	// reset the player stats
	playerInfo.reset();

	for (var i = 0; i < enemyInfo.length; i++) {
		if (playerInfo.health > 0) {
			// let the player know what round they are in
			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

			// pick new enemy to fight based on index of enemyInfo array
			var pickedEnemyObj = enemyInfo[i];

			// reset enemy health before starting new fight
			pickedEnemyObj.health = randomNumber(40, 60);

			// pass the pickedEnemyObj object's value into the fight function
			fight(pickedEnemyObj);

			// if the player is still alive and we're not at the last enemy in the array
			if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
				// ask the player if they want to use the store before next round
				var storeConfirm = window.confirm(
					"The fight is over, visit the store before the next round?"
				);

				// if yes, take them to the store() function
				if (storeConfirm) {
					shop();
				}
			}
		} else {
			window.alert("You have lost your robot in battle! Game Over!");
			break;
		}
	}

	// after the loop ends, player is either out of health or enemies to fight, so run the endGane function
	endGame();
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
	var value = Math.floor(Math.random() * (max - min + 1)) + min;

	return value;
};

// function to end the entire game
var endGame = function () {
	// if the player is still alive, the player wins!
	if (playerInfo.health > 0) {
		window.alert(
			"Great job, you've survived the game! You now have a score of " +
				playerInfo.money +
				"."
		);

		// get the previous high scores from the local storage
		prevHighScore = localStorage.getItem("highScore");
		prevRobotName = localStorage.getItem("robotName");

		// Compare the current highscore to the local high score
		if (localStorage.getItem("highScore") === null) {
			// send a message that the first high score has been set
			alert("You've set the first high score! Try to beat it next time!");

			// set the local high score and record the robot name
			localStorage.setItem("highScore", playerInfo.money);
			localStorage.setItem("robotName", playerInfo.name);
		} else if (playerInfo.money > localStorage.getItem("highScore")) {
			// send a message that the high score has been beaten
			alert(
				"You've set a new high score! Well done! The old high score of " +
					prevHighScore +
					" was held by " +
					prevRobotName
			);

			// set the local high score and record the robot name
			localStorage.setItem("highScore", playerInfo.money);
			localStorage.setItem("robotName", playerInfo.name);
		} else {
			// send a message that the high score has not been beaten
			alert(
				"You weren't able to beat the high score! The current high score is " +
					prevHighScore +
					" held by " +
					prevRobotName
			);
		}
	} else {
		window.alert("You've lost your robot in battle.");
	}

	// ask a player if they'd like to play again
	var playAgainConfirm = window.confirm("Would you like to play again?");

	if (playAgainConfirm) {
		// restart the game
		startGame();
	} else {
		window.alert("Thank you for playing Robot Gladiators! Come back soon!");
	}
};

// determine whether the player wants to fight or skip the round
var fightOrSkip = function () {
	// ask the player if they'd like to fight or skip using fightOrSkip function
	var promptFight = window.prompt(
		"Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
	);

	// ENTER THE CONDITIONAL RECURSIVE FUNCTION CALL HERE
	if (!promptFight) {
		window.alert("You need to provide a valid answer! Please try again.");
		return fightOrSkip();
	}

	promptFight = promptFight.toLowerCase();

	// if the player picks "skip", confirm and then stop the loop
	if (promptFight === "skip") {
		// confirm player wants to skip
		var confirmSkip = window.confirm("Are you sure you'd like to quit?");

		// if yes (true), leave fight
		if (confirmSkip) {
			window.alert(
				playerInfo.name + " has decided to skip this fight. Goodbye!"
			);
			// subtract money from playerMoney for skipping
			playerInfo.playerMoney = playerInfo.money - 10;

			return true;
		}
	}

	return false;
};

// compute the robot fight
var fight = function (enemy) {
	// keep track of who goes first
	var isPlayerTurn = true;

	if (Math.random() > 0.5) {
		isPlayerTurn = false;
	}

	// repeat and execute as long as the enemy-robot is alive
	while (enemy.health > 0 && playerInfo.health > 0) {
		if (isPlayerTurn) {
			// ask the player if they would like to fight or skip the round
			if (fightOrSkip()) {
				break;
			}
			// generate random damage value based on player's attack power
			var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

			// subtract the value of "damage" from the value of "enemy.health" and use that result to update the value in the "enemy.health" variable
			enemy.health = Math.max(0, enemy.health - damage);

			// log a resulting message to the console so we know that it worked
			console.log(
				playerInfo.name +
					" attacked " +
					enemy.name +
					". " +
					enemy.name +
					" now has " +
					enemy.health +
					" health remaining."
			);

			// check enemy's health
			if (enemy.health <= 0) {
				window.alert(enemy.name + " has died!");

				// award player money for winning
				playerInfo.money = playerInfo.money + 20;

				// leave while() loop since the enemy is dead
				break;
			} else {
				window.alert(
					enemy.name + " still has " + enemy.health + " health left."
				);
			}
		} else {
			// generate random damage value based on the enemy's attack power
			var damage = randomNumber(enemy.attack - 3, enemy.attack);

			// subtract the value of "enemy.attack" from the value of "playerInfo.health" and use that results to update the value in the "playerInfo.health" variable
			playerInfo.health = Math.max(0, playerInfo.health - damage);

			// log a resulting message to the console so we know that it worked
			console.log(
				enemy.name +
					" attacked " +
					playerInfo.name +
					". " +
					playerInfo.name +
					" now has " +
					playerInfo.health +
					" health remaining."
			);

			// check player's health
			if (playerInfo.health <= 0) {
				window.alert(playerInfo.name + " has died!");

				// leave while() loop if player is dead
				break;
			} else {
				window.alert(
					playerInfo.name + " still has " + playerInfo.health + " health left."
				);
			}
		}

		// switch turn order for next round
		isPlayerTurn = !isPlayerTurn;
	}
};

// shop function
var shop = function () {
	// ask the player what they'd like to do
	var shopOptionPrompt = window.prompt(
		"would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice"
	);

	shopOptionPrompt = parseInt(shopOptionPrompt);

	// use switch to carry out action
	switch (shopOptionPrompt) {
		case 1:
			playerInfo.refillHealth();

			break;

		case 2:
			playerInfo.upgradeAttack();

			break;

		case 3:
			window.alert("Leaving the store.");

			// do nothing, so function will end
			break;

		default:
			window.alert("You did not pick a valid option. Try again.");

			// call shop() again to force player to pick a valid option
			shop();
			break;
	}
};

// function to set name
var getPlayerName = function () {
	var name = "";

	while (name === "" || name === null) {
		name = prompt("What is your robot's name?");
	}

	console.log("Your robot's name is " + name);
	return name;
};

// initialize the player's robot
var playerInfo = {
	name: getPlayerName(),
	health: 100,
	attack: 10,
	money: 10,
	reset: function () {
		this.health = 100;
		this.money = 10;
		this.attack = 10;
	},
	refillHealth: function () {
		if (this.money >= 7) {
			window.alert("Refilling player's health by 20 for 7 dollars.");
			this.health += 20;
			this.money -= 7;
		} else {
			window.alert("You don't have enough money!");
		}
	},
	upgradeAttack: function () {
		if (this.money >= 7) {
			window.alert("Upgrading player's attack by 6 for 7 dollars.");
			this.attack += 6;
			this.money -= 7;
		} else {
			window.alert("You don't have enough money!");
		}
	},
};

// initialize the enemy robots
var enemyInfo = [
	{
		name: "Roborto",
		attack: randomNumber(10, 14),
	},
	{
		name: "Amy Android",
		attack: randomNumber(10, 14),
	},
	{
		name: "Robo Trumble",
		attack: randomNumber(10, 14),
	},
];

// start the game when the page loads
startGame();
