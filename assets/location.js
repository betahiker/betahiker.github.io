Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


function change_locality(cc) {
    $( "#languagecode" ).text( "CC: " + cc );
}


function get_country_code(urls, results, callback) {
    if ( urls.length > 0 ) {
        url = urls.pop();
        $.ajax({
            url:        url["url"],
            dataType:   "jsonp",
            timeout: 1000,
            success:    function(data) {
                    var cc = data[url["name"]];
                    if ( results.contains(cc) ) {
                        callback(cc);
                    } else {
                        results.push( cc );
                        get_country_code(urls, results, callback);
                    }
                },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                    get_country_code(urls, results, callback);
                }
            });
    }
}


window.onload = function () {
    requests = [
        {
            "url" : 'http://gd.geobytes.com/GetCityDetails?callback=?',
            "name" : "geobytesinternet"
        },
        {
            "url" : 'https://freegeoip.net/json/?callback=?',
            "name" : "country_code"
        },
        {
            "url" : "http://ipinfo.io/json",
            "name" : "country"
        },
        {
            "url" : 'http://www.geoplugin.net/json.gp?jsoncallback=?',
            "name" : "geoplugin_countryCode"
        },
        {
            "url" : "http://ip-api.com/json?callback=?",
            "name" : "countryCode"
        }
    ];
    get_country_code(requests, [], change_locality);
}

