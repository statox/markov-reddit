/*
 * This file get the list of the last prompts from r/showerthoughts
 * It writes all of the titles in posts.txt
 * It gets the last COUNT pages
 */
const axios = require('axios');
const fs = require('fs');

const CONF = require('./config.json');
const POSTS_FILE = CONF["POSTS_FILE"];
const COUNT = CONF["COUNT"];
const SUBREDDIT = CONF["SUBREDDIT"];


function getPosts() {
    //var URL='http://www.reddit.com/r/showerthoughts/new.json?sort=top&after='
    var URL='http://www.reddit.com/r/' + SUBREDDIT + '/new.json?sort=top&after='
    fs.unlink(POSTS_FILE, (err) => {
        if (err)
            console.log("Error while removing post file", err);

        return;
    });
    getPage(URL, "", COUNT, getPage)
}

var getPage = function (url, lastOne, count, callback) {
    console.log("getPage", lastOne, count);
    return axios.get(url + lastOne)
        .then(function(response) {
            var posts = response.data.data.children;
            if (posts && posts.length > 0) {
                var titles = posts.map(p => p.data.title)
                var lastOne = posts[posts.length - 1].data.name;

                titles.forEach(title => {
                    fs.appendFileSync(POSTS_FILE, title + "\n");
                })

                if (count > 0) {
                    callback(url, lastOne, count - 1, callback);
                }
            }
        })
        .catch(function(err) {
            console.log("Error while getting posts");
            console.log(err);
        });
}

getPosts();
