import * as Handlebars from 'handlebars';

(function () {
    tinymce.PluginManager.add('set_picture_button', function (editor, url) {
        editor.addButton('set_picture_button', {
            title: 'PC・SP画像設定',
            image: '/common/images/tinymce_picture.png',
            onclick: function () {
                const selector = tinyMCE.activeEditor.selection.getRng().startContainer;

                editor.windowManager.open({
                    title: 'PC・SP画像設定',
                    body: [
                        {
                            type: 'textbox',
                            name: 'pc',
                            label: 'PC画像URL',
                            minWidth: 300,
                            value: getAttributeBySelector(selector, 'source', 'srcset')
                        },
                        {
                            type: 'textbox',
                            name: 'sp',
                            label: 'SP画像URL',
                            value: getAttributeBySelector(selector, 'img', 'src')
                        },
                        {
                            type: 'textbox',
                            name: 'alt',
                            label: 'alt属性',
                            value: getAttributeBySelector(selector, 'img', 'alt')
                        },
                    ],
                    onsubmit: function (event) {
                        editor.insertContent(getPictureContent(event));
                    }
                });
            }
        });
    });
})();

function getPictureContent(event) {
    const template = Handlebars.compile(
        '<picture>' +
        '    <source srcset="{{pc}}" media="(min-width:750px)">' +
        '    <img src="{{sp}}" alt="{{alt}}">' +
        '</picture>'
    );

    return template(event.data);
}

function getAttributeBySelector(selector, tagName, attributeName) {
    if (typeof selector.getElementsByTagName === 'function') {
        const source = selector.getElementsByTagName(tagName);
        if (source.length > 0) {
            return source[0].getAttribute(attributeName);
        }
    }

    return '';
}
