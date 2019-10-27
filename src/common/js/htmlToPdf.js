

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default{
    install (Vue, options) {
        Vue.prototype.getScanPdf = function (name) {
            var title = name;
            html2Canvas(document.querySelector('#pdfDom2'), {
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
