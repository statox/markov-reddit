# markov-reddit
Use markov chains to generate new posts titles in a subreddit

There is three scripts:

- `getPosts.js` gets the last posts from a given subreddit and save their title
- `trainMarkov.js` uses the titles to create a markov chain
- `generateMarkov.js` uses the markov chain to generate new titles

## Configuration

All of the configurations are in the `config.json` file. Here is an example:

    {
        "SUBREDDIT": "showerthoughts",
        "POSTS_FILE": "./data/posts/posts-showerthoughts.txt",
        "COUNT": 10,

        "ORDER": 2,
        "MODEL_FILE": "./data/models/markov-showerthoughts-order2.json",

        "DEVIATION_TARGET": 6,
        "MAX_TRIES" : 100
    }

- `SUBREDDIT` should be a valid subreddit name without the `r/`
- `COUNT` is the number of page in the subreddit to get
- `ORDER` is the size of the Ngrams used in the markov chain
- `DEVIATION_TARGET` is the minimum number of different branches in the markov chain the result should contain
- `MAX_TRIES` limits the number of tries to get to `DEVIATION_TARGET`

## Usage

First clone the repo and install the dependencies

    npm install

Tweak `config.json` as you want.

Get the posts with

    node getPost.js

Generate a markov chain

    node trainMarkov.js

You need to use this script each time you change the `ORDER` parameter.

Finally, generate a new title

    node generateMarkov.js
