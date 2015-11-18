Package.describe({
    name: 'cerealkiller:materialnote',
    version: '1.2.1',
    // Brief, one-line summary of the package.
    summary: 'material wysiwyg editor',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/Cerealkillerway/meteorMaterialNote',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    // packages
    api.use('fourseven:scss@3.2.0', 'client');
    //api.use('tap:i18n@1.7.0');
    api.use('materialize:materialize@0.97.3', 'client');

    //exports

    // styles
    api.addFiles('styles/materialNote.scss', 'client');
    api.addFiles('styles/components/_codemirror.scss', 'client');
    api.addFiles('styles/components/_monokai.scss', 'client');


    // templates
    
    // libraries
    api.use('jquery', 'client');
    api.addFiles('lib/codeMirror/editor/codemirror.js', 'client');
    api.addFiles('lib/codeMirror/xml.js', 'client');
    api.addFiles('lib/materialNote.js', 'client');

    // i18n
    api.addFiles('i18n/generalI18n.js', 'client');

});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('cerealkiller:materialnote');
    api.addFiles('materialnote-tests.js');
});




// UTILITIES
// get list of all files in a folder
function getFilesFromFolder(packageName, folder){
    // local imports
    var _ = Npm.require("underscore");
    var fs = Npm.require("fs");
    var path = Npm.require("path");
    // helper function, walks recursively inside nested folders and return absolute filenames
    function walk(folder){
        var filenames = [];
        // get relative filenames from folder
        var folderContent=fs.readdirSync(folder);
        // iterate over the folder content to handle nested folders
        _.each(folderContent,function(filename){
            // build absolute filename
            var absoluteFilename=folder + path.sep + filename;
            // get file stats
            var stat=fs.statSync(absoluteFilename);
            if (stat.isDirectory()){
                // directory case => add filenames fetched from recursive call
                filenames=filenames.concat(walk(absoluteFilename));
            }
            else {
                // file case => simply add it
                filenames.push(absoluteFilename);
            }
        });
        return filenames;
    }
    // save current working directory (something like "/home/user/projects/my-project")
    var cwd = process.cwd();
    // chdir to our package directory
    process.chdir("packages" + path.sep + packageName);
    // launch initial walk
    var result = walk(folder);
    // restore previous cwd
    process.chdir(cwd);
    return result;
}