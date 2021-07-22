import { hrtime } from 'process';

const NS_PER_MS = 1e6;

const performance = {
    now: function(start) {
        
        if (!start) {
            const start = process.hrtime.bigint();
            return start 
        }
        const end = process.hrtime.bigint();
        return end - start;
    }
}

export default performance;