var rf = require("fs");

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Default task(s).
    grunt.registerTask('default', ['']);

    grunt.registerTask('addLanguageSel', 'Add Language selection in index*.html.', function (arg1, arg2) {

        var indexFileNames = ["build/index.html", "build/index_zh_cn.html", "build/index_zh_tw.html"];

        for (var f = 0; f < indexFileNames.length; f++) {
             console.log(indexFileNames[f]);
            var data = rf.readFileSync(indexFileNames[f], "utf-8");
            var postfixIndex = indexFileNames[f].indexOf("_");
            console.log(postfixIndex);
            var file_postfix = postfixIndex<=0?".html":indexFileNames[f].substring(postfixIndex);
            
            console.log(file_postfix);
            var template = rf.readFileSync("source/patches/language_sel"+file_postfix, "utf-8");
            var lines = data.split('\n');
            var tocifyFound = false;
            var divCounter = 0;
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].includes("tocify-wrapper")) {
                    console.log(i);
                    console.log(lines[i]);
                    tocifyFound = true;
                }
                if (tocifyFound && lines[i].includes("</div>")) {
                    divCounter = divCounter+1;
                }
                if (divCounter >= 1) {
                    lines.splice(i+1,0,template);
                    break;
                }
            }
            rf.writeFileSync(indexFileNames[f], lines.join("\n"), "utf-8");
            console.log("READ FILE SYNC END: "+ indexFileNames[f]);
        }
        
    });
};
