const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
  

function buildCSV(data:object[], deleteAfter:number):void {
  const fpath = path.join(process.cwd(), Math.random() * 10000 + ".csv");
  const writeStream = fs.createWriteStream(fpath);
  let arr:string[] = [];
  for (let item in data[0]) {
    arr.push(item);
  }
  writeStream.write(arr.join(","));
  writeStream.write("\n");
  data.forEach((d:any) => {
    let arr2:string[] = [];
    for (let item in d) {
      arr2.push(d[item]);
    }
    writeStream.write(arr2.join(","));
    writeStream.write("\n");
  });

    setTimeout(()=>{
      fs.unlink(fpath, (err:any)=>{
          if(err) console.log(err);
          console.log('file deleted');
        })
    }, deleteAfter || 60*1000)
}


function buildXlsx(data:object[],  deleteAfter:number):void {
  const fpath = path.join(process.cwd(), Math.random() * 10000 + ".xlsx");
  const workSheet = xlsx.utils.json_to_sheet(data);
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet);
  xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
  xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
  xlsx.writeFile(workBook, fpath);
    setTimeout(()=>{
      fs.unlink(fpath, (err:any)=>{
          if(err) console.log(err);
          console.log('file deleted');
        })
    }, deleteAfter || 60*1000)
}

// buildCSV(x,  5*1000);
// buildXlsx(x,  5*1000);
let exporter: object = {
  buildCSV, buildXlsx
}
module.exports = exporter