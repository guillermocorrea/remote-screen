/**
 * Created by guillermo on 26/08/2014.
 */
var key = "secret";
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}
var socket = io.connect(Config.baseUrl);
var y = 0;

socket.emit('setKey', key);
socket.on('scrollTo', function (data) {
    if (data.y == 'max') {
        y = getDocHeight();
    } else {
        if (data.action == 'ffd') {
            y += parseInt(data.y);
        } else if (data.action == 'go') {
            y = parseInt(data.y);
        } else {
            y -= parseInt(data.y);
        }
    }
    window.scrollTo(0, y);

});
document.write('<img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' + Config.baseUrl + '/panel/' + key + '&choe=UTF-8" alt=""/>');