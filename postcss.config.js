'use strict';

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 2 chrome versions',
                'last 2 firefox versions',
                'last 3 safari versions',
                'ie > 10',
                'last 3 ios versions',
            ],
        }),
    ],
};
