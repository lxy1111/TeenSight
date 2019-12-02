

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

import globalvariable from './global'


export default{
    install (Vue, options) {
        Vue.prototype.getPdf3 = function (title, id = 'pdfDom', scale = 1, changeHeight = 0) {
            const canvas = document.createElement('canvas');
            const ele = document.querySelector(`#${id}`); // must set tag width

            const width = ele.offsetWidth;
            const height = ele.offsetHeight + changeHeight;
            canvas.width = width * scale;
            canvas.height = height * scale;

            canvas.getContext('2d').scale(scale, scale);

            const opts = {
                scale,
                canvas,
                logging: true,
                // imageTimeout: 0,
                width,
                height,
                useCORS: true // 【重要】开启跨域配置
                // allowTaint: true, // 允许跨域图片
                // taintTest: false // 是否在渲染前测试图片
            };
            html2Canvas(ele, opts).then(function (canvas) {
                    // document.getElementById('printBodyPage').appendChild(canvas);
                    let contentWidth = canvas.width / scale;
                    let contentHeight = canvas.height / scale;
                    let pageHeight = contentWidth / 592.28 * 841.89;
                    let leftHeight = contentHeight;
                    let position = 0;
                    let imgWidth = 595.28;
                    let imgHeight = 592.28 / contentWidth * contentHeight;
                    let pageData = canvas.toDataURL('image/jpeg', 1.0);
                    // let PDF = new JsPDF('', 'pt', 'a4');
                    let PDF = new JsPDF({
                        orientation: '',
                        unit: 'pt',
                        format: 'a4'
                    });
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        while (leftHeight > 0) {
                            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            if (leftHeight > 0) {
                                PDF.addPage();
                            }
                        }
                    }
                    PDF.save(title + '.pdf');
                }
            ).then(() => {
                this.loading = false;
            });
        };

        Vue.prototype.getPdf2 = function (name) {


            html2Canvas(document.querySelector('#pdfDom'), {
                allowTaint: true
            }).then(function (canvas) {

            var leftHeight = canvas.height;

            var a4Width = 595.28
            var a4Height = 841.89
            //一页pdf显示html页面生成的canvas高度;
            var a4HeightRef = Math.floor(canvas.width / a4Width * a4Height);

            //pdf页面偏移
            var position = 0;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            var pdf = new JsPDF('x', 'pt', 'a4');
            var index = 1,
                canvas1 = document.createElement('canvas'),
                height;
            pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen');

            var pdfName = name;

            function createImpl(canvas) {
                if (leftHeight > 0) {
                    index++;

                    var checkCount = 0;
                    if (leftHeight > a4HeightRef) {
                        var i = position + a4HeightRef;
                        for (i = position + a4HeightRef; i >= position; i--) {
                            var isWrite = true
                            for (var j = 0; j < canvas.width; j++) {
                                var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data

                                if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                                    isWrite = false
                                    break
                                }
                            }
                            if (isWrite) {
                                checkCount++
                                if (checkCount >= 10) {
                                    break
                                }
                            } else {
                                checkCount = 0
                            }
                        }
                        height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
                        if (height <= 0) {
                            height = a4HeightRef;
                        }
                    } else {
                        height = leftHeight;
                    }

                    canvas1.width = canvas.width;
                    canvas1.height = height;

                    // console.log(index, 'height:', height, 'pos', position);

                    var ctx = canvas1.getContext('2d');
                    ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);

                    var pageHeight = Math.round(a4Width / canvas.width * height);
                    // pdf.setPageSize(null, pageHeight)
                    if (position != 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, a4Width, a4Width / canvas1.width * height);
                    leftHeight -= height;
                    position += height;
                    // $('.pdfProgress').text(index + 1);
                    // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                    if (leftHeight > 0) {
                        setTimeout(createImpl, 500, canvas);
                    } else {
                        pdf.save(pdfName + '.pdf');
                        // $('.pdfTip').remove();
                    }
                }
            }

            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < a4HeightRef) {
                pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, a4Width / canvas.width * leftHeight);
                pdf.save(pdfName + '.pdf')
            } else {
                try {
                    pdf.deletePage(0);
                    // $('.pdfTip').show();
                    // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                    setTimeout(createImpl, 500, canvas);
                } catch (err) {
                    console.log(err);
                }
            }


           }


            )
        }


        Vue.prototype.getScanPdf = function (name) {
            var title = name;
            html2Canvas(document.querySelector('#pdfDom'), {
                allowTaint: true
            }).then(function (canvas) {
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    let pageHeight = contentWidth / 592.28 * 841.89
                    let leftHeight = contentHeight
                    let position = 0
                    let imgWidth = 595.28
                    let imgHeight = 592.28 / contentWidth * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    let PDF = new JsPDF('', 'pt', 'a4')
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(title + '.pdf')
                }
            )
        };
        Vue.prototype.getPdf = function (name) {
            var title = name;
            html2Canvas(document.querySelector('#pdfDom'), {
                allowTaint: true
            }).then(function (canvas) {
                    // let contentWidth = canvas.width
                    // let contentHeight = canvas.height
                    // let pageHeight = contentWidth / 592.28 * 841.89
                    // let leftHeight = contentHeight
                    // let position = 0
                    // let imgWidth = 595.28
                    // let imgHeight = 592.28 / contentWidth * contentHeight
                    // let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    // let PDF = new JsPDF('', 'pt', 'a4')
                    // if (leftHeight < pageHeight) {
                    //     PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                    // } else {
                    //     while (leftHeight > 0) {
                    //         PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    //         leftHeight -= pageHeight
                    //         position -= 841.89
                    //         if (leftHeight > 0) {
                    //             PDF.addPage()
                    //         }
                    //     }
                    // }
                var contentWidth = canvas.width
                var contentHeight = canvas.height

                console.log('contentWidth', contentWidth)
                console.log('contentHeight', contentHeight)
                // 将canvas转为base64图片
                var pageData = canvas.toDataURL('image/jpeg', 1.0)

                // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
                // 2为上面的scale 缩放了2倍
                var pdfX = (contentWidth + 10) / 2 * 0.75
                var pdfY = (contentHeight + 500) / 2 * 0.75 // 500为底部留白

                // 设置内容图片的尺寸，img是pt单位
                var imgX = pdfX;
                var imgY = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离

                // 初始化jspdf 第一个参数方向：默认''时为纵向，第二个参数设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt
                var PDF = new JsPDF('', 'pt', [pdfX, pdfY])

                // 将内容图片添加到pdf中，因为内容宽高和pdf宽高一样，就只需要一页，位置就是 0,0
                PDF.addImage(pageData, 'jpeg', 0, 0, imgX, imgY)
                    PDF.save(title + '.pdf')
                }
            )
        }
    }
}
