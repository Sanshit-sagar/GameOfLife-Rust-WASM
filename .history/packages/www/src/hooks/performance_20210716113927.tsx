import { hrtime } from 'process';

const performance = {
    now: function(start) {
        const NS_PER_MS = 1e6;
        const time = hrtime.bigint();

        if (!start) return hrtime.bigint();
        var end = hrtime.bigint();
        return end-start;
    }
}

export default performance;