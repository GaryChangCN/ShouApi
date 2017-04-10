var charset = require("superagent-charset");
var request = require("superagent");
var cheerio = require("cheerio");
charset(request);

var validUrpLogin = require("./validUrpLogin");

async function fetchUrpData(username, urppassword, url, analysis) {
    var { data } = await validUrpLogin(username, urppassword);
    var { pass, cookie } = data;
    if (pass) {
        return await request.get(url).set({
            "Cookie": cookie,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Cache-Control": "no-cache"
        }).charset('gbk').then(function(res) {
            var text = res.text.toString();
            var $ = cheerio.load(text, { normalizeWhitespace: true });
            var ret = analysis($);
            return {
                data: {
                    pass: true,
                    ret
                }
            }
        });
    } else {
        return {
            data: {
                pass: false
            }
        }
    }
}

module.exports = fetchUrpData;