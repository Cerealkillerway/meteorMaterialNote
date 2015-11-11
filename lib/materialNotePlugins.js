editorPlugins = function() {
    var tmpl = $.summernote.renderer.getTemplate();

    $.summernote.addPlugin({
        name: 'ckMedia',
        buttons: { // buttons
            ckImageUploader: function () {
                return tmpl.iconButton('image', {
                    event : 'ckImageUploader',
                    title: TAPi18n.__('imageUploader_btn'),
                    className: 'btnThird'
                });
            },
            ckVideoEmbeeder: function () {
                return tmpl.iconButton('videocam', {
                    event : 'ckVideoEmbeeder',
                    title: TAPi18n.__('videoEmbeed_btn'),
                    className: 'btnThird'
                });
            }
        },
        events: {
            ckImageUploader: function (event, editor, layoutInfo) {
                //get DOM element of the editor
                var editable = layoutInfo.editable();
                var dialog = editable.parent().siblings('.editorDialogs').children('.ckImageUploader');
                
                editor.saveRange(editable);
                dialog.openModal();
                dialog.find('.videoUrl').select();

                //scroll on top
                dialog.find('.modal-content').animate({
                    scrollTop: 0
                }, 200);           
            },
            ckVideoEmbeeder: function (event, editor, layoutInfo) {
                //get DOM element of the editor
                var editable = layoutInfo.editable();
                var dialog = editable.parent().siblings('.editorDialogs').children('.ckVideoEmbeeder');
                
                editor.saveRange(editable);
                dialog.openModal();
                dialog.find('.videoUrl').select();

                //scroll on top
                dialog.find('.modal-content').animate({
                    scrollTop: 0
                }, 200);
            },
        }
    });
};


// CK dialog's templates stuff
// Image uploader
Template.ckImageUploader.events({
    "change .imageUploader": function(event, template) {
        var imageParams = template.image;
        if (!imageParams) imageParams = appDefaults.image;

        var canvasContainer = template.$('.canvasContainer');

        //remove class for image placeholder in canvas container
        canvasContainer.removeClass('canvasContainerEmpty');

        //set selected file's name to fileNameContainer
        template.$('.fileNameContainer').val(getFileName(event.target.files[0].name));

        //assign class to canvas for styling
        //canvasContainer.children('.willContainImage').addClass('canvasImage');

        var reader = new FileReader();

        reader.onloadend = function() {
            var tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function() {
         
                var tempW = tempImg.width;
                var tempH = tempImg.height;

                // main image calculations
                var canvas = template.$('.willContainImage')[0];
                var ctx = canvas.getContext('2d');
                var MAX_WIDTH = imageParams.width;
                var MAX_HEIGHT = imageParams.height;

                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                       tempH *= MAX_WIDTH / tempW;
                       tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                       tempW *= MAX_HEIGHT / tempH;
                       tempH = MAX_HEIGHT;
                    }
                }
                canvas.width = tempW;
                canvas.height = tempH;
                ctx.drawImage(this, 0, 0, tempW, tempH);

                //change textarea width to adapt
                var altTextArea = canvasContainer.siblings('.imageAltText');
                var ccWidth = canvasContainer.outerWidth();

                altTextArea.outerWidth(ccWidth);
            };
        };
        reader.readAsDataURL(event.target.files[0]);        
    },
    "click .ckImageUploadConfirm": function(event, template) {
        var imageParams = template.data.image;
        var dialog = template.$('.ckImageUploader');
        var editor = $(event.target).closest('.editorDialogs').next('.editor');
        var nameContainer = template.$('.fileNameContainer');
        var altTextContainer = template.$('.imageAltText');

        var canvasContainer = template.$('.canvasContainer');
        var canvas = canvasContainer.children('.willContainImage')[0];
        var emptyCanvas = canvasContainer.children('.canvasBlank')[0];

        emptyCanvas.width = canvas.width;
        emptyCanvas.height = canvas.height;

        //check if canvas is empty to prevent inserting black image
        if (emptyCanvas.toDataURL() !== canvas.toDataURL()) {
            var dataUrl = canvas.toDataURL("image/jpeg", imageParams.quality);
            var imgNode = $('<img />');
                imgNode.attr('src', dataUrl);
                imgNode.attr('title', nameContainer.val());
                imgNode.attr('alt', altTextContainer.val().replace('\n', ' '));

            $(editor).summernote("restoreRange");
            $(editor).summernote('insertNode', imgNode[0]);
        }
        else console.log('empty canvas');

        dialog.closeModal();
    },
    "click .btnClose": function(event, template) {
        template.$('.ckImageUploader').closeModal();
    }
});

// Video embeeder
Template.ckVideoEmbeeder.events({
    "keyup .videoUrl": function(event, template) {
        var videoSegment = $(event.target).val();
        if (videoSegment.indexOf('watch?v=') < 0) return false;

        var data = template.data;
        var videoParams = data.video;
        if (!videoParams) videoParams = appDefaults.video;

        var previewContainer = template.$('.previewContainer');
        previewContainer.empty();

        var id = data.name + 'Player';
        previewContainer.append('<div id="' + id + '"></div>');

        //get the video id
        videoSegment = videoSegment.substring(videoSegment.indexOf('watch?v=') + 8, videoSegment.length);

        onYouTubeIframeAPIReady = function () {
            player = new YT.Player(id, {
                height: videoParams.height, 
                width: videoParams.width, 
                videoId: videoSegment, 
                events: {
                    onReady: function (event) {
                        previewContainer.removeClass('hidden');
                    }
                }
            });
        };
        YT.load();
    },
    "click .ckVideoEmbeederConfirm": function(event, template) {
        var videoParams = template.data.video;
        if (!videoParams) videoParams = appDefaults.video;

        var dialog = template.$('.ckVideoEmbeeder');
        var editor = $(event.target).closest('.editorDialogs').next('.editor');
        var videoSegment = template.$('.videoUrl').val();
            videoSegment = videoSegment.substring(videoSegment.indexOf('watch?v=') + 8, videoSegment.length);
        
        var videoNode = $('<div />');
            videoNode.attr('id', videoSegment);
            videoNode.addClass('YTPlayer');

        $(editor).summernote("restoreRange");
        $(editor).summernote('insertNode', videoNode[0]);

        onYouTubeIframeAPIReady = function () {
            player = new YT.Player(videoSegment, {
                height: videoParams.height, 
                width: videoParams.width, 
                videoId: videoSegment, 
                events: {
                    onReady: function (event) {
                    }
                }
            });
        };
        YT.load();

        dialog.closeModal();
    },
    "click .btnClose": function(event, template) {
        template.$('.ckVideoEmbeeder').closeModal();
    }
});