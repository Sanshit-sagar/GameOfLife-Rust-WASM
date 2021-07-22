import { hrtime } from 'process';

const performance = {
    now: function(start) {
        if (!start) return hrtime();
        var end = hrtime(start);
        return Math.round((end[0]*1000) + (end[1]/1000000));
    }
}

export default performance;