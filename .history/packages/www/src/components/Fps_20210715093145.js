import React from 'react'
import Life from './Life'

class Fps extends React.Component {
    state = {
        count: 0
    };

    countUp = () => {
        this.setState(cstate => {
            return { count: cstate.count + 1 };
        });
    };

    render() {
        const { count } = this.state;

        return (
          <div>
            <Life 
                counter={count} 
                updateCount={this.countUp}
            />
          </div>
        );
    }
}

export default Fps;