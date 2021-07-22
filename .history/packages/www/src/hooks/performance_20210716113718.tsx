import { hrtime } from 'process';

const performance = {
    now: function(start) {
        const NS_PER_SEC = 1e9;
        const time = hrtime();

        if (!start) return hrtime(time);
        var end = hrtime(start);
        return Math.round((end[0]*1000) + (end[1]/1000000));
    }
}

export default performance;