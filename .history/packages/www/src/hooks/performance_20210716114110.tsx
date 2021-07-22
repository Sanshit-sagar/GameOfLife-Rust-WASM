import { hrtime } from 'process';

const NS_PER_MS = 1e6;

const performance = {
    now: function(start) {
        if (!start) return hrtime.bigint();
        var end = hrtime.bigint();
        return end-start;
    }
}

export default performance;