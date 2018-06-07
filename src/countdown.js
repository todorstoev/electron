let countdown = {
    start: (counter, downFrom, done) => {
        for (let i = 0; i <= downFrom; ++i) {
            setTimeout(_ => {
                const count = downFrom - i;
                countdown.setCount.call(this, counter, count);
                if (i === downFrom)
                    done();
            }, i * 1000)
        }
    },
    setCount: (counter, count) => {
        counter.innerHTML = count > 0 ? count : '';
    }
}

module.exports = countdown;