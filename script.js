let clickCounter = 0;
const x = document.querySelectorAll(".x")
const o = document.querySelectorAll(".o")
const boxes = document.querySelectorAll(".box")
let winner = 0;
let score2 = document.querySelector(".score2")
let arrClicked = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let flag = false


const scoreChanger = (winner) => {
    let score = document.querySelector(".score" + winner).innerText //!takes the score class and adds 1 or 2 to accesses the winning player
    score = parseInt(score)
    document.querySelector(".score" + winner).innerHTML = score + 1 //!add 1 to the number of wins for the winning player
    document.querySelector(".winner").innerHTML = `Player ${winner} wins` //!print who won
}
const gameFunc = (player) => {
    //! when the game ends
    //! if there is a 3 in a row
    //! describes all the cases that someone can win and calls the function that updates the number of wins with the winning player
    //! if player 1 wins, the function is called with 1, if player 2 wins it is called with 2

    let winrows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    
    for (let i = 0; i < winrows.length; i++) {
        let row = winrows[i]
        if (arrClicked[row[0]] === player && arrClicked[row[1]] === player && arrClicked[row[2]] === player) { 
            scoreChanger(player)
            flag = true
        }
    }


        //! or if all the boxes were clicked but there is no winner-> tie
        if (clickCounter == 9) {
            document.querySelector(".winner").innerHTML = "Tie";
        }
    }

    const clickAndPick = () => {
        //! function that counts all the clicks on boxes 
        //!this function will work as long as flag is false.
        //! when someone won the game, flag will be true and no more boxes can be clicked
        for (let i = 0; i < boxes.length; i++) {
            let element = boxes[i]
            element.addEventListener("click", function () {
                if (flag) return

                if (arrClicked[element.id - 1] != 0) return  //!if box is not clicked
                //! element.id-1 gives us the box id minus 1 because arr starts with 0
                clickCounter++
                let player = clickCounter % 2 === 0 ? 2 : 1
                arrClicked[element.id - 1] = player
                gameFunc(player)
                
                if (clickCounter % 2 == 0) { //! if player 2 plays
                    o[element.id - 1].style.visibility = "visible"; //!make the image of player 2 visible                    
                    return
                }                
                
                x[element.id - 1].style.visibility = "visible"; //!make the image of player 1 visible            

            })
        }
    }

    clickAndPick()


    //! restart button restarts the game and empties the array
    document.querySelector(".btn").addEventListener("click", function () {
        console.log("restart")
        arrClicked = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let j = 0; j < boxes.length; j++) {
            o[j].style.visibility = "hidden";
            x[j].style.visibility = "hidden";

        }
        clickCounter = 0;
        flag = false;
        document.querySelector(".winner").innerHTML = ""; //!empty the winner message
    })