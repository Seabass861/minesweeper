import React from 'react';

const Instructions = props => {

    return (
        <div className="instructions">
            <h2>How to Play</h2>
            <p>You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) you win.<br /><br />
                Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. Use this information plus some guess work to avoid the bombs.<br /><br />
                To open a square, point at the square and click on it. To mark a square you think is a bomb, point and right-click.
            </p>

        </div>
    );

};

export default Instructions;