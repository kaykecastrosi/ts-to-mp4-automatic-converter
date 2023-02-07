const fg = require("fast-glob");
const fs = require("fs");
const { exec } = require('child_process');

// options is optional
const files = fg.sync("**/*.ts", { cwd: "./src" })
files.map((item, index) => {
    const newName = item.replace(".ts", ".mp4")
    exec(`ffmpeg -y -i "src/${item}" -vcodec copy -acodec copy -map 0:v -map 0:a "src/${newName}"`, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }
      
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        fs.unlinkSync(`./src/${item}`)
        console.log(`stderr: ${stderr}`);
      });
      
})


