const setTimeoutPromise = (ms:number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Displays square click
const click = async (elem: JQuery<HTMLElement>,  ms: number) => {
    $(elem).css('opacity', '1');

    return setTimeoutPromise(ms).then(() => {
        $(elem).css('opacity', '0.125');
    });
}

// Adds color to input array
const addColor = (sequence: Array<String>): Array<String> => {
    const nextColor = [
        'red', 
        'yellow', 
        'green', 
        'blue'
    ][Math.floor(Math.random() * 4)];

    return [...sequence, nextColor];
}

// Displays the computer's sequence
const displaySequence = async (sequence: Array<String>) => {
    if (sequence.length === 0) {
        return;
    }
    await click($('#' + sequence[0]), 700);

    // give some time to reset in case of consecutive colors
    return setTimeoutPromise(100).then(async () => {

        // disable player input while displaying
        await displaySequence(sequence.slice(1));
    });
}

$(() => {
    let turn = '';
    let pos = 0;
    let end = false;
    let sequence: Array<String> = [];

    const highscore = localStorage.getItem('highscore');
    $('#end').text(`High Score: ${highscore !== null ? highscore : 0}`);

    const startGame = () => {
        $('#yellow').css({ opacity: 0.125 });
        $('#blue').css({ opacity: 0.125 });
        $('#red').css({ opacity: 0.125 });
        $('#green').css({ opacity: 0.125 });
        $('#newgame').hide();
        $('#end').text('');
        end = false;
        sequence = [];
        nextRound();
    }

    const endGame = () => {
        turn = '';
        const prevHighscore = Number(localStorage.getItem('highscore'));
        const score = sequence.length;
        const highscore = score > prevHighscore ? score : prevHighscore;

        $('#end').text(`Game Over!\nHigh Score: ${highscore}`);
        $('#newgame').show();
        localStorage.setItem('highscore', highscore + '');
    }

    const nextRound = async () => {
        pos = 0;
        sequence = addColor(sequence);
        turn = 'computer';
        $('#round').text(`Round: ${sequence.length}`);

        // give some time after user is done inputting
        await setTimeoutPromise(1000);
        return displaySequence(sequence).then(() => {
            turn = 'player';
        });
    }

    const input = async (color: 'red' | 'yellow' | 'blue' | 'green') => {
        if (turn !== 'player') {
            return;
        }

        await click($('#' + color), 90);
        end = sequence[pos] !== color;
        ++pos;
    
        if (end) {
            endGame();
        }
        else if (pos === sequence.length) {
            nextRound();
        }
    }

    $('#yellow').on('click', () => {
        input('yellow');
    });

    $('#blue').on('click', () => {
        input('blue');
    });
    
    $('#red').on('click', () => {
        input('red');
    });

    $('#green').on('click', () => {
        input('green')
    });

    $('#newgame').on('click', () => {
        startGame();
    });
});