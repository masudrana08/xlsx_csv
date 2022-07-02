var fs = require("fs");
var path = require("path");
var xlsx = require("xlsx");
function buildCSV(data, deleteAfter) {
    var fpath = path.join(process.cwd(), 'publicStore', Math.random() * 10000 + ".csv");
    var writeStream = fs.createWriteStream(fpath);
    var arr = [];
    for (var item in data[0]) {
        arr.push(item);
    }
    writeStream.write(arr.join(","));
    writeStream.write("\n");
    data.forEach(function (d) {
        var arr2 = [];
        for (var item in d) {
            arr2.push(d[item]);
        }
        writeStream.write(arr2.join(","));
        writeStream.write("\n");
    });
    setTimeout(function () {
        fs.unlink(fpath, function (err) {
            if (err)
                console.log(err);
            console.log('file deleted');
        });
    }, deleteAfter || 60 * 1000);
}
function buildXlsx(data, deleteAfter) {
    var fpath = path.join(process.cwd(),'publicStore', Math.random() * 10000 + ".xlsx");
    var workSheet = xlsx.utils.json_to_sheet(data);
    var workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet);
    xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
    xlsx.writeFile(workBook, fpath);
    setTimeout(function () {
        fs.unlink(fpath, function (err) {
            if (err)
                console.log(err);
            console.log('file deleted');
        });
    }, deleteAfter || 60 * 1000);
}
// buildCSV(x,  5*1000);
// buildXlsx(x,  5*1000);
var exporter = {
    buildCSV: buildCSV,
    buildXlsx: buildXlsx
};
module.exports = exporter;
